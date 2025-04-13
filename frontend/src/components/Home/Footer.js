import React, { useState } from "react";
import "../../assets/css/Footer.css";

const Footer = () => {
  const [email, setEmail] = useState(""); // Trạng thái lưu email
  const [message, setMessage] = useState(""); // Trạng thái lưu thông báo

  const handleInputChange = (e) => {
    setEmail(e.target.value); // Cập nhật trạng thái email
  };

  const handleSend = () => {
    if (email.trim() === "") {
      setMessage("Bạn chưa nhập email"); // Hiển thị thông báo nếu email trống
    } else {
      setMessage(
        "Chúng tôi sẽ gửi thông tin mới nhất về các bảo tàng đến cho bạn"
      ); // Hiển thị thông báo nếu có email
      setEmail(""); // Xóa nội dung trong ô nhập sau khi gửi
    }
  };

  return (
    <footer className="footer-container">
      {/* Section: Contact Info */}
      <div className="footer-section">
        <h3>Tìm Hiểu Lịch Sử Cùng VNMU</h3>
        <p>📍 Quận Ngũ Hành Sơn, Tp Đà Nẵng</p>
        <p>📞 0394392343</p>
        <p>📧 vnmu@gmail.com</p>
        <p>🌐 www.vnmu.com</p>
      </div>

      {/* Section: Newsletter */}
      <div className="footer-section">
        <h3>Đăng Ký Nhận Bản Tin</h3>
        <div className="newsletter">
          <input
            type="email"
            placeholder="Nhập email tại đây..."
            className="newsletter-input"
            value={email}
            onChange={handleInputChange} // Lắng nghe thay đổi trong ô nhập
          />
          <button className="newsletter-button" onClick={handleSend}>
            Gửi ➤
          </button>
        </div>
        {message && <p className="newsletter-message">{message}</p>} {/* Hiển thị thông báo */}
      </div>

      {/* Section: Social Media */}
      <div className="footer-section">
        <h3>Mạng Xã Hội Của VNMU</h3>
        <ul className="social-media-list">
          <li>
            <a
              href="https://www.facebook.com/chitu.bangha.1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/image/facebook.png"
                alt="Facebook"
                className="social-logo"
              />
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/image/youtube.png"
                alt="YouTube"
                className="social-logo"
              />
              YouTube
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/image/instagram.png"
                alt="Instagram"
                className="social-logo"
              />
              Instagram
            </a>
          </li>
        </ul>
      </div>

      {/* Section: Copyright */}
      <div className="footer-copyright">Bản quyền của VNMU</div>
    </footer>
  );
};

export default Footer;
