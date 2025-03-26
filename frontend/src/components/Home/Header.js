import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Header.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Header = ({ toggleSearchBar }) => {
  const [user, setUser] = useState();
  const [isMuseumDropdownOpen, setIsMuseumDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
          <a href="#" className="dropdown-toggle">{t("introduce")}</a>
          <div className="dropdown-menu">
            <a href="#bo-may" className="dropdown-item">Bộ máy tổ chức</a>
            <a href="#lich-su" className="dropdown-item">Lịch sử phát triển</a>
            <a href="#tam-nhin" className="dropdown-item">Tầm nhìn sứ mệnh</a>
            <a href="#chuc-nang" className="dropdown-item">Chức năng, nhiệm vụ</a>
          </div>
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setIsMuseumDropdownOpen(true)}
          onMouseLeave={() => setIsMuseumDropdownOpen(false)}
        >
          <a href="#" className="dropdown-toggle">{t("museum")}</a>
          {isMuseumDropdownOpen && (
            <div className="dropdown-menu">
              <a onClick={() => navigate("/museums/bao-tang-quan-khu-5")} className="dropdown-item">Bảo tàng Quân khu 5</a>
              <a onClick={() => navigate("/museums/bao-tang-dieu-khac-cham")} className="dropdown-item">Bảo tàng Điêu khắc Chăm</a>
              <a onClick={() => navigate("/museums/bao-tang-da-nang")} className="dropdown-item">Bảo Tàng Đà Nẵng</a>
              <a onClick={() => navigate("/museums/bao-tang-my-thuat-da-nang")} className="dropdown-item">Bảo tàng Mỹ thuật Đà Nẵng</a>
              <a onClick={() => navigate("/museums/bao-tang-dong-dinh")} className="dropdown-item">Bảo tàng Đồng Đình</a>
              <a onClick={() => navigate("/museums/nha-trung-bay-hoang-sa")} className="dropdown-item">Nhà trưng bày Hoàng Sa</a>
              <a onClick={() => navigate("/museums/bao-tang-tre-truc-son-tra-tinh-vien")} className="dropdown-item">Bảo tàng Tre trúc Sơn Trà Tịnh Viên</a>
              <a onClick={() => navigate("/museums/bao-tang-tranh-3d-art-in-paradise")} className="dropdown-item">Bảo tàng Tranh 3D Art In Paradise</a>
              <a onClick={() => navigate("/museums/the-gioi-up-nguoc")} className="dropdown-item">Thế Giới Úp Ngược</a>
              <a onClick={() => navigate("/museums/bao-tang-phat-giao-da-nang")} className="dropdown-item">Bảo tàng Phật giáo Đà Nẵng</a>
              <a onClick={() => navigate("/museums/bao-tang-sap-da-nang")} className="dropdown-item">Bảo tàng Sáp Đà Nẵng</a>
            </div>
          )}
        </div>

        <a href="#news" className="nav-link">{t("news")}</a>
        <a href="#quiz" className="nav-link">{t("quiz")}</a>
        <a href="#support" className="nav-link">{t("souvenir")}</a>

        <div className="dropdown">
          <a href="#" className="dropdown-toggle">{t("other")}</a>
          <div className="dropdown-menu">
            <a onClick={() => handleNavigate("/submit-form")} className="dropdown-item" style={{ cursor: "pointer" }}>{t("apply")}</a>
            <a href="#doc-truyen" className="dropdown-item">{t("blog")}</a>
            <a href="#ho-tro" className="dropdown-item">{t("support")}</a>
          </div>
        </div>
      </nav>
      <div className="actions">
        <div className="top-actions">
          {user ? (
            <div className="user-info">
              <span className="username">👤 {user.username}</span>
              <button className="action-button logout-button" onClick={handleLogout}>{t("logout")}</button>
            </div>
          ) : (
            <button className="action-button" onClick={goToLogin}>{t("login")}</button>
          )}

          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            className="action-button"
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>

          <button className="search-button" onClick={toggleSearchBar}>{t("search")}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
