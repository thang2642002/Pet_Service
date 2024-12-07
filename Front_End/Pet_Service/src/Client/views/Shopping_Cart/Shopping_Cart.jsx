import { useEffect, useState } from "react";
import "./Shopping_Cart.scss";
import { Row, Col, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setCart, updateItemQuantity } from "../../../redux/Slices/cartSlices";
import { getByCartId, updateCart } from "../../../services/cartService";
import {
  updateCartItem,
  deleteCartItem,
} from "../../../services/cartItemServices";
import { createOrder } from "../../../services/orderServices";
import { createOrderItem } from "../../../services/orderItemServices";

const Shopping_Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listCartItem, setListCartItem] = useState([]);
  const [check, setCheck] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [cartId, setCartId] = useState(0);
  const [dataCart, setDataCart] = useState([]);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const fetchListCartItem = async () => {
    const data = await getByCartId(id);
    if (data && data.errCode === 0) {
      setDataCart(data.data);
      setCartId(data.data.cart_id);
      setListCartItem(data.data.cartItems);
      setCheck(new Array(data.data.cartItems.length).fill(false));
      dispatch(
        setCart({
          cartId: data.data.cart_id,
          items: data.data.cartItems,
        })
      );
    }
  };

  const handlePayment = async () => {
    try {
      const order = await createOrder(
        calculateTotal(),
        user?.data?.user_id,
        cartId
      );

      const selectedItems = listCartItem.filter((_, index) => check[index]);
      const itemsForOrder = selectedItems.map((item) => ({
        item_id: item.item_id,
        quantity: item.quantity,
        total_price: item.total_price,
      }));
      const orderItems = await createOrderItem(
        order.data.order_id,
        itemsForOrder
      );
      navigate(`/payment`, { state: { order_id: order.data.order_id } });
    } catch (error) {
      console.error("Failed to process payment:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleUpdateQuantity = async (
    id,
    changeQuantity,
    total_price,
    type
  ) => {
    if (type === "minus") {
      await updateCartItem(
        id,
        changeQuantity - 1,
        total_price * (changeQuantity - 1)
      );
    } else {
      await updateCartItem(
        id,
        changeQuantity + 1,
        total_price * (changeQuantity + 1)
      );
      dispatch(
        updateItemQuantity({
          id,
          quantity: changeQuantity + 1,
          totalPrice: total_price * (changeQuantity + 1),
        })
      );
    }
    fetchListCartItem();
  };

  const calculateTotal = () => {
    let sumTotal = 0;
    listCartItem.forEach((item, index) => {
      if (check[index]) {
        const price = item?.product_item?.price || item?.pet_item?.price;
        sumTotal += price * item.quantity;
      }
    });
    return sumTotal;
  };

  const handleCheckAll = async () => {
    const newCheckState = !isAllChecked;
    const updatedCheck = new Array(listCartItem.length).fill(newCheckState);
    setCheck(updatedCheck);
    setIsAllChecked(newCheckState);

    let newTotalAmount = 0;
    if (newCheckState) {
      newTotalAmount = listCartItem.reduce((sum, item) => {
        const price = item?.product_item?.price || item?.pet_item?.price;
        return sum + price * item.quantity;
      }, 0);
    }
    await updateCart(cartId, id, newTotalAmount);
  };

  const handleCheck = async (index) => {
    const updatedCheck = [...check];
    updatedCheck[index] = !updatedCheck[index];
    setCheck(updatedCheck);
    setIsAllChecked(updatedCheck.every((item) => item === true));
    let newTotalAmount = 0;
    updatedCheck.forEach((isChecked, idx) => {
      if (isChecked) {
        const item = listCartItem[idx];
        const price = item?.product_item?.price || item?.pet_item?.price;
        newTotalAmount += price * item.quantity;
      }
    });

    await updateCart(cartId, id, newTotalAmount);
  };

  const handleDeleteItem = async (id) => {
    const data = await deleteCartItem(id);
    if (data && data.errCode === 0) {
      toast.success("Sản phẩm này đã xóa khỏi giỏ hàng");
      fetchListCartItem();
    }
  };
  useEffect(() => {
    fetchListCartItem();
  }, []);

  return (
    <div className="contents-carts-container container">
      <div className="title-carts">Giỏ hàng</div>
      <div className="content-carts">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="details-product">
                <div>
                  <Row>
                    <Col md={2}>
                      <Form.Check
                        inline
                        label="Tất cả"
                        className="check-box"
                        checked={isAllChecked}
                        onChange={handleCheckAll}
                      />
                    </Col>
                    <Col md={2}>
                      <div>Sản phẩm</div>
                    </Col>

                    <Col md={2} className="ml-14">
                      <div>Đơn giá</div>
                    </Col>
                    <Col md={2} className="ml-[-35px]">
                      <div>Số lượng</div>
                    </Col>
                    <Col md={2}>
                      <div>Thành tiền</div>
                    </Col>
                    <Col md={1}>
                      <div className="text-[20px]">
                        <MdDelete />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="product-carts">
                  {listCartItem &&
                    Array.isArray(listCartItem) &&
                    listCartItem.map((item, index) => (
                      <Row className="info-product" key={index}>
                        <Col md={1}>
                          <Form.Check
                            inline
                            checked={check[index]}
                            onChange={() => handleCheck(index)}
                          />
                        </Col>

                        <Col md={3}>
                          <div className="title-product">
                            <img
                              src="https://product.hstatic.net/200000263355/product/z5625317232002_a6d5cca3bb39d486d8870c927d894c21_839973b078544de8bc1a13c2a6aef528_medium.jpg"
                              alt="product"
                            />
                            <div className="ml-5">
                              {item?.product_item?.name || item?.pet_item?.name}
                            </div>
                          </div>
                        </Col>
                        <Col md={2}>
                          <div className="price-product ml-10">
                            {formatPrice(
                              item?.product_item?.price || item?.pet_item?.price
                            )}
                            đ
                          </div>
                        </Col>
                        <Col md={2}>
                          <div className="count-product">
                            <span
                              className="minus"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.cart_item_id,
                                  item.quantity,
                                  item?.product_item?.price ||
                                    item?.pet_item?.price,
                                  "minus"
                                )
                              }
                            >
                              <MinusOutlined />
                            </span>
                            <input
                              value={item.quantity}
                              readOnly
                              style={{
                                width: "40px",
                                height: "34px",
                                border: "1px solid #ccc",
                                paddingLeft: "15px",
                              }}
                            />
                            <span
                              className="plus"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.cart_item_id,
                                  item.quantity,
                                  item?.product_item?.price ||
                                    item?.pet_item?.price,
                                  "plus"
                                )
                              }
                            >
                              <PlusOutlined />
                            </span>
                          </div>
                        </Col>
                        <Col md={2}>
                          <div className="total-price-product">
                            {formatPrice(item.total_price)} đ
                          </div>
                        </Col>

                        <Col md={1}>
                          <div
                            className="text-[20px] cursor-pointer"
                            onClick={() => handleDeleteItem(item.cart_item_id)}
                          >
                            <MdDelete />
                          </div>
                        </Col>
                      </Row>
                    ))}
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="total-payment">
                <div className="total-price">
                  <div className="provisional">
                    <div className="title">Tổng tiền</div>
                    <div className="price">
                      {formatPrice(calculateTotal())} đ
                    </div>
                  </div>
                  <div className="sum-price">
                    <div className="title">Tổng tiền</div>
                    <div className="price">
                      {formatPrice(calculateTotal())} đ
                    </div>
                  </div>
                </div>
                <button className="btn" onClick={handlePayment}>
                  Thanh Toán
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Shopping_Cart;
