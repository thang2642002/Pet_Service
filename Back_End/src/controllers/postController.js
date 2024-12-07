import postService from "../services/postService";

const getAllPost = async (req, res) => {
  try {
    const getAllPost = await postService.getAllPost();
    if (getAllPost) {
      return res.status(200).json({
        message: "Get all post is the success",
        errCode: 0,
        data: getAllPost,
      });
    } else {
      return res.status(400).json({
        message: "Get all post is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get all post is the fails",
      errCode: -1,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const createPost = await postService.createPost(title, content);
    if (createPost) {
      return res.status(200).json({
        message: "Create post is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create post is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Create post is the fails",
      errCode: -1,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const { title, content } = req.body;
    const updatePost = await postService.updatePost(post_id, title, content);
    if (updatePost) {
      return res.status(200).json({
        message: "Update post is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update post is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Update post is the fails",
      errCode: -1,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const deletePost = await postService.deletePost(post_id);
    if (deletePost) {
      return res.status(200).json({
        message: "Delete post is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete post is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Delete post is the fails",
      errCode: -1,
    });
  }
};

module.exports = { getAllPost, createPost, updatePost, deletePost };
