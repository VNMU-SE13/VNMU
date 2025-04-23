import React, { useState, useContext, useEffect } from "react";
import "../../assets/css/Footer.css";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [labels, setLabels] = useState({
    title: "Tìm Hiểu Lịch Sử Cùng VNMU",
    newsletter: "Đăng Ký Nhận Bản Tin",
    placeholder: "Nhập email tại đây...",
    send: "Gửi ➤",
    msgEmpty: "Bạn chưa nhập email",
    msgSuccess: "Chúng tôi sẽ gửi thông tin mới nhất về các bảo tàng đến cho bạn",
    social: "Mạng Xã Hội Của VNMU",
    copyright: "Bản quyền của VNMU",
  });

  useEffect(() => {
    const translateLabels = async () => {
      if (language === "vi") {
        setLabels({
          title: "Tìm Hiểu Lịch Sử Cùng VNMU",
          newsletter: "Đăng Ký Nhận Bản Tin",
          placeholder: "Nhập email tại đây...",
          send: "Gửi ➤",
          msgEmpty: "Bạn chưa nhập email",
          msgSuccess: "Chúng tôi sẽ gửi thông tin mới nhất về các bảo tàng đến cho bạn",
          social: "Mạng Xã Hội Của VNMU",
          copyright: "Bản quyền của VNMU",
        });
      } else {
        const entries = Object.entries(labels);
        const result = {};
        for (const [key, value] of entries) {
          result[key] = await translateText(value, language);
        }
        setLabels(result);
      }
    };

    translateLabels();
  }, [language]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSend = () => {
    if (email.trim() === "") {
      setMessage(labels.msgEmpty);
    } else {
      setMessage(labels.msgSuccess);
      setEmail("");
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>{labels.title}</h3>
        <p>📍 Quận Ngũ Hành Sơn, Tp Đà Nẵng</p>
        <p>📞 0394392343</p>
        <p>📧 vnmu@gmail.com</p>
        <p>🌐 www.vnmu.com</p>
      </div>

      <div className="footer-section">
        <h3>{labels.newsletter}</h3>
        <div className="newsletter">
          <input
            type="email"
            placeholder={labels.placeholder}
            className="newsletter-input"
            value={email}
            onChange={handleInputChange}
          />
          <button className="newsletter-button" onClick={handleSend}>
            {labels.send}
          </button>
        </div>
        {message && <p className="newsletter-message">{message}</p>}
      </div>

      <div className="footer-section">
        <h3>{labels.social}</h3>
        <ul className="social-media-list">
          <li>
            <a
              href="https://www.facebook.com/chitu.bangha.1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/image/facebook.png" alt="Facebook" className="social-logo" />
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/image/youtube.png" alt="YouTube" className="social-logo" />
              YouTube
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/image/instagram.png" alt="Instagram" className="social-logo" />
              Instagram
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-copyright">
        {labels.copyright}
      </div>
    </footer>
  );
};

export default Footer;
