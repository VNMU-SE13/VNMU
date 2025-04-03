import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const QuizWrapper = styled.div`
  background-image: url('/image/bg-paper.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
`;

const QuestionRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1400px;
  gap: 40px;
  margin-bottom: 30px;
`;

const QuestionImage = styled.img`
  width: 500px;
  height: 350px;
  border-radius: 20px;
  object-fit: cover;
  flex-shrink: 0;
`;

const QuestionBlock = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  text-align: left;
`;

const QuestionText = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  color: #000;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  background: ${({ selected, correct, isAnswer }) => {
    if (isAnswer) return '#ccffcc';
    if (correct === false && selected) return '#ffcccc';
    return selected ? '#ffeeba' : 'white';
  }};
  border: 2px solid #a40000;
  border-radius: 20px;
  padding: 12px 20px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-weight: bold;
  color: #333;
  width: 100%;
  max-width: 400px;
  min-width: 300px;
  transition: all 0.3s ease;
`;

const ProgressBarWrapper = styled.div`
  width: 500px;
  height: 12px;
  background: black;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
  display: flex;
  align-items: center;
  position: relative;
`;

const fillAnimation = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

const ProgressFill = styled.div`
  background: repeating-linear-gradient(
    45deg,
    #ff9999,
    #ff9999 10px,
    #ccffcc 10px,
    #ccffcc 20px,
    #ffff99 20px,
    #ffff99 30px
  );
  height: 100%;
  animation: ${fillAnimation} 10s linear forwards;
`;

const NextButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  z-index: 1000;

  &:hover {
    background-color: #45a049;
  }
`;

const questions = [
    {
      image: "/image/q1.jpg",
      question: "Ai là người đã lãnh đạo cuộc khởi nghĩa Lam Sơn chống lại quân Minh và sáng lập ra triều đại nhà Lê ở Việt Nam?",
      options: ["Nguyễn Huệ", "Lý Công Uẩn", "Lê Lợi", "Trần Hưng Đạo"],
      answer: "Lê Lợi"
    },
    {
      image: "/image/q2.jpg",
      question: "Chiến thắng nào là mốc son chói lọi trong kháng chiến chống Pháp, năm 1954?",
      options: ["Điện Biên Phủ", "Chiến khu Việt Bắc", "Chiến dịch Biên giới", "Chiến dịch Hồ Chí Minh"],
      answer: "Điện Biên Phủ"
    },
    {
      image: "/image/q3.jpg",
      question: "Ai là vị tướng huyền thoại của Việt Nam trong kháng chiến chống Mỹ?",
      options: ["Lê Duẩn", "Võ Nguyên Giáp", "Nguyễn Văn Linh", "Trường Chinh"],
      answer: "Võ Nguyên Giáp"
    },
    {
      image: "/image/q4.jpg",
      question: "Chiến dịch nào đã giải phóng hoàn toàn miền Nam, thống nhất đất nước?",
      options: ["Chiến dịch Tây Nguyên", "Chiến dịch Huế - Đà Nẵng", "Chiến dịch Hồ Chí Minh", "Chiến dịch Đường 9"],
      answer: "Chiến dịch Hồ Chí Minh"
    },
    {
      image: "/image/q5.jpg",
      question: "Năm nào quân Nhật đảo chính Pháp ở Đông Dương?",
      options: ["1945", "1941", "1930", "1943"],
      answer: "1945"
    },
    {
      image: "/image/q6.jpg",
      question: "Sự kiện nào đánh dấu việc Nhật đầu hàng quân Đồng minh trong Thế chiến II?",
      options: ["Hiệp định Giơ-ne-vơ", "Ngày 2/9/1945", "Ngày 15/8/1945", "Chiến thắng Stalingrad"],
      answer: "Ngày 15/8/1945"
    },
    {
      image: "/image/q7.jpg",
      question: "Ai là người đã viết Tuyên ngôn Độc lập nước Việt Nam Dân chủ Cộng hòa?",
      options: ["Trường Chinh", "Hồ Chí Minh", "Phạm Văn Đồng", "Lê Duẩn"],
      answer: "Hồ Chí Minh"
    },
    {
      image: "/image/q8.jpg",
      question: "Cuộc chiến tranh biên giới phía Bắc chống Trung Quốc xảy ra vào năm nào?",
      options: ["1979", "1984", "1975", "1980"],
      answer: "1979"
    },
    {
      image: "/image/q9.jpg",
      question: "Chiến thắng nào mở đầu cho cuộc kháng chiến chống Pháp?",
      options: ["Chiến thắng Cầu Giấy", "Chiến thắng Tuyên Quang", "Chiến thắng Việt Bắc", "Chiến thắng Phủ Thông"],
      answer: "Chiến thắng Việt Bắc"
    },
    {
      image: "/image/q10.jpg",
      question: "Ai là Chủ tịch nước đầu tiên của nước Việt Nam Dân chủ Cộng hòa?",
      options: ["Tôn Đức Thắng", "Hồ Chí Minh", "Trường Chinh", "Phạm Văn Đồng"],
      answer: "Hồ Chí Minh"
    }
  ]; 

const QuizStart = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timerRef, setTimerRef] = useState(null);

  const currentQ = questions[current] || {
    question: '',
    options: [],
    image: '',
    answer: ''
  };

  useEffect(() => {
    if (isFinished) return;

    setShowAnswer(false);
    setSelected(null);
    setTimeLeft(10);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowAnswer(true);

          if (selected === currentQ.answer) {
            setScore((prev) => prev + 1);
          }

          setTimeout(() => {
            if (current + 1 < questions.length) {
              setCurrent((prev) => prev + 1);
            } else {
              setIsFinished(true);
            }
          }, 3000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerRef(timer);
    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    if (isFinished) {
      const now = new Date();
      const entry = {
        datetime: now.toLocaleString("vi-VN"),
        total: questions.length,
        correct: score,
        score: score * 10,
        rank: score === 10 ? "Top 1" : "Top 10",
        title: score === 10 ? "Trạng Nguyên" : "Bảng Nhãn"
      };

      const old = JSON.parse(localStorage.getItem("quizHistory") || "[]");
      localStorage.setItem("quizHistory", JSON.stringify([...old, entry]));
    }
  }, [isFinished]);

  const handleSelect = (option) => {
    if (!showAnswer) setSelected(option);
  };

  const handleNext = () => {
    if (!showAnswer) {
      clearInterval(timerRef);
      setTimeLeft(0);
      setShowAnswer(true);

      if (selected === currentQ.answer) {
        setScore((prev) => prev + 1);
      }

      setTimeout(() => {
        if (current + 1 < questions.length) {
          setCurrent((prev) => prev + 1);
        } else {
          setIsFinished(true);
        }
      }, 1000);
    }
  };

  return (
    <QuizWrapper>
      {isFinished ? (
        <>
          <h1 style={{ fontSize: '32px', color: '#a40000', marginBottom: '20px' }}>
            🎉 Bạn đã hoàn thành bài thi Trạng Nguyên!
          </h1>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '40px' }}>
            Điểm số của bạn: {score} / {questions.length}
          </h2>

          <div style={{ display: 'flex', gap: '20px' }}>
            <button
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                borderRadius: '10px',
                backgroundColor: '#008CBA',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setIsFinished(false);
              }}
            >
              🔁 Thử tài lần nữa
            </button>

            <button
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                borderRadius: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                window.location.href = '/quiz';
              }}
            >
              ⬅️ Quay lại
            </button>
          </div>
        </>
      ) : (
        <>
          <QuestionRow>
            <QuestionBlock>
              <QuestionText>{currentQ.question}</QuestionText>
              <OptionList>
                {currentQ.options.map((option) => {
                  const isCorrect = showAnswer && option === currentQ.answer;
                  const isWrong = showAnswer && selected === option && option !== currentQ.answer;
                  return (
                    <Option
                      key={option}
                      selected={selected === option}
                      correct={isWrong ? false : undefined}
                      isAnswer={isCorrect}
                      disabled={showAnswer}
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </Option>
                  );
                })}
              </OptionList>
            </QuestionBlock>

            <QuestionImage src={currentQ.image} alt="question" />
          </QuestionRow>

          <ProgressBarWrapper>
            <ProgressFill key={current} />
          </ProgressBarWrapper>

          <NextButton onClick={handleNext}>
            Next Question →
          </NextButton>
        </>
      )}
    </QuizWrapper>
  );
};

export default QuizStart;
