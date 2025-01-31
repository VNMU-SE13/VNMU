import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import "../../assets/css/Login.css";
import googleIcon from "../../assets/images/google.png";
import facebookIcon from "../../assets/images/facebook.png";
import twitterIcon from "../../assets/images/twitter.png";
import userIcon from "../../assets/images/user-icon.png";
import lockIcon from "../../assets/images/lock-icon.png";
import eyeIcon from "../../assets/images/eye-icon.png";
import eyeSlashIcon from "../../assets/images/eye-slash-icon.png";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        {/* Bọc logo bằng Link để chuyển hướng về trang Home */}
        <Link to="/">
          <img src="/image/LOGO-white.png" alt="VNMU Logo" className="login-logo" />
        </Link>
        <h2>Chào mừng bạn đến với VNMU</h2>
      </div>
      <div className="login-form">
        <h3>Đăng nhập</h3>
        {/* User Input */}
        <div className="form-group">
          <div className="input-wrapper">
            <img src={userIcon} alt="User Icon" className="input-icon" />
            <input type="text" id="username" placeholder="Nhập tên đăng nhập" />
          </div>
        </div>
        {/* Password Input */}
        <div className="form-group">
          <div className="input-wrapper">
            <img src={lockIcon} alt="Lock Icon" className="input-icon" />
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Nhập mật khẩu"
            />
            <img
              src={passwordVisible ? eyeIcon : eyeSlashIcon}
              alt={passwordVisible ? "Hide Password" : "Show Password"}
              className="password-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        {/* Links */}
        <div className="form-links">
          <a href="#forgot-password">Quên mật khẩu</a>
          <Link to="/register">Đăng ký</Link>
        </div>
        {/* Login Button */}
        <button className="login-button">Đăng nhập</button>
        {/* Social Login */}
        <div className="login-social">
          <span>Đăng nhập bằng</span>
          <div className="social-icons">
            <a
              href="https://accounts.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={googleIcon} alt="Google" className="social-icon" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
