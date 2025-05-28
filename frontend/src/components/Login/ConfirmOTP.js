import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../../assets/css/Login.css";

import { LanguageContext } from "../../context/LanguageContext";

const ConfirmOTP = () => {
  const { language } = useContext(LanguageContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6) return toast.error("Vui lòng nhập đủ 6 số OTP");

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/User/confirm-otp`, {
        email: localStorage.getItem('emailConfirm'),
        otp: code,
      });

      if (response.status === 200) {
        toast.success("Xác thực OTP thành công!");
        localStorage.removeItem('emailConfirm')
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Mã OTP không hợp lệ");
    } finally {
      setLoading(false);
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
          <p>Xác thực OTP...</p>
        </div>
      )}

      <div
        className="login-header"
        style={{
          background: 'url("/image/background-nho.jpg") center/cover no-repeat',
        }}
      >
        <img src="/image/LOGO-white.png" alt="VNMU Logo" className="login-logo" />
        <h2>Xác thực OTP</h2>
      </div>

      <div className="login-form">
        <h3>Nhập mã OTP</h3>
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>
          Mã xác nhận đã được gửi tới <b>{localStorage.getItem('emailConfirm')}</b>
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "20px" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength={1}
              style={{
                width: "45px",
                height: "50px",
                fontSize: "20px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          ))}
        </div>

        <button className="login-button" onClick={handleSubmit} disabled={loading}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ConfirmOTP;
