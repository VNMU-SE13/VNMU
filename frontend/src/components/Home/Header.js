import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Header.css";
import axios from "axios";

const Header = ({ toggleSearchBar }) => {
  const [user, setUser] = useState();
  const [isMuseumDropdownOpen, setIsMuseumDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); 
      if (!token) return; 

      try {
        const response = await axios.get("/api/User/Profile", {
          headers: { Authorization: `Bearer ${token}` }, 
        });

        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
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

        {/* ✅ Dropdown cho Bảo Tàng với điều hướng động */}
        <div 
          className="dropdown"
          onMouseEnter={() => setIsMuseumDropdownOpen(true)}
          onMouseLeave={() => setIsMuseumDropdownOpen(false)}
        >
          <a href="#" className="dropdown-toggle">Bảo Tàng</a>
          {isMuseumDropdownOpen && (
            <div className="dropdown-menu">
              <a onClick={() => navigate("/museums/1")} className="dropdown-item">Bảo tàng Quân khu 5</a>
              <a onClick={() => navigate("/museums/2")} className="dropdown-item">Bảo tàng Điêu khắc Chăm</a>
              <a onClick={() => navigate("/museums/3")} className="dropdown-item">Bảo Tàng Đà Nẵng</a>
              <a onClick={() => navigate("/museums/4")} className="dropdown-item">Bảo tàng Mỹ thuật Đà Nẵng</a>
              <a onClick={() => navigate("/museums/5")} className="dropdown-item">Bảo tàng Đồng Đình</a>
              <a onClick={() => navigate("/museums/6")} className="dropdown-item">Nhà trưng bày Hoàng Sa</a>
              <a onClick={() => navigate("/museums/7")} className="dropdown-item">Bảo tàng Tre trúc Sơn Trà Tịnh Viên</a>
              <a onClick={() => navigate("/museums/8")} className="dropdown-item">Bảo tàng Tranh 3D Art In Paradise</a>
              <a onClick={() => navigate("/museums/9")} className="dropdown-item">Thế Giới Úp Ngược</a>
              <a onClick={() => navigate("/museums/10")} className="dropdown-item">Bảo tàng Phật giáo Đà Nẵng</a>
              <a onClick={() => navigate("/museums/11")} className="dropdown-item">Bảo tàng Sáp Đà Nẵng</a>
            </div>
          )}
        </div>

        <a href="#news" className="nav-link">Tin Tức và Sự Kiện</a>
        <a href="#quiz" className="nav-link">Đố vui</a>
        <a href="#support" className="nav-link">Quà Lưu Niệm</a>
        <div className="dropdown">
          <a href="#" className="dropdown-toggle">Khác</a>
          <div className="dropdown-menu">
            <a onClick={() => handleNavigate("/submit-form")} className="dropdown-item" style={{ cursor: "pointer" }}>Nộp đơn</a>
            <a href="#doc-truyen" className="dropdown-item">Blog</a>
            <a href="#ho-tro" className="dropdown-item">Hỗ trợ</a>
          </div>
        </div>
      </nav>
      <div className="actions">
        <div className="top-actions">
          {user ? (
            <div className="user-info">
              <span className="username">👤 {user.username}</span>
              <button className="action-button logout-button" onClick={handleLogout}>Đăng Xuất</button>
            </div>
          ) : (
            <button className="action-button" onClick={goToLogin}>Trở Thành Thành Viên</button>
          )}
          <button className="action-button">Ủng Hộ Hệ Thống</button>
          <button className="search-button" onClick={toggleSearchBar}>Tìm Kiếm</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
