import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';


const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 0 auto;
  align-items: center;
  max-width: 1200px;
`;

const QuizSection = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px;
  margin: 0;
  gap: 40px;
  background: url("/image/pattern.jpg") no-repeat center center;
  background-size: cover;
  background-color: rgba(255, 255, 255, 0.85);
  background-blend-mode: overlay;
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;

const QuizContent = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }

  h2 {
    font-size: 32px;
    background: linear-gradient(90deg, #c8102e 0%, #f59e0b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    margin-bottom: 16px;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 30%; /* bắt đầu nhỏ */
  height: 3px;
  background-color: #c8102e;
  border-radius: 6px;
  animation: expand 2s infinite alternate;
}
  @keyframes expand {
    from {
      width: 30%;
    }
    to {
      width: 100%;
    }
  }

  p {
    font-size: 18px;
    color: #555;
    margin-bottom: 20px;
  }
`;

const RewardText = styled(motion.p)`
  font-size: 18px;
  color: #c8102e;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const QuizImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const QuizImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const StartButton = styled(motion.button)`
  background-color: #c8102e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  box-shadow: 0px 4px 15px rgba(200, 16, 46, 0.4);

  &:hover {
    background-color: #a00d22;
    box-shadow: 0px 6px 20px rgba(160, 13, 34, 0.5);
  }
`;

const Quiz = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const [title, setTitle] = useState("Đố vui lịch sử");
  const [description, setDescription] = useState(
    "Thử tài hiểu biết của bạn về các sự kiện lịch sử và bảo vật quý giá tại bảo tàng."
  );
  const [buttonText, setButtonText] = useState("Bắt đầu ngay");

  useEffect(() => {
    const translateContent = async () => {
      if (language === "vi") {
        setTitle("Đố vui lịch sử");
        setDescription("Thử tài hiểu biết của bạn về các sự kiện lịch sử và bảo vật quý giá tại bảo tàng.");
        setButtonText("Bắt đầu ngay");
      } else {
        const t1 = await translateText("Đố vui lịch sử", language);
        const t2 = await translateText("Thử tài hiểu biết của bạn về các sự kiện lịch sử và bảo vật quý giá tại bảo tàng.", language);
        const t3 = await translateText("Bắt đầu ngay", language);
        setTitle(t1);
        setDescription(t2);
        setButtonText(t3);
      }
    };

    translateContent();
  }, [language]);

  const handleClickStart = () => {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng đăng nhập',
        text: 'Bạn cần đăng nhập để làm bài Quiz.',
        confirmButtonText: 'Đăng nhập ngay'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    } 
    navigate('/quiz')
  }

  return (
    <QuizContainer>
      <QuizSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <QuizContent>
          <h2>{title}</h2>
          <p>{description}</p>

          <RewardText
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            🏆 Phần thưởng hấp dẫn đang chờ bạn!
          </RewardText>

          <StartButton
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => handleClickStart()}
          >
            {buttonText}
          </StartButton>
        </QuizContent>

        <QuizImageWrapper>
          <QuizImage
            src="/image/Quiz.png"
            alt="Quiz Illustration"
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          />
        </QuizImageWrapper>
      </QuizSection>
    </QuizContainer>
  );
};

export default Quiz;
