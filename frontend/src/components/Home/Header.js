import React, { useEffect, useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../../assets/css/Header.css";
import axios from "axios";
import toSlug from "../../utils/toSlug";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import FullPageLoading from '../common/FullPageLoading'


const Header = ({ toggleSearchBar }) => {
  const [user, setUser] = useState();
  const [isMuseumDropdownOpen, setIsMuseumDropdownOpen] = useState(false);
  const [museums, setMuseums] = useState([]);
  const [translated, setTranslated] = useState({});
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LanguageContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [loading, setLoading] = useState()

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

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/User/Profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        if (response.status === 200) {
          localStorage.setItem('isPremium', response.data.isPremium)
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
    localStorage.removeItem("userId");
    localStorage.removeItem('isPremium')
    setUser(null);
    navigate("/");
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

 const handleUpgrade = async () => {
  const successUrl = "http://localhost:3000/payment-success";
  const cancelUrl = "http://localhost:3000/";
  try {
    setLoading(true)
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/PayOs/create-payment?successUrl=${encodeURIComponent(successUrl)}&cancelUrl=${encodeURIComponent(cancelUrl)}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    if (res.status === 200 && res.data.checkoutUrl) {
      window.location.href = res.data.checkoutUrl; // Điều hướng tới trang thanh toán
    }
  } catch (err) {
    console.log(err);
  }
  finally {
    setLoading(false)
  }
};

  if (loading) return <FullPageLoading isLoading={true} />
  return (
    <header className="homepage-header">
      <div className="logo" onClick={goToHome} style={{ cursor: "pointer" }}>
        <img src="/image/LOGO-white.png" alt="VNMU Logo" className="logo-image" />
      </div>

      <nav className="navbar">
        <div className="dropdown">
          <a href="#" className="dropdown-toggle">{translated.intro || "Giới Thiệu"}</a>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              onClick={() => navigate("/about#bo-may")}
              style={{ cursor: "pointer" }}
            >
              Bộ máy tổ chức
            </a>
            <a
              className="dropdown-item"
              onClick={() => navigate("/about#lich-su")}
              style={{ cursor: "pointer" }}
            >
              Lịch sử phát triển
            </a>
            <a
              className="dropdown-item"
              onClick={() => navigate("/about#tam-nhin")}
              style={{ cursor: "pointer" }}
            >
              Tầm nhìn sứ mệnh
            </a>
            <a
              className="dropdown-item"
              onClick={() => navigate("/about#chuc-nang")}
              style={{ cursor: "pointer" }}
            >
              Chức năng, nhiệm vụ
            </a>
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

        <a onClick={() => navigate("/news")} className="nav-link" style={{ cursor: "pointer" }}>
          {translated.news || "Tin Tức và Sự Kiện"}
        </a>
        <a onClick={() => navigate("/quiz")} className="nav-link" style={{ cursor: "pointer" }}>
          {translated.quiz || "Đố vui"}
        </a>
        <a onClick={() => navigate("/souvenir")} className="nav-link" style={{ cursor: "pointer" }}>
          {translated.support || "Quà Lưu Niệm"}
        </a>

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
            <div className="user-info" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="username">👤 {user.usernmae}</span>

              <div className="dropdown profile-dropdown">
                <button
                  className="dropdown-toggle action-button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  Hồ sơ của tôi
                </button>
                {localStorage.getItem('isPremium')=='false' && (<button className="action-button" onClick={() => setShowUpgradePopup(true)}>
                  Nâng cấp thành viên
                </button>)}

                {isProfileMenuOpen && (
                  <div className="dropdown-menu show">

                    <a onClick={() => navigate("/profile")} className="dropdown-item">
                      {translated.profile || "Trang Cá Nhân"}
                    </a>
                    {user.roles.includes("manager") && (
                      <a onClick={() => navigate("/manager")} className="dropdown-item">
                        Bảo tàng của tôi
                      </a>
                    )}
                  </div>
                )}
              </div>

              <button className="action-button logout-button" onClick={handleLogout}>
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
      {showUpgradePopup && (
        <div className="upgrade-popup-overlay" onClick={() => setShowUpgradePopup(false)}>
          <div className="upgrade-popup" onClick={(e) => e.stopPropagation()}>
            <h3>🎉 Nâng cấp thành viên VIP</h3>
            <p>Khi trở thành thành viên VIP, bạn có thể sử dụng những chức năng mới:</p>
            <ul>
              <li>✨ Xem hình ảnh 3D của hiện vật</li>
              <li>🎧 Nghe Podcast nội dung hiện vật</li>
            </ul>
            <div className="upgrade-actions">
              <button className="upgrade-button" onClick={() => handleUpgrade()}>
                Tôi muốn nâng cấp
              </button>
              <button className="close-button" onClick={() => setShowUpgradePopup(false)}>
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
