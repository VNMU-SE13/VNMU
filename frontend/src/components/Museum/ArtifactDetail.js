import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ArtifactMuseumInfo from "../Museum/ArtifactMuseumInfo";  // Import ArtifactMuseumInfo
import ArtifactDescription from "../Museum/ArtifactDescription";  // Import ArtifactDescription
import CommentSection from "../Museum/CommentSection";  // Import CommentSection
import "../../assets/css/ArtifactDetail.css";

const ArtifactDetail = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [qrUrl, setQrUrl] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const itemsPerPage = 4; // Hiển thị tối đa 4 ảnh nhỏ trên một dòng

  useEffect(() => {
    let foundArtifact = {
      name: "Xe tăng T-54",
      image: "/image/artifacts/tank.jpg", // Ảnh hiện vật lớn
      votes: 77,
      comments: [], // Dữ liệu bình luận sẽ được thêm vào đây
      description: "Chưa có mô tả.",
      museumName: "Bảo tàng Quân khu 5",
      detailImages: [
        "/image/artifacts/tank1.jpg",
        "/image/artifacts/tank2.jpg",
        "/image/artifacts/tank3.jpg",
        "/image/artifacts/tank4.jpg",
        "/image/artifacts/tank5.jpg",
        "/image/artifacts/tank6.jpg", // Thêm 1 ảnh nữa
        "/image/artifacts/tank7.jpg", // Thêm 1 ảnh nữa
        "/image/artifacts/tank8.jpg", // Thêm 1 ảnh nữa
      ],
    };

    setArtifact(foundArtifact);
    setQrUrl(window.location.href);
  }, [id]);

  // Hàm thay đổi ảnh lớn khi nhấn vào ảnh nhỏ
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Hàm chuyển ảnh theo vòng lặp vô hạn
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + artifact.detailImages.length) % artifact.detailImages.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % artifact.detailImages.length
    );
  };

  // Hàm thay đổi nhóm ảnh nhỏ khi nhấn vào < hoặc >
  const handlePrevSet = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - itemsPerPage + artifact.detailImages.length) % artifact.detailImages.length
    );
  };

  const handleNextSet = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + itemsPerPage) % artifact.detailImages.length
    );
  };

  if (!artifact) {
    return <p>Hiện vật không tồn tại.</p>;
  }

  // Lấy ra nhóm 4 ảnh nhỏ
  const totalImages = artifact.detailImages.length;
  const startIndex = currentImageIndex; // Xác định ảnh bắt đầu
  const currentImages = [];

  for (let i = 0; i < itemsPerPage; i++) {
    currentImages.push(artifact.detailImages[(startIndex + i) % totalImages]);
  }

  return (
    <div className="artifact-detail">
      <Header />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Trang chủ</a> / 
        <a href="/all-museums">Các bảo tàng</a> / 
        <a href={`/museums/${artifact.museumName}`} className="museum-link">{artifact.museumName}</a> / 
        <span className="current-artifact">{artifact.name}</span>
      </div>

      <div className="artifact-content">
        <div className="artifact-main">
          {/* Ảnh hiện vật lớn và danh sách ảnh nhỏ */}
          <div className="artifact-image">
            <img src={artifact.detailImages[currentImageIndex]} alt={artifact.name} />

            {/* Danh sách ảnh nhỏ nằm dưới ảnh lớn trong cùng div */}
            <div className="artifact-small-gallery">
              <button className="prev-set" onClick={handlePrevSet}>{"<"}</button>
              <div className="small-gallery">
                {currentImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Chi tiết ${startIndex + index + 1}`}
                    className="small-gallery-image"
                    onClick={() => handleThumbnailClick(startIndex + index)} // Sự kiện khi nhấn vào ảnh nhỏ
                  />
                ))}
              </div>
              <button className="next-set" onClick={handleNextSet}>{">"}</button>
            </div>
          </div>

          {/* Thông tin hiện vật */}
          <div className="artifact-info">
            <h2>Hiện vật</h2>
            <div className="artifact-title">
              <span className="tag">🔥</span>
              <h1>{artifact.name}</h1>
            </div>

            <div className="artifact-rating">
              <span className="votes">{artifact.votes || 77} ⭐⭐⭐⭐★</span>
              <span className="separator"> | </span>
              <span className="comments">{artifact.comments.length} Bình luận</span>
            </div>

            {/* QR Code */}
            <div className="artifact-qr">
              <h3>Quét mã QR để xem thêm</h3>
              <QRCode value={qrUrl} size={150} />
            </div>
          </div>
        </div>

        {/* Thay thế div artifact-museum-info bằng ArtifactMuseumInfo */}
        <ArtifactMuseumInfo
          museumName={artifact.museumName}
          description={artifact.description}
        />
        
        {/* ArtifactDescription Component */}
        <ArtifactDescription 
          description={artifact.description}
          details={artifact.details} 
        />

        {/* Comment Section */}
        <CommentSection artifactId={id} /> {/* Thêm CommentSection vào đây */}

      </div>
      <Footer />
    </div>
  );
};

export default ArtifactDetail;
