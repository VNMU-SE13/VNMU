import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

  &.kid-top-left {
    top: 140px;
    left: 350px;
    width: 220px;
  }
  &.lantern-top-left {
    top: 10px;
    left: 30px;
    width: 120px;
  }
  &.kid-top-right {
    top: 140px;
    right: 350px;
    width: 220px;
  }
  &.lantern-top-right {
    top: 10px;
    right: 20px;
    width: 200px;
  }
  &.kid-bottom-left {
    bottom: -10px;
    left: 30px;
    width: 500px;
  }
  &.kid-bottom-right {
    bottom: 40px;
    right: 30px;
    width: 360px;
  }
  &.cloud-left {
    bottom: -30px;
    left: 10px;
    width: 180px;
  }
  &.cloud-right {
    bottom: -20px;
    right: -10px;
    width: 200px;
  }
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
  background-image: url('/image/bg-seal.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
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

const GuideText = styled.div`
  font-size: 16px;
  line-height: 1.6;

  ul {
    margin-left: 20px;
    padding-left: 10px;
    list-style: disc;
  }
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

const QuizHome = () => {
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (showHistory) {
      const stored = localStorage.getItem("quizHistory");
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistoryData(parsed.reverse());
      } else {
        setHistoryData([]);
      }
    }
  }, [showHistory]);

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

      <Title>Trạng nguyên lịch sử Việt</Title>

      <ImageContainer>
        <img src="/image/quizz-main.jpg" alt="Quiz" />
      </ImageContainer>

      <ButtonGroup>
        <Button onClick={() => navigate("/quiz/start")}>Bắt đầu</Button>
        <Button onClick={() => setShowGuide(true)}>Hướng dẫn</Button>
        <Button onClick={() => setShowHistory(true)}>Lịch sử câu đố</Button>
      </ButtonGroup>

      {showGuide && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setShowGuide(false)}>×</CloseButton>
            <ModalTitle>Hướng dẫn</ModalTitle>
            <GuideText>
              <p><strong>Bắt đầu trò chơi:</strong></p>
              <ul>
                <li>Nhấn vào nút "Bắt đầu" để bắt đầu trả lời câu hỏi.</li>
                <li>Mỗi lượt chơi gồm một số câu hỏi ngẫu nhiên về lịch sử Việt Nam.</li>
              </ul>
              <p><strong>Chọn đáp án:</strong></p>
              <ul>
                <li>Đọc câu hỏi và chọn một đáp án (A, B, C hoặc D).</li>
                <li>Nhấn vào đáp án để xác nhận.</li>
              </ul>
              <p><strong>Kết quả:</strong></p>
              <ul>
                <li>Sau mỗi câu, hệ thống sẽ hiển thị đúng/sai và giải thích ngắn gọn.</li>
                <li>Câu tiếp theo sẽ tự động hiện sau vài giây.</li>
              </ul>
              <p><strong>Hoàn thành lượt chơi:</strong></p>
              <ul>
                <li>Khi trả lời xong tất cả, bạn sẽ nhận được điểm số và bảng xếp hạng (nếu có).</li>
                <li>Nhấn “Chơi lại” để bắt đầu lượt mới.</li>
              </ul>
            </GuideText>
          </ModalContent>
        </ModalOverlay>
      )}

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
