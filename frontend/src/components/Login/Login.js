import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google"; // ✅ import GoogleLogin
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/Login.css";
import googleIcon from "../../assets/images/google.png";
import facebookIcon from "../../assets/images/facebook.png";
import twitterIcon from "../../assets/images/twitter.png";
import userIcon from "../../assets/images/user-icon.png";
import lockIcon from "../../assets/images/lock-icon.png";
import eyeIcon from "../../assets/images/eye-icon.png";
import eyeSlashIcon from "../../assets/images/eye-slash-icon.png";
import axios from "axios";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        toast.success("Đăng nhập thành công!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        navigate(response.data.role === "admin" ? "/admin" : "/");
      } else {
        toast.error(response.data.message || "Đăng nhập thất bại.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log(" Google Token:", credentialResponse.credential); 
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/User/google-login`, {
        IdToken: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      toast.success("Đăng nhập Google thành công!");
      navigate(res.data.role === "admin" ? "/admin" : "/");
    } catch (error) {
      console.error("Lỗi Google login:", error);
      toast.error("Đăng nhập Google thất bại.");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang đăng nhập, vui lòng chờ...</p>
        </div>
      )}

      <div className="login-header">
        <Link to="/">
          <img src="/image/LOGO-white.png" alt="VNMU Logo" className="login-logo" />
        </Link>
        <h2>Chào mừng bạn đến với VNMU</h2>
      </div>

      <div className="login-form">
        <h3>Đăng nhập</h3>
        <div className="form-group">
          <div className="input-wrapper">
            <img src={userIcon} alt="User Icon" className="input-icon" />
            <input type="text" placeholder="Nhập e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <img src={lockIcon} alt="Lock Icon" className="input-icon" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Nhập mật khẩu"
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
          <a href="#forgot-password">Quên mật khẩu</a>
          <Link to="/register">Đăng ký</Link>
        </div>

        <button className="login-button" onClick={handleSubmit}>Đăng nhập</button>

        <div className="login-social">
          <span>Hoặc đăng nhập bằng</span>
          <div className="social-icons">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => toast.error("Google Login thất bại.")}
              width="100%"
            />
            {/* Bạn có thể giữ icon Facebook & Twitter nếu sau này tích hợp */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
