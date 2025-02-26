import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Header.css";
import axios from "axios";


const Header = ({ toggleSearchBar }) => {

  const [user, setUser] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) return; // Nếu không có token, không gọi API

      try {
        const response = await axios.get("/api/User/Profile", {
          headers: { Authorization: `Bearer ${token}` }, // Gửi token trong headers
        });

        if (response.status === 200) {
          setUser(response.data); // Lưu thông tin user vào state
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
        localStorage.removeItem("token"); // Xóa token nếu không hợp lệ
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/"); // Điều hướng về HomePage
  };

  const handleNavigate = (path) => {
    navigate(path); // Điều hướng tới đường dẫn tùy chỉnh
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    localStorage.removeItem("user"); // Xóa thông tin user
    setUser(null); // Cập nhật UI
    navigate("/"); // Điều hướng về trang chủ
  };

  return (
    <header className="homepage-header">
      <div className="logo" onClick={goToHome} style={{ cursor: "pointer" }}>
        <img src="/image/VNMUDoc.png" alt="VNMU Logo" className="logo-image" />
      </div>
      <nav className="navbar">
        <div className="dropdown">
          <a href="#" className="dropdown-toggle">Giới Thiệu</a>
          <div className="dropdown-menu">
            <a href="#bo-may" className="dropdown-item">Bộ máy tổ chức</a>
            <a href="#lich-su" className="dropdown-item">Lịch sử phát triển</a>
            <a href="#tam-nhin" className="dropdown-item">Tầm nhìn sứ mệnh</a>
            <a href="#chuc-nang" className="dropdown-item">Chức năng, nhiệm vụ</a>
          </div>
        </div>
        <a href="#museum" className="nav-link">Bảo Tàng</a>
        <a href="#news" className="nav-link">Tin Tức và Sự Kiện</a>
        <a href="#quiz" className="nav-link">Đố vui</a>
        <a href="#support" className="nav-link">Quà Lưu Niệm</a>
        <div className="dropdown">
          <a href="#" className="dropdown-toggle">Khác</a>
          <div className="dropdown-menu">
            <a
              onClick={() => handleNavigate("/submit-form")}
              className="dropdown-item"
              style={{ cursor: "pointer" }}
            >
              Nộp đơn
            </a>
            <a href="#doc-truyen" className="dropdown-item">Đọc truyện</a>
            <a href="#ho-tro" className="dropdown-item">Hỗ trợ</a>
          </div>
        </div>
      </nav>
      <div className="actions">
  <div className="top-actions">
  {user ? (
            // Nếu đã đăng nhập, hiển thị tên user và nút đăng xuất
            <div className="user-info">
              <span className="username">👤 {user.usernmae}</span>
              <button className="action-button logout-button" onClick={handleLogout}>
                Đăng Xuất
              </button>
            </div>
          ) : (
            // Nếu chưa đăng nhập, hiển thị nút đăng nhập
            <button className="action-button" onClick={goToLogin}>
              Trở Thành Thành Viên
            </button>
          )}
    <button className="action-button">Ủng Hộ Hệ Thống</button>
    <button className="search-button" onClick={toggleSearchBar}>
      Tìm Kiếm
    </button>
  </div>
</div>

    </header>
  );
};

export default Header;
