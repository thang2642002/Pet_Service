import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { createPost } from "../../../services/postServices";

const ModalCreatePost = (props) => {
  const { show, setShow, fetchAllPost } = props;

  const handleClose = () => {
    setShow(false);
    setTitle("");
    setContent("");
    setCreateDate("");
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createDate, setCreateDate] = useState("");

  const handleSubmitCreatePost = async () => {
    const data = await createPost(title, content, createDate);
    if (data && data.errCode === 0) {
      toast(data.message);
      await fetchAllPost();
      handleClose();
    } else {
      toast(data.message);
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-6">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Create Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Create Date"
                value={createDate}
                onChange={(e) => setCreateDate(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Content</label>
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreatePost()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreatePost;
