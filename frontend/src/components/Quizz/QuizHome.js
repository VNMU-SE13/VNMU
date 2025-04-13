import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
}
`;

const PageWrapper = styled.div`
  background-image: url('/image/bg-paper.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 40px 20px;
  position: relative;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-family: 'SVN-Voga', serif;
  color: #4b2e2e;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  margin: 0 auto 40px auto;
  width: 480px;
  max-width: 90%;
  border: 6px solid #d6c29a;
  border-radius: 15px;
  background-color: #fdf5e6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    border-radius: 10px;
    display: block;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const Button = styled.button`
  background-color: #a40000;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 24px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a0000;
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
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px 40px;
  border-radius: 20px;
  max-width: 650px;
  width: 95%;
  position: relative;
  font-family: 'Times New Roman', serif;
`;

const ModalContentAnimated = styled(ModalContent)`
  animation: fadeScale 0.4s ease-in-out;
  background-image: url('/image/background.jpg');
  background-size: cover;
  background-position: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ff4444;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-size: 30px;
  font-family: 'SVN-Voga', serif;
  text-align: center;
  margin-bottom: 16px;
  color: #4b2e2e;
`;

const HorizontalGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
`;

const QuizStartButton = styled(Button)`
  margin-top: 20px;
  background-color: #0f6900;

  &:hover {
    background-color: #0a4e00;
  }
`;

const SelectedButton = styled(Button)`
  background-color: #7a0000 !important;
  border: 2px solid #4b0000;
`;

const TopicButton = styled(Button)`
  background-color: #e2a000;
  color: white;

  &:hover {
    background-color: #c68400;
  }
`;

const StartTitle = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  font-weight: bold;
  color: #4b2e2e;
`;

const SelectedInfo = styled.p`
  margin-top: 10px;
  font-style: italic;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  background: white;
`;

const Th = styled.th`
  text-align: center;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const Td = styled.td`
  text-align: center;
  padding: 6px;
`;

const NoData = styled.p`
  font-style: italic;
  text-align: center;
  color: #555;
`;

// === Main Component ===
const QuizHome = () => {
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [showStartModal, setShowStartModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

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
    if (!selectedPeriod) return;

    const periodParam = encodeURIComponent(selectedPeriod);
    const topicParam = selectedTopic ? `&topic=${encodeURIComponent(selectedTopic)}` : '';
    navigate(`/quiz/start?period=${periodParam}${topicParam}`);
  };

  return (
    <PageWrapper>
      {/* Decorations */}
      <Decoration src="/image/kid1.png" alt="kid1" className="kid-top-left" />
      <Decoration src="/image/lantern1.png" alt="lantern1" className="lantern-top-left" />
      <Decoration src="/image/kid2.png" alt="kid2" className="kid-top-right" />
      <Decoration src="/image/lantern2.png" alt="lantern2" className="lantern-top-right" />
      <Decoration src="/image/kid3.png" alt="kid3" className="kid-bottom-left" />
      <Decoration src="/image/kid4.png" alt="kid4" className="kid-bottom-right" />
      <Decoration src="/image/cloud-left.png" alt="cloud-left" className="cloud-left" />
      <Decoration src="/image/cloud-right.png" alt="cloud-right" className="cloud-right" />

      <Title>Trạng nguyên lịch sử Việt</Title>

      <ImageContainer>
        <img src="/image/quizz-main.jpg" alt="Quiz" />
      </ImageContainer>

      <ButtonGroup>
        <Button onClick={() => setShowStartModal(true)}>Bắt đầu</Button>
        <Button onClick={() => setShowGuide(true)}>Hướng dẫn</Button>
        <Button onClick={() => setShowHistory(true)}>Lịch sử câu đố</Button>
      </ButtonGroup>

      {/* === Modal Chọn Giai Đoạn & Chủ Đề === */}
      {showStartModal && (
        <ModalOverlay>
          <ModalContentAnimated>
            <CloseButton onClick={() => {
              setShowStartModal(false);
              setSelectedPeriod(null);
              setSelectedTopic(null);
            }}>×</CloseButton>

            <ModalTitle>Chọn giai đoạn & chủ đề</ModalTitle>

            <HorizontalGroup>
              {["GĐ Phong Kiến", "GĐ Cận Hiện Đại", "GĐ Hiện Đại"].map(period => (
                selectedPeriod === period ? (
                  <SelectedButton key={period} onClick={() => {
                    setSelectedPeriod(period);
                    setSelectedTopic(null);
                  }}>
                    {period}
                  </SelectedButton>
                ) : (
                  <Button key={period} onClick={() => {
                    setSelectedPeriod(period);
                    setSelectedTopic(null);
                  }}>
                    {period}
                  </Button>
                )
              ))}
            </HorizontalGroup>

            {selectedPeriod && (
              <>
                <StartTitle>Chủ đề của {selectedPeriod}</StartTitle>
                <HorizontalGroup>
                  {(selectedPeriod === "GĐ Phong Kiến"
                    ? ["Triều Đinh", "Triều Lý", "Triều Trần", "Triều Lê", "Triều Nguyễn"]
                    : selectedPeriod === "GĐ Cận Hiện Đại"
                      ? ["KC Chống Mỹ", "KC Chống Pháp", "KC Chống Nhật", "KC Biên Giới"]
                      : ["Chính Trị", "Văn Hóa Truyền Thống", "Văn Hóa Giải Trí"]
                  ).map(topic => (
                    <TopicButton
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                    >
                      {topic}
                    </TopicButton>
                  ))}
                </HorizontalGroup>

                <SelectedInfo>
                  {selectedTopic
                    ? `Đã chọn chủ đề: ${selectedTopic}`
                    : `Chưa chọn chủ đề. Bạn có thể thi toàn bộ giai đoạn.`}
                </SelectedInfo>

                <QuizStartButton onClick={handleStart}>Bắt đầu</QuizStartButton>
              </>
            )}
          </ModalContentAnimated>
        </ModalOverlay>
      )}

      {/* === Hướng dẫn === */}
      {showGuide && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setShowGuide(false)}>×</CloseButton>
            <ModalTitle>Hướng dẫn tham gia trò chơi</ModalTitle>
            <div style={{ fontSize: "16px", lineHeight: 1.7, color: "#333", textAlign: "left" }}>
              <p><strong>🎯 Mục tiêu:</strong> Trở thành Trạng Nguyên lịch sử Việt bằng cách trả lời đúng nhiều câu hỏi nhất.</p>

              <p><strong>📌 Cách chơi:</strong></p>
              <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
                <li>Nhấn vào <strong>"Bắt đầu"</strong> để chọn <em>giai đoạn lịch sử</em> và <em>chủ đề câu hỏi</em>.</li>
                <li>Sau khi chọn, bạn sẽ được chuyển sang giao diện câu hỏi.</li>
                <li>Mỗi câu hỏi sẽ có 4 đáp án A, B, C, D — chọn một đáp án bạn cho là đúng.</li>
              </ul>

              <p><strong>⏱ Tự động chuyển câu:</strong> Sau khi chọn đáp án, hệ thống sẽ thông báo đúng/sai và tự chuyển sang câu tiếp theo.</p>

              <p><strong>📊 Kết thúc lượt chơi:</strong></p>
              <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
                <li>Khi hoàn thành hết câu hỏi, bạn sẽ nhận được <strong>điểm số</strong>, <strong>xếp hạng</strong> và <strong>danh hiệu</strong>.</li>
                <li>Kết quả của bạn sẽ được lưu lại trong phần <strong>"Lịch sử câu đố"</strong>.</li>
              </ul>

              <p><strong>🔁 Có thể chơi lại bao nhiêu lần tùy thích!</strong></p>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* === Lịch sử === */}
      {showHistory && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setShowHistory(false)}>×</CloseButton>
            <ModalTitle>Lịch sử tham gia</ModalTitle>
            {historyData.length === 0 ? (
              <NoData>Chưa có dữ liệu</NoData>
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
