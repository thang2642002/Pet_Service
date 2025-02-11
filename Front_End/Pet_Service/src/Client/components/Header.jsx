import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faBars,
  faUser,
  faCartShopping,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/Slices/userSlices";
import { logoutUser } from "../../services/userServices";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  getUserNotification,
  deleteNotification,
} from "../../services/notificationServices";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [inputSearch, setInputSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleLogOut = async () => {
    await logoutUser();
    localStorage.removeItem("access_tokens");
    dispatch(logout());
  };

  const handleSearch = (e, type) => {
    if (e.key === "Enter") {
      navigate(`/category-product/${type}`, { state: { inputSearch } });
      setInputSearch("");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const fetchAllNotification = async () => {
    const data = await getUserNotification(user?.data?.user_id);
    if (data && data.errCode === 0) {
      setNotifications(data.data);
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  };

  const handleDeleteNotification = async (id) => {
    try {
      const notificationDelete = await deleteNotification(id);
      if (notificationDelete && notificationDelete.errCode === 0) {
        toast.success("Xóa thông báo thành công");
        fetchAllNotification();
      } else {
        toast.success("Xóa thông báo thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllNotification();
  }, [user]);

  const notificationMenu = (
    <div className="max-h-[300px] w-[300px] overflow-y-auto bg-white shadow-lg rounded-lg">
      {notifications && notifications.length > 0 ? (
        notifications.map((item, index) => (
          <>
            <div
              key={`${index} + ${item.notification_id}`}
              className="p-2 border-b hover:bg-gray-100 cursor-pointer flex flex-col"
            >
              <div className="flex justify-between">
                <div> {item.message}</div>
                <div>
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() =>
                      handleDeleteNotification(item.notification_id)
                    }
                  />
                </div>
              </div>
              <div className="text-[12px] flex justify-end text-blue-300">
                {formatDate(item.updatedAt)}
              </div>
            </div>
          </>
        ))
      ) : (
        <div className="p-2 text-gray-500">Không có thông báo nào</div>
      )}
    </div>
  );

  return (
    <div className="header flex justify-between items-center p-4 bg-white">
      <div className="menu">
        <Dropdown
          overlay={
            <Menu
              items={[
                { label: <a href="/">Trang chủ</a>, key: "1" },
                { label: <a href="/info-pet">Dịch vụ</a>, key: "2" },
                { label: <a href="/contact">Liên hệ</a>, key: "3" },
              ]}
            />
          }
          trigger={["click"]}
        >
          <div className="flex flex-col justify-center items-center cursor-pointer">
            <FontAwesomeIcon icon={faBars} className="icon text-lg" />
            <div>Menu</div>
          </div>
        </Dropdown>
      </div>

      <div className="logo cursor-pointer">
        <a href="/">
          <img
            src="https://theme.hstatic.net/200000263355/1001161916/14/logo.png?v=134"
            alt="logo"
            className="w-[70px] h-[70px]"
          />
        </a>
      </div>

      <div className="search mx-4 w-[400px]">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => handleSearch(e, "search")}
        />
      </div>

      <div className="header-action flex items-center gap-4">
        {user?.data ? (
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    label: <a href="/profile-user">Thông tin tài khoản</a>,
                    key: "1",
                  },
                  {
                    label: <a href="/order-history">Xem đơn hàng</a>,
                    key: "2",
                  },
                  user?.data?.role === "manager" && {
                    label: <a href="/admin">Quản lý trang</a>,
                    key: "3",
                  },
                  {
                    label: <div onClick={handleLogOut}>Đăng xuất</div>,
                    key: "4",
                  },
                ]}
              />
            }
            trigger={["click"]}
          >
            <div className="user-info flex items-center gap-2 cursor-pointer">
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-700 text-lg"
              />
              <span className="font-semibold text-gray-700">
                {user?.data?.user_name}
              </span>
            </div>
          </Dropdown>
        ) : (
          <div
            className="account flex flex-col justify-center items-center cursor-pointer"
            onClick={handleLogin}
          >
            <FontAwesomeIcon icon={faUser} className="icon text-gray-700" />
            <div>Tài Khoản</div>
          </div>
        )}

        {user?.data && (
          <Dropdown
            overlay={notificationMenu}
            placement="bottom"
            trigger={["click"]}
          >
            <div className="relative cursor-pointer bell">
              <FontAwesomeIcon
                icon={faBell}
                className="text-gray-700 text-2xl"
              />
              <span className="absolute top-[-5px] right-[-8px] px-[5px] bg-red-500 text-[10px] rounded-full text-white">
                {notifications.length}
              </span>
            </div>
          </Dropdown>
        )}

        <Link
          to={`shop-carts/${user?.data?.user_id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="carts flex flex-col justify-center items-center cursor-pointer">
            <div className="relative">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="icon text-gray-700"
              />
              <span className="absolute top-[-15px] right-[-25px] px-[7px] py-[1px] bg-red-500 text-[14px] rounded-full text-white">
                {cart.totalItems}
              </span>
            </div>
            <div>Giỏ Hàng</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
