import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ArtifactMuseumInfo from "../Museum/ArtifactMuseumInfo";
import ArtifactDescription from "../Museum/ArtifactDescription";
import ArtifactsCarousel from "../Museum/ArtifactsCarousel";
import axios from "axios";
import "../../assets/css/ArtifactDetail.css";

const ArtifactDetail = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [qrUrl, setQrUrl] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [allArtifacts, setAllArtifacts] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    let foundArtifact = {
      name: "Xe tăng T-54",
      image: "/image/artifacts/tank.jpg",
      votes: 77,
      comments: [],
      description: "Xe tăng T-54 là một trong những biểu tượng lịch sử quan trọng gắn liền với những sự kiện hào hùng của dân tộc Việt Nam...",
      museumName: "Bảo tàng Quân khu 5",
      detailImages: [
        "/image/artifacts/tank1.jpg",
        "/image/artifacts/tank2.jpg",
        "/image/artifacts/tank3.jpg",
        "/image/artifacts/tank4.jpg",
        "/image/artifacts/tank5.jpg",
        "/image/artifacts/tank6.jpg",
        "/image/artifacts/tank7.jpg",
        "/image/artifacts/tank8.jpg",
      ],
      details: [
        { label: "Năm sản xuất", value: "1950" },
        { label: "Xuất xứ", value: "Liên Xô" },
        { label: "Loại xe", value: "Xe tăng chiến đấu" },
        { label: "Ngày nhập về bảo tàng", value: "16-03-2005" },
        { label: "Lần đầu tiên sử dụng", value: "1968" }
      ]
    };

    setArtifact(foundArtifact);
    setQrUrl(window.location.href);

    axios.get('https://localhost:7277/api/Artifact')
      .then(res => setAllArtifacts(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách hiện vật:', err));
  }, [id]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

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

  const totalImages = artifact.detailImages.length;
  const startIndex = currentImageIndex;
  const currentImages = [];

  for (let i = 0; i < itemsPerPage; i++) {
    currentImages.push(artifact.detailImages[(startIndex + i) % totalImages]);
  }

  return (
    <div className="artifact-detail">
      <Header />

      <div className="breadcrumb">
        <a href="/">Trang chủ</a> /
        <a href="/all-museums">Các bảo tàng</a> /
        <a href={`/museums/${artifact.museumName}`} className="museum-link">{artifact.museumName}</a> /
        <span className="current-artifact">{artifact.name}</span>
      </div>

      <div className="artifact-content">
        <div className="artifact-main">
          <div className="artifact-image">
            <img src={artifact.detailImages[currentImageIndex]} alt={artifact.name} />

            <div className="artifact-small-gallery">
              <button className="prev-set" onClick={handlePrevSet}>{"<"}</button>
              <div className="small-gallery">
                {currentImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Chi tiết ${startIndex + index + 1}`}
                    className="small-gallery-image"
                    onClick={() => handleThumbnailClick(startIndex + index)}
                  />
                ))}
              </div>
              <button className="next-set" onClick={handleNextSet}>{">"}</button>
            </div>
          </div>

          <div className="artifact-info">
            <h2>Hiện vật</h2>
            <div className="artifact-title">
              <span className="tag">🔥</span>
              <h1>{artifact.name}</h1>
            </div>

            <div className="artifact-rating">
              <span className="votes">{artifact.votes} ⭐⭐⭐⭐★</span>
              <span className="separator"> | </span>
              <span className="comments">{artifact.comments.length} Bình luận</span>
            </div>

            <div className="artifact-actions">
              <button className="qr-button" onClick={() => setIsQrModalOpen(true)}>Mã QR</button>
            </div>

            <table className="artifact-table">
              <tbody>
                {artifact.details.map((item, index) => (
                  <tr key={index}>
                    <td className="label">{item.label}</td>
                    <td className="value">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ArtifactMuseumInfo
          museumName={artifact.museumName}
          description={artifact.description}
        />
      </div>

      <div className="artifact-info-container">

        <ArtifactDescription
          description={artifact.description}
          details={artifact.details}
        />
      </div>

      <div style={{ marginTop: "40px" }}>
        <ArtifactsCarousel artifacts={allArtifacts} />
      </div>

      {isQrModalOpen && (
        <div className="qr-modal">
          <div className="qr-modal-content">
            <span className="close-modal" onClick={() => setIsQrModalOpen(false)}>×</span>
            <h3>Quét mã QR để xem thêm</h3>
            <QRCode value={qrUrl} size={200} />
          </div>
        </div>
      )}



      <Footer />
    </div>
  );
};

export default ArtifactDetail;
