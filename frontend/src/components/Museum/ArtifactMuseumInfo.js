import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import { useNavigate } from "react-router-dom";
import toSlug from "../../utils/toSlug";

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
  flex: 1;
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

const ArtifactMuseumInfo = ({ museum }) => {
  const navigate = useNavigate()
  const { language } = useContext(LanguageContext);
  const [labels, setLabels] = useState({
    viewMuseum: "Xem Bảo tàng",
    founded: "Năm thành lập",
    artifacts: "Hiện vật",
    contact: "Liên hệ",
  });

  useEffect(() => {
    const translateLabels = async () => {
      if (language === "vi") {
        setLabels({
          viewMuseum: "Xem Bảo tàng",
          founded: "Năm thành lập",
          artifacts: "Hiện vật",
          contact: "Liên hệ",
        });
      } else {
        const entries = Object.entries(labels);
        const translated = {};
        for (const [key, value] of entries) {
          translated[key] = await translateText(value, language);
        }
        setLabels(translated);
      }
    };

    translateLabels();
  }, [language]);

  return (
    <MuseumContainer>
      <MuseumInfo>
        <MuseumAvatar src={museum.image} alt={museum.name} />
        <MuseumDetails>
          <MuseumName>{museum.name}</MuseumName>
          <MuseumStatus>{museum.location}</MuseumStatus>
        </MuseumDetails>
      </MuseumInfo>

      <MuseumActions>
        <Button onClick={() => navigate(`/museums/${toSlug(museum.name)}`)}>{labels.viewMuseum}</Button>
      </MuseumActions>

      <MuseumStats>
        <StatItem>
          {labels.founded}: <strong>{museum.establishYear}</strong>
        </StatItem>
        <StatItem>
          {labels.artifacts}: <strong>{museum.artifacts.length}</strong>
        </StatItem>
        <StatItem>
          {labels.contact}: <strong>{museum.contact}</strong>
        </StatItem>
      </MuseumStats>
    </MuseumContainer>
  );
};

export default ArtifactMuseumInfo;
