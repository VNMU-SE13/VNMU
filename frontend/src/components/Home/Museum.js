import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const MuseumContainer = styled.div`
  padding: 40px;
  background-color: #f8f8f8;
`;

const MuseumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 32px; /* Tăng kích thước chữ */
  font-weight: bold; /* Làm đậm */
  text-align: center; /* Căn giữa */
  position: relative;
  display: inline-block;
  padding-bottom: 5px; /* Khoảng cách giữa chữ và gạch chân */

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%; /* Chỉ kéo dài một phần, không cả dòng */
    width: 80%; /* Độ dài gạch chân chỉ nằm trong chữ */
    height: 4px;
    border-radius: 2px;
  }
`;

const SeeAllButton = styled.button`
  background-color: #c8102e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #a00d22;
  }
`;

const MuseumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Hiển thị 3 cột khi đủ rộng */
  gap: 20px;
  justify-content: center;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 cột trên tablet */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr); /* 1 cột trên mobile */
  }
`;

const MuseumItem = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const MuseumImage = styled.img`
  width: 100%;
  height: 250px; /* Giảm chiều cao để ảnh nhỏ lại */
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const MuseumInfo = styled.div`
  padding: 15px;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const MuseumTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 18px;
  color: #c8102e;
  position: relative;
  cursor: pointer;
  display: inline; /* Để tránh phần khoảng trắng kéo dài */
  text-decoration: none; /* Không có gạch chân mặc định */
  
  &:hover {
    text-decoration: underline; /* Chỉ hiển thị gạch chân khi hover */
    text-decoration-color: #c8102e; /* Màu đỏ */
    text-decoration-thickness: 2px; /* Độ dày của gạch chân */
    text-underline-offset: 3px; /* Khoảng cách giữa chữ và gạch chân */
  }
`;


const MuseumText = styled.p`
  margin-bottom: 6px;
  font-size: 12px;
  color: #555;
`;

export default function Museum() {
  const navigate = useNavigate(); 

  const museums = [
    {
      id: 1,
      slug: "bao-tang-quan-khu-5",
      image: "/image/BT-QK5.jpg",
      title: "Bảo tàng Quân khu 5",
      description: "Khám phá lịch sử quân sự khu vực miền Trung Việt Nam.",
      hours: "Giờ mở cửa: 8:00 sáng - 5:00 chiều",
      closed: "Đóng cửa: Chủ Nhật",
    },
    {
      id: 2,
      slug: "bao-tang-dieu-khac-cham",
      image: "/image/BT-Cham.jpg",
      title: "Bảo tàng Điêu khắc Chăm",
      description: "Nơi lưu giữ tinh hoa văn hóa Chăm Pa cổ đại.",
      hours: "Giờ mở cửa: 8:00 sáng - 5:00 chiều",
      closed: "Đóng cửa: Lễ Tết hằng năm",
    },
    {
      id: 3,
      slug: "bao-tang-da-nang",
      image: "/image/BaoTangDaNang.jpg",
      title: "Bảo tàng Đà Nẵng",
      description: "Tìm hiểu về lịch sử, văn hóa và sự phát triển của thành phố Đà Nẵng.",
      hours: "Giờ mở cửa: 8:00 sáng - 5:00 chiều",
      closed: "Đóng cửa: Thứ Hai",
    },
  ];
 
  const handleTitleClick = (slug) => {
    navigate(`/museums/${slug}`);
  };

  const handleSeeAll = () => {
    navigate("/all-museums");
  };

  return (
    <MuseumContainer>
      <MuseumHeader>
        <Title>Các Bảo tàng ở Đà Nẵng</Title>
        <SeeAllButton onClick={handleSeeAll}>See All</SeeAllButton>
      </MuseumHeader>
      <MuseumGrid>
        {museums.map((museum) => (
          <MuseumItem key={museum.slug}>
            <MuseumImage src={museum.image} alt={museum.title} />
            <MuseumInfo>
              <MuseumTitle onClick={() => handleTitleClick(museum.slug)}>
                {museum.title}
              </MuseumTitle>
              <MuseumText>{museum.description}</MuseumText>
              <MuseumText>{museum.hours}</MuseumText>
              <MuseumText>{museum.closed}</MuseumText>
            </MuseumInfo>
          </MuseumItem>
        ))}
      </MuseumGrid>
    </MuseumContainer>
  );
}
