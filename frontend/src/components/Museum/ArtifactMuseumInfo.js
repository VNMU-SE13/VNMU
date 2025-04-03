import React from "react";
import styled from "styled-components";

const MuseumContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const MuseumInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1; /* Chiếm phần lớn diện tích để tránh khoảng trống */
`;

const MuseumAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
`;

const MuseumDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const MuseumName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #d32f2f;
  margin: 0;
`;

const MuseumStatus = styled.p`
  color: #777;
  font-size: 14px;
  margin: 5px 0 0;
`;

const MuseumStats = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 2;
  font-size: 14px;
  color: #444;
  padding-left: 20px;
  gap: 20px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
  text-align: center;

  strong {
    color: #ff5722;
    font-weight: bold;
    margin-top: 4px;
  }
`;

const MuseumActions = styled.div`
flex: 1;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 8px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #4caf50;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;

const ArtifactMuseumInfo = () => {
  const museumInfo = {
    avatar: "/image/BT-QK5.jpg",
    name: "Bảo tàng Quân khu 5",
    status: "Số 3 đường Duy Tân, phường Hòa Thuận Đông, quận Hải Châu, thành phố Đà Nẵng",
    shopButtonText: "Xem Bảo tàng",
    rating: "Chiến tranh & Quân đội",
    productCount: 534,
    joinTime: "47 năm",
    followerCount: "120k/năm",
  };

  return (
    <MuseumContainer>
      <MuseumInfo>
        <MuseumAvatar src={museumInfo.avatar} alt={museumInfo.name} />
        <MuseumDetails>
          <MuseumName>{museumInfo.name}</MuseumName>
          <MuseumStatus>{museumInfo.status}</MuseumStatus>
        </MuseumDetails>
      </MuseumInfo>
      <MuseumActions>
        <Button>{museumInfo.shopButtonText}</Button>
      </MuseumActions>
      <MuseumStats>
        <StatItem>Chủ đề: <strong>{museumInfo.rating}</strong></StatItem>
        <StatItem>Hiện vật: <strong>{museumInfo.productCount}</strong></StatItem>
        <StatItem>Hoạt Động: <strong>{museumInfo.joinTime}</strong></StatItem>
        <StatItem>Khách Tham Quan: <strong>{museumInfo.followerCount}</strong></StatItem>
      </MuseumStats>


    </MuseumContainer>
  );
};

export default ArtifactMuseumInfo;
