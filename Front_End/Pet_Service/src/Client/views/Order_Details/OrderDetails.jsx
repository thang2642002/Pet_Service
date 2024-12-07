import { useLocation } from "react-router-dom";
import { Row, Col, Button } from "antd";
import "./OrderDetails.scss";

const OrderDetails = () => {
  const location = useLocation();
  const { dataOrder, totalAmount } = location.state || {};
  const orderItems = dataOrder.orderItems;

  return (
    <>
      <div className="container">
        <div className="order-container">
          <div className="hearder-order">
            <div className="title">Tất cả</div>
          </div>
          <div className="conten-order-container">
            <div className="title-order">
              <div className="name-details-order">Chi Tiết Đơn Hàng</div>
              <div className="transaction">
                <span className="order-success">Đặt Hàng Thành Công</span>
                <span className="warning-order">Chờ Giao Hàng</span>
              </div>
            </div>
            <div className="mt-4">
              <Row className="flex items-center justify-between border-b border-[#e5e7eb] pb-3 mb-2">
                <Col xs={6} sm={4} md={2}>
                  <div className="text-base font-medium text-gray-800">
                    Hình ảnh
                  </div>
                </Col>
                <Col xs={6} sm={8} md={6}>
                  <div className="text-base font-medium text-gray-800">
                    Tên sản phẩm
                  </div>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <div className="text-sm font-semibold text-gray-700">
                    Số lượng
                  </div>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <div className="text-sm font-semibold text-gray-700">
                    Giá sản phẩm
                  </div>
                </Col>
              </Row>
            </div>
            {orderItems &&
              orderItems.map((item, index) => {
                return (
                  <div key={index}>
                    <Row
                      key={index}
                      className="flex items-center justify-between shadow-sm bg-white rounded-md py-4 px-3 mb-4 hover:shadow-md transition-shadow mt-4"
                    >
                      <Col
                        xs={6}
                        sm={4}
                        md={2}
                        className="w-16 h-16 overflow-hidden rounded-md"
                      >
                        <img
                          src={
                            item?.product_item?.images[0] ||
                            item?.pet_item?.images[0]
                          }
                          alt="product"
                          className="w-full h-full object-cover"
                        />
                      </Col>

                      <Col xs={6} sm={8} md={6}>
                        <div className="text-base font-medium text-gray-800">
                          {item?.product_item?.name || item?.pet_item?.name}
                        </div>
                      </Col>
                      <Col xs={6} sm={4} md={2}>
                        <div className="text-sm font-semibold text-gray-700">
                          {item?.quantity}
                        </div>
                      </Col>
                      <Col xs={6} sm={4} md={2}>
                        <div className="text-sm font-semibold text-gray-700">
                          {item?.total_price.toLocaleString() || "0đ"}
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            <div className="sum-product">
              <div className="total-price">
                Tổng tiền đơn hàng: {totalAmount.toLocaleString()}đ
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
