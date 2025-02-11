import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { FcPlus } from "react-icons/fc";
import Quill from "quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPets } from "../../../services/petServices";

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "normal", "large", "huge"]; // Thêm kích cỡ tùy chỉnh nếu muốn
Quill.register(Size, true);

const Header = Quill.import("formats/header");
Header.whitelist = [1, 2, 3, 4];
Quill.register(Header, true);

const ModalCreatePet = (props) => {
  const { show, setShow, fetchAllPet, listPetType } = props;

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setHeight("");
    setWeight("");
    setCoatColor("");
    setBreed("");
    setDescription("");
    setPrice("");
    setAvailable("true");
    setPetTypeId("");
    setStock("");
    setImages([]);
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [coatColor, setCoatColor] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("true");
  const [petTypeId, setPetTypeId] = useState("");
  const [stock, setStock] = useState("");
  const [sex, setSex] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSave = async () => {
    if (!name || !petTypeId || !price || images.length === 0 || !stock) {
      toast("Chưa nhập đủ dữ liệu");
      return;
    }

    try {
      const availableBoolean = available === "true";
      const response = await createPets(
        name,
        age,
        height,
        weight,
        coatColor,
        breed,
        description,
        price,
        availableBoolean,
        petTypeId,
        stock,
        sex,
        images
      );

      if (response && response.errCode === 0) {
        toast(response.message);
        await fetchAllPet();
        handleClose();
      } else {
        toast(response.message);
        handleClose();
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      size="xl"
      className="modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Pet Type</label>
            <select
              className="form-control"
              value={petTypeId}
              onChange={(e) => setPetTypeId(e.target.value)}
            >
              <option value="">Select a pet type</option>
              {listPetType &&
                listPetType.map((item) => (
                  <option key={item.pet_type_id} value={item.pet_type_id}>
                    {item.type_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Sex</label>
            <input
              type="text"
              className="form-control"
              value={sex}
              placeholder="Sex"
              onChange={(e) => setSex(e.target.value)}
            />
          </div>
          <div className="col-3">
            <label className="form-label">Age</label>
            <input
              type="text"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="col-3">
            <label className="form-label">Height</label>
            <input
              type="text"
              className="form-control"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Weight</label>
            <input
              type="text"
              className="form-control"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Coat Color</label>
            <input
              type="text"
              className="form-control"
              placeholder="Coat Color"
              value={coatColor}
              onChange={(e) => setCoatColor(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Breed</label>
            <input
              type="text"
              className="form-control"
              placeholder="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Available</label>
            <select
              className="form-control"
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
            >
              <option value="true">Đã tiêm ngừa</option>
              <option value="false">Chưa tiêm ngừa</option>
            </select>
          </div>
          <div className="col-md-12 mb-5">
            <label className="form-label">Description</label>
            <ReactQuill
              value={description}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [
                    { header: "1" },
                    { header: "2" },
                    { header: "3" },
                    { header: "4" },
                    { font: [] },
                  ],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  [{ align: [] }],
                  ["link"],
                  ["image"],
                ],
              }}
              formats={[
                "header", // Hỗ trợ h1 -> h4
                "font",
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "align",
                "link",
                "image",
              ]}
              className="mt-1"
              style={{ height: "150px" }}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label label-upload" htmlFor="labelUpload">
              <FcPlus />
              Upload File Image
            </label>
            <input
              type="file"
              hidden
              id="labelUpload"
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
            <div className="mt-3">
              {images.length > 0 && (
                <div className="d-flex flex-wrap">
                  {images.map((image, index) => (
                    <div key={index} className="me-2 relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover", borderRadius: 5 }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          padding: "2px 8px",
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreatePet;
