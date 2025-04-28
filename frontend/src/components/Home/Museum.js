import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import { motion } from "framer-motion";
import toSlug from "../../utils/toSlug";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

// Styled Components
const MuseumContainer = styled.div`
  padding: 40px;
  background-color: #fffaf0;
`;

const MuseumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 32px;
  font-weight: bold;
  position: relative;
  padding-bottom: 5px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 4px;
    background-color: #c8102e;
    border-radius: 2px;
  }
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 6px;
  font-style: italic;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
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

const NearbyButton = styled(SeeAllButton)`
  background-color: #facc15; /* Màu vàng nhẹ kiểu cổ */
  color: #000; /* Cho màu chữ dễ đọc trên nền vàng */
  
  &:hover {
    background-color: #eab308; /* Màu vàng đậm hơn khi hover */
  }
`;

const MuseumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MuseumItem = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 450px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px) scale(1.02);
  }
`;

const MuseumImage = styled.img`
  width: 100%;
  height:300px;
  object-fit: cover;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    border: 2px solid #fff;
    cursor: pointer;
  }
`;

const MuseumInfo = styled.div`
  padding: 15px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const MuseumTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 18px;
  color: #c8102e;
  position: relative;
  cursor: pointer;
  display: inline;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-decoration-color: #c8102e;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }
`;

const MuseumText = styled.p`
  margin-bottom: 6px;
  font-size: 12px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 50px;
`;

export default function Museum() {
  const navigate = useNavigate();
  const [museums, setMuseums] = useState([]);
  const [translatedTitle, setTranslatedTitle] = useState("Các Bảo tàng ở Đà Nẵng");
  const [translatedButton, setTranslatedButton] = useState("Xem tất cả");
  const [translatedNearby, setTranslatedNearby] = useState("Bảo tàng gần bạn nhất");
  const [translatedMuseums, setTranslatedMuseums] = useState([]);
  const { language } = useContext(LanguageContext);

  const handleTitleClick = (slug) => {
    navigate(`/museums/${slug}`);
  };

  const handleSeeAll = () => {
    navigate("/all-museums");
  };

  const handleNearbyClick = () => {
    navigate("/nearest-museum");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Museum`);
        setMuseums(response.data);
      } catch (err) {
        console.error('Lỗi khi gọi API:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const translateStatic = async () => {
      if (language === "vi") {
        setTranslatedTitle("Các Bảo tàng ở Đà Nẵng");
        setTranslatedButton("Xem tất cả");
        setTranslatedNearby("Bảo tàng gần bạn nhất");
        setTranslatedMuseums(museums);
      } else {
        const title = await translateText("Các Bảo tàng ở Đà Nẵng", language);
        const button = await translateText("Xem tất cả", language);
        const nearby = await translateText("Bảo tàng gần bạn nhất", language);
        setTranslatedTitle(title);
        setTranslatedButton(button);
        setTranslatedNearby(nearby);

        const translated = await Promise.all(museums.map(async (museum) => {
          const desc = await translateText(museum.description, language);
          const location = await translateText(museum.location, language);
          const contact = await translateText(museum.contact, language);
          return { ...museum, description: desc, location, contact };
        }));
        setTranslatedMuseums(translated);
      }
    };

    translateStatic();
  }, [language, museums]);

  return (
    <MuseumContainer>
      <MuseumHeader>
        <TitleWrapper>
          <Title>{translatedTitle}</Title>
          <SubTitle>Khám phá vẻ đẹp lịch sử giữa lòng Đà Nẵng!</SubTitle>
        </TitleWrapper>
        <ButtonGroup>
          <NearbyButton onClick={handleNearbyClick}>{translatedNearby}</NearbyButton>
          <SeeAllButton onClick={handleSeeAll}>{translatedButton}</SeeAllButton>
        </ButtonGroup>
      </MuseumHeader>
      <MuseumGrid>
  {translatedMuseums.map((museum, index) => {
    if (index < 4)
      return (
        <MuseumItem
          key={museum.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <MuseumImage src={museum.image} alt={museum.name} onClick={() => handleTitleClick(toSlug(museum.name))} />
          <MuseumInfo>
            <MuseumTitle onClick={() => handleTitleClick(toSlug(museum.name))}>
              🏛️ {museum.name}
            </MuseumTitle>

            {/* Mô tả */}
            <MuseumText>{museum.description}</MuseumText>

          </MuseumInfo>
        </MuseumItem>
      );
  })}
</MuseumGrid>
    </MuseumContainer>
  );
}
