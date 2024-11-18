// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { FcPlus } from "react-icons/fc";
import ModalCreateUser from "../Modal/ModalUser/ModalCreateUser";
import ModalUpdateUser from "../Modal/ModalUser/ModalUpdateUser";
import ModalDeleteUser from "../Modal/ModalUser/ModalDeleteUser";
import TableUser from "../Modal/ModalUser/TableUser";
// import { getListUser, getPage, getByName } from "../../../services/userService";

const ManagerUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const handleShowUpdateModal = () => {
    setShowModalUpdateUser(true);
  };
  const handleShowDeleteModal = () => {
    setShowModalDeleteUser(true);
  };
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">Manager User</div>
      <div className="user-contents">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="btn-add-new">
            <button
              className="btn btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
                gap: "8px",
              }}
              onClick={() => setShowModalCreateUser(true)}
            >
              <FcPlus />
              Add new user
            </button>
          </div>
          <div className="search" style={{ marginRight: "28px" }}>
            <InputGroup className="mb-3" size="md">
              <Form.Control
                placeholder="Enter your input"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </div>
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
        />

        <div className="btn-table-container"></div>
        <TableUser
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerUser;
