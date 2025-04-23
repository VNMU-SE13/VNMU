import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

// Styled Components
const Container = styled.div`
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

const SliderWrapper = styled.div`
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
    left: 0;
  }

  &.right {
    right: 0;
  }
`;

const ArtifactList = styled.div`
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
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;
  min-height: 300px; /* Giữ tất cả ArtifactCard cao đều */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 16px;
    color: #c8102e;
    margin-bottom: 5px;
    min-height: 42px; /* Tên bảo tàng luôn chiếm đều 2 dòng */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
    min-height: 20px;
  }

  span {
    font-size: 12px;
    color: #999;
  }

  .view-more {
    color: #c8102e;
    font-weight: bold;
    margin-top: 10px;
    font-size: 14px;
  }
`;


const QuizSection = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px dashed #ddd;
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

const AllArtifact = () => {
  const { language } = useContext(LanguageContext);
  const [artifacts, setArtifacts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Artifact`);
        const resCategories = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryArtifact`);

        if (language === "vi") {
          setArtifacts(res.data);
          setCategories(resCategories.data);
        } else {
          const translatedArtifacts = await Promise.all(
            res.data.map(async (item) => ({
              ...item,
              artifactName: await translateText(item.artifactName, language),
            }))
          );
          const translatedCategories = await Promise.all(
            resCategories.data.map(async (cat) => ({
              ...cat,
              name: await translateText(cat.name, language),
            }))
          );
          setArtifacts(translatedArtifacts);
          setCategories(translatedCategories);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API Artifact:", error);
      }
    };

    fetchArtifacts();
  }, [language]);

  useEffect(() => {
    if (activeFilter) {
      setFilteredArtifacts(artifacts.filter(a => a.categoryArtifactId === activeFilter));
    } else {
      setFilteredArtifacts(artifacts);
    }
    setCurrentIndex(0);
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

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % filteredArtifacts.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + filteredArtifacts.length) % filteredArtifacts.length);

  const visibleArtifacts = getVisibleArtifacts();

  return (
    <Container>
      <Title>Các hiện vật nổi bật</Title>

      <PeriodFilterWrapper>
        {categories.map((cat) => (
          <FilterButton
            key={cat.id}
            active={activeFilter === cat.id}
            onClick={() => setActiveFilter(activeFilter === cat.id ? null : cat.id)}
          >
            {cat.name}
          </FilterButton>
        ))}
      </PeriodFilterWrapper>

      <SliderWrapper>
        <ArrowButton className="left" onClick={handlePrev}>&lt;</ArrowButton>
        <ArtifactList>
          {visibleArtifacts.length > 0 ? (
            visibleArtifacts.map((artifact) => (
              <ArtifactItem to={`/artifact/${artifact.id}`} key={artifact.id}>
                <img src={artifact.image} alt={artifact.artifactName} />
                <h3>{artifact.artifactName}</h3>
                <p>{artifact.museum?.name}</p>
                <span>{artifact.dateDiscovered ? new Date(artifact.dateDiscovered).toLocaleDateString() : ""}</span>
                <span style={{ color: '#c8102e', fontWeight: 'bold', marginTop: '5px' }}>Xem chi tiết</span>
              </ArtifactItem>
            ))
          ) : (
            <p>Không có hiện vật nào.</p>
          )}
        </ArtifactList>
        <ArrowButton className="right" onClick={handleNext}>&gt;</ArrowButton>
      </SliderWrapper>

      <QuizSection>
        <QuizButton href="/quiz">Thử tài ngay</QuizButton>
      </QuizSection>
    </Container>
  );
};

export default AllArtifact;
