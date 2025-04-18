import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import toSlug from "../../utils/toSlug";

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
 
  const [museums, setMuseums] = useState([])
 
  const handleTitleClick = (slug) => {
    navigate(`/museums/${slug}`);
  };

  const handleSeeAll = () => {
    navigate("/all-museums");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Museum`)
        setMuseums(response.data)
      } catch (err) {
        console.error('Lỗi khi gọi API:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <MuseumContainer>
      <MuseumHeader>
        <Title>Các Bảo tàng ở Đà Nẵng</Title>
        <SeeAllButton onClick={handleSeeAll}>See All</SeeAllButton>
      </MuseumHeader>
      <MuseumGrid>
        {museums.map((museum, index) => {
          if (index < 3)
          return (
          <MuseumItem key={museum.id}>
            <MuseumImage src={museum.image} alt={museum.name} />
            <MuseumInfo>
              <MuseumTitle onClick={() => handleTitleClick(toSlug(museum.name))}>
                {museum.name}
              </MuseumTitle>
              <MuseumText>{museum.description}</MuseumText>
              <MuseumText>{museum.location}</MuseumText>
              <MuseumText>{museum.contact}</MuseumText>
            </MuseumInfo>
          </MuseumItem>
        )})}
      </MuseumGrid>
    </MuseumContainer>
  );
}
