import axios from "../configs/axiosCustommize";

const getAllPost = () => {
  return axios.get("/post/get-all-post");
};

const createPost = (title, content, created_date) => {
  const data = { title, content, created_date };
  return axios.post("/post/create-post", data);
};

const deletePost = (post_id) => {
  return axios.delete(`/post/delete-post/${post_id}`, { data: { post_id } });
};

export { getAllPost, createPost, deletePost };
