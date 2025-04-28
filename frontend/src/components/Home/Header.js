import React, { useEffect, useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../../assets/css/Header.css";
import axios from "axios";
import toSlug from "../../utils/toSlug";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

const Header = ({ toggleSearchBar }) => {
  const [user, setUser] = useState();
  const [isMuseumDropdownOpen, setIsMuseumDropdownOpen] = useState(false);
  const [museums, setMuseums] = useState([]);
  const [translated, setTranslated] = useState({});
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LanguageContext);

  const originalLabels = {
    intro: "Giới Thiệu",
    museum: "Bảo Tàng",
    news: "Tin Tức và Sự Kiện",
    quiz: "Đố vui",
    support: "Quà Lưu Niệm",
    forum: "Diễn đàn",
    shortvideo: "Video Ngắn", // ✅ Thêm shortvideo
    other: "Khác",
    submit: "Nộp đơn",
    help: "Hỗ trợ",
    login: "Trở Thành Thành Viên",
    logout: "Đăng Xuất",
    search: "Tìm Kiếm",
    profile: "Trang Cá Nhân",
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/User/Profile`, {
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

    const fetchMuseum = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Museum`);
        setMuseums(response.data);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };

    fetchMuseum();
    fetchUser();
  }, []);

  useEffect(() => {
    const translateAll = async () => {
      if (language === "vi") {
        setTranslated(originalLabels);
      } else {
        const entries = Object.entries(originalLabels);
        const result = {};

        for (const [key, value] of entries) {
          const translatedText = await translateText(value, language);
          result[key] = translatedText;
        }

        setTranslated(result);
      }
    };

    translateAll();
  }, [language]);

  const goToLogin = () => navigate("/login");
  const goToHome = () => navigate("/");
  const handleNavigate = (path) => navigate(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  return (
    <header className="homepage-header">
      <div className="logo" onClick={goToHome} style={{ cursor: "pointer" }}>
        <img src="/image/LOGO-white.png" alt="VNMU Logo" className="logo-image" />
      </div>

      <nav className="navbar">
        <div className="dropdown">
          <a href="#" className="dropdown-toggle">{translated.intro || "Giới Thiệu"}</a>
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
          <a href="#" className="dropdown-toggle">{translated.museum || "Bảo Tàng"}</a>
          {isMuseumDropdownOpen && (
            <div className="dropdown-menu">
              {museums.map((museum, index) => (
                <a
                  key={index}
                  onClick={() => navigate(`/museums/${toSlug(museum.name)}`)}
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                >
                  {museum.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <a href="#news" className="nav-link">{translated.news || "Tin Tức và Sự Kiện"}</a>
        <a href="#quiz" className="nav-link">{translated.quiz || "Đố vui"}</a>
        <a href="#support" className="nav-link">{translated.support || "Quà Lưu Niệm"}</a>

        <NavLink to="/blog" className="nav-link">
          {translated.forum || "Diễn đàn"}
        </NavLink>

        {/* ✅ Thêm mục Video Ngắn */}
        <NavLink to="/shortvideo" className="nav-link">
          {translated.shortvideo || "Video Ngắn"}
        </NavLink>

        <div className="dropdown">
          <a href="#" className="dropdown-toggle">{translated.other || "Khác"}</a>
          <div className="dropdown-menu">
            <a
              onClick={() => handleNavigate("/submit-form")}
              className="dropdown-item"
              style={{ cursor: "pointer" }}
            >
              {translated.submit || "Nộp đơn"}
            </a>
            <a href="#ho-tro" className="dropdown-item">{translated.help || "Hỗ trợ"}</a>
          </div>
        </div>
      </nav>

      <div className="actions">
        <div className="top-actions">
          {user ? (
            <div className="user-info">
              <span className="username">👤 {user.username}</span>

              <button
                className="action-button"
                onClick={() => navigate("/profile")}
                style={{ marginLeft: "0.5rem" }}
              >
                {translated.profile || "Trang Cá Nhân"}
              </button>

              <button
                className="action-button logout-button"
                onClick={handleLogout}
                style={{ marginLeft: "0.5rem" }}
              >
                {translated.logout || "Đăng Xuất"}
              </button>
            </div>
          ) : (
            <button className="action-button" onClick={goToLogin}>
              {translated.login || "Trở Thành Thành Viên"}
            </button>
          )}

          <button
            className="search-button"
            onClick={() => navigate("/search")}
          >
            {translated.search || "Tìm Kiếm"}
          </button>

          <div className="language-switcher">
            <div className="language-selector" onClick={() => setShowLanguageMenu(!showLanguageMenu)}>
              🌐 {language === "vi" ? "VN" : "EN"}
            </div>
            {showLanguageMenu && (
              <div className="language-menu">
                <div className="language-option" onClick={() => handleLanguageChange("vi")}>🇻🇳 Tiếng Việt</div>
                <div className="language-option" onClick={() => handleLanguageChange("en")}>🇬🇧 English</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
