import React, { useState } from "react";
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

const ArtifactsCarousel = ({ artifacts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);
  const itemsPerPage = 5;

  // Danh mục lọc
  const categories = ["KC chống Pháp", "KC chống Mỹ", "KC chống Nhật", "CT biên giới"];

  // 🔹 **Sửa bộ lọc: Check nếu category tồn tại trong danh sách của artifact**
  const filteredArtifacts = activeFilter
    ? artifacts.filter((artifact) => artifact.category.includes(activeFilter))
    : artifacts;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredArtifacts.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + filteredArtifacts.length) % filteredArtifacts.length
    );
  };

  const handleFilter = (category) => {
    setActiveFilter(category === activeFilter ? null : category);
    setCurrentIndex(0); // Reset index khi lọc
  };

  // Lấy danh sách hiện vật hiển thị
  const currentArtifacts = [];
  for (let i = 0; i < itemsPerPage; i++) {
    if (filteredArtifacts.length > 0) {
      currentArtifacts.push(filteredArtifacts[(currentIndex + i) % filteredArtifacts.length]);
    }
  }

  return (
    <MuseumArtifactsContainer>
      <Title>Các hiện vật của bảo tàng</Title>

      {/* Thêm Filter Buttons */}
      <FilterButtons>
        {categories.map((category) => (
          <FilterButton
            key={category}
            onClick={() => handleFilter(category)}
            active={activeFilter === category}
          >
            {category}
          </FilterButton>
        ))}
      </FilterButtons>

      <ArtifactsSlider>
        <ArrowButton className="left" onClick={handlePrevious}>
          &lt;
        </ArrowButton>
        <ArtifactsList>
          {currentArtifacts.length > 0 ? (
            currentArtifacts.map((artifact) => (
              <ArtifactItem to={`/artifact/${artifact.id}`} key={artifact.id}>
                <img src={artifact.image} alt={artifact.name} />
                <p>{artifact.name}</p>
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
    </MuseumArtifactsContainer>
  );
};

export default ArtifactsCarousel;
