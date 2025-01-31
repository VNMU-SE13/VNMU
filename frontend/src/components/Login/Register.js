import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import "../../assets/css/Register.css";
import userIcon from "../../assets/images/user-icon.png";
import emailIcon from "../../assets/images/email-icon.png";
import lockIcon from "../../assets/images/lock-icon.png";
import otpIcon from "../../assets/images/otp-icon.png";
import eyeIcon from "../../assets/images/eye-icon.png";
import eyeSlashIcon from "../../assets/images/eye-slash-icon.png";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(/image/background.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="register-box">
        <div className="register-header">
          <Link to="/">
            {/* Logo điều hướng về Home */}
            <img src="/image/LOGO-white.png" alt="VNMU Logo" className="register-logo" />
          </Link>
          <h2>Chào mừng bạn đến với VNMU</h2>
        </div>
        <div className="register-form">
          <h3>Đăng ký</h3>
          {/* Username Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <img src={userIcon} alt="User Icon" className="input-icon" />
              <input type="text" id="username" placeholder="Tên tài khoản" />
            </div>
          </div>
          {/* Email Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <img src={emailIcon} alt="Email Icon" className="input-icon" />
              <input type="email" id="email" placeholder="Nhập email" />
            </div>
          </div>
          {/* Password Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <img src={lockIcon} alt="Lock Icon" className="input-icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Mật khẩu"
              />
              <img
                src={passwordVisible ? eyeIcon : eyeSlashIcon}
                alt={passwordVisible ? "Hide Password" : "Show Password"}
                className="password-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          {/* Confirm Password Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <img src={lockIcon} alt="Lock Icon" className="input-icon" />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirm-password"
                placeholder="Xác nhận mật khẩu"
              />
              <img
                src={confirmPasswordVisible ? eyeIcon : eyeSlashIcon}
                alt={confirmPasswordVisible ? "Hide Password" : "Show Password"}
                className="password-icon"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>
          {/* OTP Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <img src={otpIcon} alt="OTP Icon" className="input-icon" />
              <input type="text" id="otp" placeholder="Nhập OTP" />
              <button className="otp-button">OTP</button>
            </div>
          </div>
          {/* Links */}
          <div className="form-links">
            <Link to="/login">Quên mật khẩu</Link>
            <Link to="/login">Đã có tài khoản</Link>
          </div>
          {/* Register Button */}
          <button className="register-button">Đăng ký</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
