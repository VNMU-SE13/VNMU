import React from "react";
import "../../assets/css/QuizAndStore.css";

const QuizAndStore = () => {
  return (
    <div className="quiz-store-container">
      {/* Phần Đố vui */}
      <div className="quiz-section">
        <div className="quiz-content">
          <h2>Đố vui lịch sử</h2>
          <p>
            Thử tài hiểu biết của bạn về các sự kiện lịch sử và bảo vật quý giá tại
            bảo tàng.
          </p>
          <button className="quiz-start-button">Bắt đầu ngay</button>
        </div>
        <div className="quiz-image">
          <img
            src="/image/Quiz.png"
            alt="Quiz Illustration"
            className="quiz-img"
          />
        </div>
      </div>

      {/* Phần Cửa hàng lưu niệm */}
      <div className="store-section">
        <div className="store-image">
          <img
            src="image\Luuniem.png"
            alt="Store Illustration"
            className="store-img"
          />
        </div>
        <div className="store-content">
          <h2>Cửa hàng lưu niệm</h2>
          <p>
            Khám phá hàng trăm sản phẩm độc đáo lấy cảm hứng từ nghệ thuật, từ
            trang sức, sách đến đồ trang trí nhà cửa.
          </p>
          <button className="store-shop-button">Mua ngay</button>
        </div>
      </div>
    </div>
  );
};

export default QuizAndStore;
