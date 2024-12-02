import { useEffect, useState } from "react";
import "./Shopping_Cart.scss";
import { Row, Col, Container, Form } from "react-bootstrap";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { MdDelete } from "react-icons/md";
import { getByCartId, updateCart } from "../../../services/cartService";
import { updateCartItem } from "../../../services/cartItemServices";
import { useParams } from "react-router-dom";

const Shopping_Cart = () => {
  const [listCartItem, setListCartItem] = useState([]);
  const [check, setCheck] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [cartId, setCartId] = useState(0);
  const { id } = useParams();

  const fetchListCartItem = async () => {
    const data = await getByCartId(id);
    if (data && data.errCode === 0) {
      setCartId(data.data.cart_id);

      setListCartItem(data.data.cartItems);
      setCheck(new Array(data.data.cartItems.length).fill(false));
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
    }
    fetchListCartItem();
  };

  const calculateTotal = () => {
    let sumTotal = 0;
    listCartItem.forEach((item, index) => {
      if (check[index]) {
        sumTotal +=
          item?.product_item?.price * item.quantity ||
          item?.pet_item?.price * item.quantity;
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
                <div className="title-carts-product">
                  <Form.Check
                    inline
                    label="Tất cả"
                    className="check-box"
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                  <div className="title-price">Đơn giá</div>
                  <div className="title-quantity">Số lượng</div>
                  <div className="title-total-price">Thành tiền</div>
                  <div className="delete">
                    <MdDelete />
                  </div>
                </div>
                <div className="product-carts">
                  <div className="title">Sản phẩm</div>

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

                        <Col md={4}>
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
                <button className="btn">Thanh Toán</button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Shopping_Cart;
