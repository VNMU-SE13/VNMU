import React, { useState, useEffect, useContext, use } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import axios from "axios";

// === Global animation for modal ===
// === Global animation for modal ===
const keyframes = `
@keyframes fadeScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`;

const PageWrapper = styled.div`
  background-image: url('/image/bg-paper.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 60px 20px 40px 20px;
  position: relative;
  text-align: center;
  overflow-x: hidden;
`;

const Title = styled.h1`
  font-size: 42px;
  font-family: 'SVN-Voga', serif;
  color: #4b2e2e;
  margin-bottom: 30px;
`;

const ImageContainer = styled.div`
  margin: 0 auto 40px auto;
  width: 480px;
  max-width: 90%;
  border: 6px solid #d6c29a;
  border-radius: 20px;
  background-color: #fdf5e6;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    border-radius: 14px;
    display: block;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
`;

const Button = styled.button`
  width: 100%;
  background-color: #a40000;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    background-color: #7a0000;
    transform: translateY(2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Decoration = styled.img`
  position: absolute;
  z-index: 2;

  &.kid-top-left { top: 140px; left: 350px; width: 220px; }
  &.lantern-top-left { top: 10px; left: 30px; width: 120px; }
  &.kid-top-right { top: 140px; right: 350px; width: 220px; }
  &.lantern-top-right { top: 10px; right: 20px; width: 200px; }
  &.kid-bottom-left { bottom: -10px; left: 30px; width: 500px; }
  &.kid-bottom-right { bottom: 40px; right: 30px; width: 360px; }
  &.cloud-left { bottom: -30px; left: 10px; width: 180px; }
  &.cloud-right { bottom: -20px; right: -10px; width: 200px; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px 40px;
  border-radius: 20px;
  max-width: 650px;
  width: 100%;
  position: relative;
  font-family: 'Times New Roman', serif;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
`;

const ModalContentAnimated = styled(ModalContent)`
  animation: fadeScale 0.4s ease-in-out;
  background-image: url('/image/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  background: #ff4444;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #cc0000;
  }
`;

const ModalTitle = styled.h2`
  font-size: 30px;
  font-family: 'SVN-Voga', serif;
  text-align: center;
  margin-bottom: 24px;
  color: #4b2e2e;
`;

const HorizontalGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
`;

const QuizStartButton = styled(Button)`
  margin-top: 30px;
  background-color: #0f6900;

  &:hover {
    background-color: #0a4e00;
  }
`;

const SelectedButton = styled(Button)`
  background-color: #d4af37 !important;
  border: 2px solid #4b0000;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  background: white;
  margin-top: 10px;
`;

const Th = styled.th`
  text-align: center;
  padding: 10px 8px;
  border-bottom: 2px solid #ccc;
  font-weight: bold;
`;

const Td = styled.td`
  text-align: center;
  padding: 8px 6px;
`;

const NoData = styled.p`
  font-style: italic;
  text-align: center;
  color: #555;
  margin-top: 20px;
`;

const Subtitle = styled.h3`
  font-size: 22px;
  font-family: 'SVN-Voga', serif;
  color: #5c4033;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
`;



const QuizHome = () => {
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [showStartModal, setShowStartModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const { language } = useContext(LanguageContext);
  const [periods, setPeriods] = useState()
  const [level, setLevel] = useState(null)
  const [isNext, setIsNext] = useState(false)
  const [listQuiz, setListQuiz] = useState()
  const [selectedQuizId, setSelectedQuizId] = useState()
  const [text, setText] = useState('')
  const [modalAI, setModalAI] = useState(false)
  const [loading, setLoading] = useState(false)
  const [quizAI, setQuizAI] = useState()

  const t = {
    title: {
      vi: "Trạng nguyên lịch sử Việt",
      en: "Vietnam History Master"
    },
    start: {
      vi: "Bắt đầu",
      en: "Start"
    },
    guide: {
      vi: "Hướng dẫn",
      en: "Guide"
    },
    history: {
      vi: "Lịch sử câu đố",
      en: "Quiz History"
    },
    selectTitle: {
      vi: "Chọn giai đoạn & chủ đề",
      en: "Select Period & Topic"
    },
    selectedTopic: {
      vi: "Đã chọn chủ đề:",
      en: "Selected topic:"
    },
    noTopic: {
      vi: "Chưa chọn chủ đề. Bạn có thể thi toàn bộ giai đoạn.",
      en: "No topic selected. You can take the full period."
    },
    historyEmpty: {
      vi: "Chưa có dữ liệu",
      en: "No data available"
    },
    guideText: {
      vi: `🎯 Mục tiêu: Trở thành Trạng Nguyên lịch sử Việt bằng cách trả lời đúng nhiều câu hỏi nhất.

📌 Cách chơi:
- Nhấn vào "Bắt đầu" để chọn giai đoạn lịch sử và chủ đề câu hỏi.
- Sau khi chọn, bạn sẽ được chuyển sang giao diện câu hỏi.
- Mỗi câu hỏi có 4 đáp án A, B, C, D — chọn một đáp án bạn cho là đúng.

⏱ Tự động chuyển câu: Sau khi chọn đáp án, hệ thống sẽ thông báo đúng/sai và tự chuyển câu.

📊 Kết thúc lượt chơi:
- Khi hoàn thành câu hỏi, bạn sẽ nhận điểm, xếp hạng và danh hiệu.
- Kết quả lưu trong phần "Lịch sử câu đố".

🔁 Có thể chơi lại bao nhiêu lần tùy thích!`,
      en: `🎯 Goal: Become the Vietnamese History Master by answering the most correct questions.

📌 How to play:
- Click "Start" to choose a historical period and quiz topic.
- After selection, you will enter the quiz interface.
- Each question has 4 options A, B, C, D — choose the most correct one.

⏱ Auto-switch: The quiz will auto-proceed after selecting your answer with feedback.

📊 End of game:
- After all questions, you’ll receive your score, rank, and title.
- Your result will be saved in "Quiz History".

🔁 You can replay as many times as you want!`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPeriod = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryHistorical`)
        setPeriods(resPeriod.data)
      }
      catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = keyframes;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (showHistory) {
      const stored = localStorage.getItem("quizHistory");
      setHistoryData(stored ? JSON.parse(stored).reverse() : []);
    }
  }, [showHistory]);

  const handleStart = () => {
    const periodParam = encodeURIComponent(selectedPeriod);
    navigate(`/quiz/start/${selectedQuizId}`);
  };

  const handleNext = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Quiz/filter?level=${level}&categoryHistoricalId=${selectedPeriod}`)
      setListQuiz(res.data)
      setIsNext(true)
    }
    catch(err) {
      console.log(err)
    }
  }

  const handleSelectLevel = (selectedLevel) => {
    setLevel(selectedLevel)
    setSelectedPeriod(null)
    setSelectedQuizId(null)
  }

  const handleSelectPeriod = (periodId) => {
    setSelectedPeriod(periodId)
    setSelectedQuizId(null)
  }

  const handleSelectQuiz = (quizId) => {
    setSelectedQuizId(quizId)
  }

  const handleSendToAI = () => {
    navigate(`/quiz/startwithai?quiz=${encodeURIComponent(text)}`)
  }

  return (
    <PageWrapper>
      <Decoration src="/image/kid1.png" alt="kid1" className="kid-top-left" />
      <Decoration src="/image/lantern1.png" alt="lantern1" className="lantern-top-left" />
      <Decoration src="/image/kid2.png" alt="kid2" className="kid-top-right" />
      <Decoration src="/image/lantern2.png" alt="lantern2" className="lantern-top-right" />
      <Decoration src="/image/kid3.png" alt="kid3" className="kid-bottom-left" />
      <Decoration src="/image/kid4.png" alt="kid4" className="kid-bottom-right" />
      <Decoration src="/image/cloud-left.png" alt="cloud-left" className="cloud-left" />
      <Decoration src="/image/cloud-right.png" alt="cloud-right" className="cloud-right" />

      <Title>{t.title[language]}</Title>

      <ImageContainer>
        <img src="/image/quizz-main.jpg" alt="Quiz" />
      </ImageContainer>

      <ButtonGroup>
        <Button onClick={() => setShowStartModal(true)}>{t.start[language]}</Button>
        <Button onClick={() => setModalAI(true)}>Tạo quiz với AI</Button>
        <Button onClick={() => setShowGuide(true)}>{t.guide[language]}</Button>
        <Button onClick={() => setShowHistory(true)}>{t.history[language]}</Button>
        <Button onClick={() => navigate('/')}>Home</Button>
      </ButtonGroup>

      {/* Nhập nội dung Quiz cho AI tạo */}
      {modalAI && (
        <ModalOverlay>
          <ModalContentAnimated>
            <Subtitle>Nhập yêu cầu của bạn để AI tạo quiz</Subtitle>
            <textarea
              style={{
                width: '100%',
                minHeight: '120px',
                fontSize: '16px',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                resize: 'vertical',
                fontFamily: 'Times New Roman, serif',
                boxSizing: 'border-box'
              }}
              placeholder="Ví dụ: Hãy tạo 5 câu hỏi trắc nghiệm về lịch sử thời Trần..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
        
            <QuizStartButton
              onClick={() => {
                if (!text.trim()) {
                  alert("Vui lòng nhập nội dung!");
                  return;
                }
                handleSendToAI(); 
              }}
              style={{ marginTop: '20px' }}
            >
              Gửi yêu cầu
            </QuizStartButton>
          </ModalContentAnimated>
        </ModalOverlay>
      )}

      {showStartModal && (
        <ModalOverlay>
          <ModalContentAnimated>
            <CloseButton onClick={() => {
              setShowStartModal(false);
              setLevel(null)
              setSelectedPeriod(null);
              setIsNext(false)
              setSelectedQuizId(null)
            }}>×</CloseButton>

            <ModalTitle>CÂU ĐỐ LỊCH SỬ VIỆT NAM</ModalTitle>

            {/* Phần chọn Level */}
            {!isNext && (<>
              <Subtitle>Chọn Level</Subtitle>
              <HorizontalGroup>
                {[1, 2, 3].map(optLevel => (
                  level === optLevel ? (
                    <SelectedButton key={optLevel} onClick={() => {
                      handleSelectLevel()
                    }}>
                      Level {optLevel}
                    </SelectedButton>
                  ) : (
                    <Button key={optLevel} onClick={() => {
                      handleSelectLevel(optLevel)
                    }}>
                      Level {optLevel}
                    </Button>
                  )
                ))}
              </HorizontalGroup>
            </>)}

            {/* Phần chọn Giai đoạn */}
            {level && !isNext && (
              <>
                <Subtitle>Chọn Giai đoạn</Subtitle>
                <HorizontalGroup>
                  {periods.map(period => (
                    selectedPeriod === period.id ? (
                      <SelectedButton key={period.id} onClick={() => {
                        handleSelectPeriod(period.id);
                      }}>
                        {period.name}
                      </SelectedButton>
                    ) : (
                      <Button key={period.id} onClick={() => {
                        handleSelectPeriod(period.id);
                      }}>
                        {period.name}
                      </Button>
                    )
                  ))}
                </HorizontalGroup>
              </>
            )}

            {
              isNext && (
                <>
                  <Subtitle>Chọn Quiz</Subtitle>
                  <HorizontalGroup>
                    {listQuiz.map(quiz => (
                      selectedQuizId === quiz.id ? (
                        <SelectedButton key={quiz.id} onClick={() => {
                          handleSelectQuiz()
                        }}>
                          {quiz.description}
                        </SelectedButton>
                      ) : (
                        <Button key={quiz.id} onClick={() => {
                          handleSelectQuiz(quiz.id)
                        }}>
                          {quiz.description}
                        </Button>
                      )
                    ))}
                  </HorizontalGroup>
                </>
              )
            }

            {/* Nút chuyển sang danh sách quiz */}
            {(level && selectedPeriod && !isNext) && (
              <QuizStartButton onClick={handleNext}>
                Tiếp tục
              </QuizStartButton>
            )}

            {/* Nút bắt đầu làm quiz */}
            {(isNext) && (
              <>
                <QuizStartButton onClick={handleStart}>
                  Bắt đầu
                </QuizStartButton>
                <QuizStartButton onClick={() => setIsNext(false)}>
                  Quay lại
                </QuizStartButton>
              </>
            )}
          </ModalContentAnimated>

        </ModalOverlay>
      )}

      {showGuide && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setShowGuide(false)}>×</CloseButton>
            <ModalTitle>{t.guide[language]}</ModalTitle>
            <div style={{ fontSize: "16px", lineHeight: 1.7, color: "#333", textAlign: "left", whiteSpace: 'pre-line' }}>
              {t.guideText[language]}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {showHistory && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setShowHistory(false)}>×</CloseButton>
            <ModalTitle>{t.history[language]}</ModalTitle>
            {historyData.length === 0 ? (
              <NoData>{t.historyEmpty[language]}</NoData>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>Ngày & Giờ</Th>
                    <Th>Số câu</Th>
                    <Th>Đúng</Th>
                    <Th>Điểm</Th>
                    <Th>Xếp Hạng</Th>
                    <Th>Danh Hiệu</Th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item, index) => (
                    <tr key={index}>
                      <Td>{item.datetime}</Td>
                      <Td>{item.total}</Td>
                      <Td>{item.correct}</Td>
                      <Td>{item.score}</Td>
                      <Td>{item.rank}</Td>
                      <Td>{item.title}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

export default QuizHome;
