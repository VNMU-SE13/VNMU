import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/Login.css";
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
    orLoginWith: "Hoặc đăng nhập bằng",
    loading: "Đang đăng nhập, vui lòng chờ...",
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
          orLoginWith: "Hoặc đăng nhập bằng",
          loading: "Đang đăng nhập, vui lòng chờ...",
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
    if (!email) return toast.error("Vui lòng nhập email.");
    if (!emailRegex.test(email)) return toast.error("Email không hợp lệ.");
    if (!password) return toast.error("Vui lòng nhập mật khẩu.");

    const loginData = { email, password };

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/User/Login`, loginData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        // toast.success("Đăng nhập thành công!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        navigate(response.data.role === "admin" ? "/admin" : "/");
      } else {
        toast.error(response.data.message || "Đăng nhập thất bại.");
      }

      const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/Cart/GetByUserId`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      if (!res2.data[0]) {
        console.log('create cart')
        const res3 = await axios.post(`${process.env.REACT_APP_API_URL}/Cart`, {user: '123'} ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        localStorage.setItem("cartId", res3.data.id)
      }
      else {
        localStorage.setItem("cartId", res2.data[0].id)
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/User/google-login`, {
        idToken: credentialResponse.credential,
      });
      console.log("Google login API response:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      console.log("Saved token:", localStorage.getItem("token"));
      console.log("Saved userId:", localStorage.getItem("userId"));
      
      toast.success("Đăng nhập Google thành công!");
      navigate(res.data.role === "admin" ? "/admin" : "/");
    } catch (error) {
      console.error("Lỗi Google login:", error);
      toast.error("Đăng nhập Google thất bại.");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        background: 'url("/image/background.jpg") center/cover no-repeat',
      }}
    >
      <ToastContainer />
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>{labels.loading}</p>
        </div>
      )}

      <div
        className="login-header"
        style={{
          background: 'url("/image/background-nho.jpg") center/cover no-repeat',
        }}
      >
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
              alt={passwordVisible ? "Hide" : "Show"}
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
          <div className="social-icons">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => toast.error("Google Login thất bại.")}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
