import axios from "../configs/axiosCustommize";

const getAllProduct = () => {
  return axios.get("/product/get-all-product");
};

const createProduct = (name, description, price, categoryId, stock, images) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("category_id", categoryId);
  formData.append("stock", stock);
  images.forEach((image) => formData.append("images", image));
  return axios.post("/product/create-product", formData);
};

const deleteProduct = (product_id) => {
  return axios.delete(`/product/delete-product/${product_id}`, {
    data: { product_id },
  });
};

export { getAllProduct, createProduct, deleteProduct };