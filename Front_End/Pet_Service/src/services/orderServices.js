import axios from "../configs/axiosCustommize";

const getAllOrder = () => {
  return axios.get("/order/get-all-order");
};

const createOrder = (total_amount, status, user_id) => {
  const data = { total_amount, status, user_id };
  return axios.post("/order/create-order", data);
};

const deleteOrder = (order_id) => {
  return axios.delete(`/order/delete-order/${order_id}`, {
    data: { order_id },
  });
};

export { getAllOrder, createOrder, deleteOrder };