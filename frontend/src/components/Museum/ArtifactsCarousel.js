import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const MuseumArtifactsContainer = styled.div`
  margin-top: 40px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  font-size: 28px;
  color: #c8102e;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${(props) => (props.active ? "#c8102e" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#c8102e")};
  border: 2px solid #c8102e;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c8102e;
    color: #ffffff;
  }
`;

const PeriodFilterWrapper = styled.div`
  background-color: #fff6f7;
  border: 2px dashed #c8102e;
  border-radius: 20px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(200, 16, 46, 0.15);
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const ArtifactsSlider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ArrowButton = styled.button`
  background: #c8102e;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-50%) scale(1.1);
  }

  &.left {
    left: 0px;
  }

  &.right {
    right: 0px;
  }
`;

const ArtifactsList = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex: 1;
  overflow: hidden;
  scroll-behavior: smooth;
  width: 80%;
  margin: 0 auto;
`;

const ArtifactItem = styled(Link)`
  text-align: center;
  width: 180px;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  p {
    margin-top: 10px;
    font-size: 16px;
    color: #555;
    font-weight: 600;
    text-align: center;
  }
`;

const QuizSection = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px dashed #ddd;
`;

const QuizText = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

const QuizButton = styled.a`
  background-color: #c8102e;
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 30px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a00c1d;
  }
`;

const ArtifactsCarousel = ({ artifacts }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [activePeriod, setActivePeriod] = useState(0)
  const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);
  const [categories, setCategories] = useState([]);
  const itemsPerPage = 5;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % filteredArtifacts.length
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + filteredArtifacts.length) % filteredArtifacts.length
    );
  };

  const handleFilter = (categoryId) => {
    const isSame = activeFilter === categoryId;
    const newFilter = isSame ? null : categoryId;
    setActiveFilter(newFilter);
    setCurrentIndex(0); // reset về đầu
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryArtifact`);
        setCategories(response.data);
        const response2 = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryHistorical`);
        setPeriods(response2.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeFilter) {
      const filtered = artifacts.filter(a => a.categoryArtifactId === activeFilter);
      setFilteredArtifacts(filtered);
    } else {
      setFilteredArtifacts(artifacts);
    }
    setCurrentIndex(0); // reset khi lọc
  }, [activeFilter, artifacts]);

  const getVisibleArtifacts = () => {
    if (filteredArtifacts.length === 0) return [];

    const result = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % filteredArtifacts.length;
      result.push(filteredArtifacts[index]);
    }
    return result;
  };

  const currentArtifacts = getVisibleArtifacts();

  return (
    <MuseumArtifactsContainer>
      <Title>Các hiện vật của bảo tàng</Title>

      <PeriodFilterWrapper>
        {periods.length>0 && periods.map((period, index) => (
          <FilterButton
            key={index}
            onClick={() => setActivePeriod(period.id)}
            active={activePeriod === period.id}
          >
            {period.name}
          </FilterButton>
        ))}
      </PeriodFilterWrapper>

      <FilterButtons>
        {categories.length>0 && categories.map((category, index) => (
          <FilterButton
            key={index}
            onClick={() => handleFilter(category.id)}
            active={activeFilter === category.id}
          >
            {category.name}
          </FilterButton>
        ))}
      </FilterButtons>

      <ArtifactsSlider>
        <ArrowButton className="left" onClick={handlePrevious}>
          &lt;
        </ArrowButton>

        <ArtifactsList>
          {currentArtifacts.length > 0 ? (
            currentArtifacts.map((artifact, index) => (
              <ArtifactItem to={`/artifact/${artifact.id}`} key={index}>
                <img src={artifact.image} alt={artifact.artifactName} />
                <p>{artifact.artifactName}</p>
              </ArtifactItem>
            ))
          ) : (
            <p>Không có hiện vật nào.</p>
          )}
        </ArtifactsList>

        <ArrowButton className="right" onClick={handleNext}>
          &gt;
        </ArrowButton>
      </ArtifactsSlider>

      <QuizSection>
        <QuizText>Bạn đã tự tin với kiến thức của mình chưa?</QuizText>
        <QuizButton href="http://localhost:3000/quiz">Thử tài ngay</QuizButton>
      </QuizSection>
    </MuseumArtifactsContainer>
  );
};

export default ArtifactsCarousel;
