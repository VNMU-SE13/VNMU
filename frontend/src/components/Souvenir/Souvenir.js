import React from "react";
import styled from "styled-components";
import { FaLandmark } from "react-icons/fa";

const souvenirs = [
  {
    id: 1,
    title: "Tượng Bác Hồ và Các Chiến Sĩ Miền Nam",
    description:
      "Tượng Bác Hồ và Các Chiến Sĩ Miền Nam là một tác phẩm điêu khắc có ý nghĩa sâu sắc...",
    image: "/image/souvenir1.jpg",
    museum: "Bảo Tàng Quân Khu 5",
  },
  {
    id: 2,
    title: "Khuyên tai hình hai đầu thú Văn hóa Sa Huỳnh",
    description:
      "Khuyên tai hình hai đầu thú là một trong những hiện vật tiêu biểu của nền văn hóa Sa Huỳnh...",
    image: "/image/souvenir2.jpg",
    museum: "Bảo tàng Điêu khắc Chăm",
  },
  {
    id: 3,
    title: "Súng trường M1 Carbine thời kỳ Kháng chiến chống Mỹ",
    description:
      "Súng trường M1 Carbine là một trong những vũ khí quan trọng và phổ biến trong thời kỳ...",
    image: "/image/souvenir3.jpg",
    museum: "Bảo tàng Đà Nẵng",
  },
  {
    id: 4,
    title: "Công cụ làm bánh tráng Túy Loan",
    description:
      "Nghề làm bánh tráng Túy Loan nổi bật với kỹ thuật chế biến tinh tế và công cụ đặc trưng...",
    image: "/image/souvenir4.jpg",
    museum: "Bảo tàng Đà Nẵng",
  },
];

const Souvenir = () => {
  return (
    <Container>
      {souvenirs.map((item) => (
        <Card key={item.id}>
          <Image src={item.image} alt={item.title} />
          <Content>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
            <Museum>
              <FaLandmark style={{ marginRight: 6 }} />
              {item.museum}
            </Museum>
            <Button>Xem chi tiết</Button>
          </Content>
        </Card>
      ))}
    </Container>
  );
};

export default Souvenir;

// ---------------- STYLED COMPONENTS ---------------- //

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 30px;
`;

const Card = styled.div`
  width: 280px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 10px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 12px;
`;

const Museum = styled.div`
  font-size: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Button = styled.button`
  align-self: flex-start;
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #1e40af;
  }
`;
