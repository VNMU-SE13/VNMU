// src/components/Quiz.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/QuizAndStore.css";

const Quiz = () => {
  const navigate = useNavigate();

  return (
    <div className="quiz-section">
      <div className="quiz-content">
        <h2>Đố vui lịch sử</h2>
        <p>
          Thử tài hiểu biết của bạn về các sự kiện lịch sử và bảo vật quý giá tại bảo tàng.
        </p>
        <button className="quiz-start-button" onClick={() => navigate("/quiz")}>
          Bắt đầu ngay
        </button>
      </div>
      <div className="quiz-image">
        <img src="/image/Quiz.png" alt="Quiz Illustration" className="quiz-img" />
      </div>
    </div>
  );
};

export default Quiz;
