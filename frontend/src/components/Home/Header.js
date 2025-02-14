import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Header.css";

const Header = ({ toggleSearchBar }) => {
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
    <button className="action-button" onClick={goToLogin}>
      Trở Thành Thành Viên
    </button>
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
