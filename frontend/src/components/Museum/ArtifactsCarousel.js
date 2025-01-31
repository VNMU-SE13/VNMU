import React, { useState } from "react";
import "../../assets/css/ArtifactsCarousel.css";

const ArtifactsCarousel = ({ artifacts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5; // Số lượng hiện vật hiển thị trên một hàng

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % artifacts.length
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + artifacts.length) % artifacts.length
    );
  };

  // Lấy danh sách hiện vật hiển thị
  const currentArtifacts = [];
  for (let i = 0; i < itemsPerPage; i++) {
    currentArtifacts.push(artifacts[(currentIndex + i) % artifacts.length]);
  }

  return (
    <div className="museum-artifacts">
      <h2>Các hiện vật của bảo tàng</h2>
      <div className="artifacts-slider">
        <button className="arrow left-arrow" onClick={handlePrevious}>
          &lt;
        </button>
        <div className="artifacts-list">
          {currentArtifacts.map((artifact) => (
            <div className="artifact-item" key={artifact.id}>
              <img src={artifact.image} alt={artifact.name} />
              <p>{artifact.name}</p>
            </div>
          ))}
        </div>
        <button className="arrow right-arrow" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ArtifactsCarousel;
