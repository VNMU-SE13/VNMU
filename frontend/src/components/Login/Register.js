import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast
import axios from "axios";
import "../../assets/css/Register.css";

import userIcon from "../../assets/images/user-icon.png";
import emailIcon from "../../assets/images/email-icon.png";
import lockIcon from "../../assets/images/lock-icon.png";
import eyeIcon from "../../assets/images/eye-icon.png";
import eyeSlashIcon from "../../assets/images/eye-slash-icon.png";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra validation
    if (!user || !email || !password || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin!", { position: "top-right" });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!", { position: "top-right" });
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ!", { position: "top-right" });
      return;
    }

    // Dữ liệu gửi lên API
    const userData = {
      username: user,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/User/Register`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...", {
          position: "top-right",
        });

        setTimeout(() => {
          window.location.href = "/login"; // Chuyển hướng sau khi đăng ký thành công
        }, 2000);
      } else {
        toast.error(response.data.message || "Đăng ký thất bại!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại!", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
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
      <ToastContainer /> {/* Component để hiển thị Toast Notifications */}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang xử lý, vui lòng chờ...</p>
        </div>
      )}

      <div className="register-box">
        <div className="register-header">
          <Link to="/">
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
              <input type="text" placeholder="Tên tài khoản" value={user} onChange={(e) => setUser(e.target.value)} />
            </div>
          </div>

          {/* Email Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <img src={emailIcon} alt="Email Icon" className="input-icon" />
              <input type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <img src={lockIcon} alt="Lock Icon" className="input-icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Mật khẩu"
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

          {/* Confirm Password Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <img src={lockIcon} alt="Lock Icon" className="input-icon" />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img
                src={confirmPasswordVisible ? eyeIcon : eyeSlashIcon}
                alt={confirmPasswordVisible ? "Hide Password" : "Show Password"}
                className="password-icon"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          {/* Links */}
          <div className="form-links">
            <Link to="/login">Quên mật khẩu</Link>
            <Link to="/login">Đã có tài khoản</Link>
          </div>

          {/* Register Button */}
          <button className="register-button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
