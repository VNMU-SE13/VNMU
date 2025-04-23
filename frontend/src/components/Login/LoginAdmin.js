import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/LoginAdmin.module.scss";
import userIcon from "../../assets/images/user-icon.png";
import lockIcon from "../../assets/images/lock-icon.png";
import eyeIcon from "../../assets/images/eye-icon.png";
import eyeSlashIcon from "../../assets/images/eye-slash-icon.png";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

const Login = () => {
  const { language } = useContext(LanguageContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [labels, setLabels] = useState({
    welcome: "Chào mừng bạn đến với VNMU",
    loginTitle: "Đăng nhập",
    emailPlaceholder: "Nhập e-mail",
    passwordPlaceholder: "Nhập mật khẩu",
    forgotPassword: "Quên mật khẩu",
    register: "Đăng ký",
    loginBtn: "Đăng nhập",
    loading: "Đang đăng nhập, vui lòng chờ...",
    loginWith: "Đăng nhập bằng",
  });

  useEffect(() => {
    const translateLabels = async () => {
      if (language === "vi") {
        setLabels({
          welcome: "Chào mừng bạn đến với VNMU",
          loginTitle: "Đăng nhập",
          emailPlaceholder: "Nhập e-mail",
          passwordPlaceholder: "Nhập mật khẩu",
          forgotPassword: "Quên mật khẩu",
          register: "Đăng ký",
          loginBtn: "Đăng nhập",
          loading: "Đang đăng nhập, vui lòng chờ...",
          loginWith: "Đăng nhập bằng",
        });
      } else {
        const result = {};
        for (const [key, value] of Object.entries(labels)) {
          result[key] = await translateText(value, language);
        }
        setLabels(result);
      }
    };

    translateLabels();
  }, [language]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      toast.error("Vui lòng nhập email.");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: user@example.com).");
      return;
    }

    if (!password) {
      toast.error("Vui lòng nhập mật khẩu.");
      return;
    }

    const loginData = {
      email,
      password,
    };

    setLoading(true);
    try {
      const response = await axios.post("/api/User/Login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Đăng nhập thành công!");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message || "Đăng nhập thất bại.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>{labels.loading}</p>
        </div>
      )}
      <div className="login-header">
        <Link to="/">
          <img src="/image/LOGO-white.png" alt="VNMU Logo" className="login-logo" />
        </Link>
        <h2>{labels.welcome}</h2>
      </div>
      <div className="login-form">
        <h3>{labels.loginTitle}</h3>
        <div className="form-group">
          <div className="input-wrapper">
            <img src={userIcon} alt="User Icon" className="input-icon" />
            <input
              type="text"
              placeholder={labels.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <img src={lockIcon} alt="Lock Icon" className="input-icon" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder={labels.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={passwordVisible ? eyeIcon : eyeSlashIcon}
              alt={passwordVisible ? "Hide Password" : "Show Password"}
              className="password-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <div className="form-links">
          <a href="#forgot-password">{labels.forgotPassword}</a>
          <Link to="/register">{labels.register}</Link>
        </div>
        <button className="login-button" onClick={handleSubmit}>
          {labels.loginBtn}
        </button>
        <div className="login-social">
          <span>{labels.loginWith}</span>
          {/* Bạn có thể thêm các nút mạng xã hội tại đây nếu muốn */}
        </div>
      </div>
    </div>
  );
};

export default Login;
