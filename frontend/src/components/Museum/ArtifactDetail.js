import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ArtifactMuseumInfo from "../Museum/ArtifactMuseumInfo";
import ArtifactDescription from "../Museum/ArtifactDescription";
import ArtifactsCarousel from "../Museum/ArtifactsCarousel";
import axios from "axios";
import "../../assets/css/ArtifactDetail.css";
import toSlug from "../../utils/toSlug";
import GLBViewer from "../GLBViewer";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

const ArtifactDetail = () => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);

  const [artifact, setArtifact] = useState(null);
  const [qrUrl, setQrUrl] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [allArtifacts, setAllArtifacts] = useState([]);
  const [artifactImages, setArtifactImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [museum, setMuseum] = useState(null);
  const itemsPerPage = 4;

  const [translatedLabels, setTranslatedLabels] = useState({
    home: "Trang chủ",
    allMuseums: "Các bảo tàng",
    artifact: "Hiện vật",
    discovered: "Ngày phát hiện",
    size: "Kích thước",
    weight: "Trọng lượng",
    material: "Chất liệu",
    function: "Chức năng",
    condition: "Tình trạng",
    origin: "Nguồn gốc",
    scanQR: "Quét mã QR để mở mô hình 3D",
    qrBtn: "Mã QR",
    rating: "đánh giá",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/Artifact/${id}`);
      setArtifact(response.data);
      setArtifactImages(response.data.images);

      const resMuseums = await axios.get(`${process.env.REACT_APP_API_URL}/Museum/${response.data.museumId}`);
      setMuseum(resMuseums.data);

      const artifactsRes = await axios.get(`${process.env.REACT_APP_API_URL}/Artifact`);
      setAllArtifacts(artifactsRes.data);

      setQrUrl(`${window.location.origin}/image/Tuong_0417115605_texture.glb`);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const translateLabels = async () => {
      if (language === "vi") {
        setTranslatedLabels({
          home: "Trang chủ",
          allMuseums: "Các bảo tàng",
          artifact: "Hiện vật",
          discovered: "Ngày phát hiện",
          size: "Kích thước",
          weight: "Trọng lượng",
          material: "Chất liệu",
          function: "Chức năng",
          condition: "Tình trạng",
          origin: "Nguồn gốc",
          scanQR: "Quét mã QR để mở mô hình 3D",
          qrBtn: "Mã QR",
          rating: "đánh giá",
        });
      } else {
        const entries = Object.entries(translatedLabels);
        const result = {};
        for (const [key, value] of entries) {
          result[key] = await translateText(value, language);
        }
        setTranslatedLabels(result);
      }
    };

    translateLabels();
  }, [language]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevSet = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - itemsPerPage + artifact.images.length) % artifact.images.length
    );
  };

  const handleNextSet = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + itemsPerPage) % artifact.images.length
    );
  };

  if (loading || !artifact || !museum) return <p>Loading...</p>;

  return (
    <div className="artifact-detail">
      <Header />

      <div className="breadcrumb">
        <a href="/">{translatedLabels.home}</a> /
        <a href="/all-museums">{translatedLabels.allMuseums}</a> /
        <a href={`/museums/${toSlug(museum.name)}`} className="museum-link">
          {museum.name}
        </a>{" "}
        / <span className="current-artifact">{artifact.artifactName}</span>
      </div>

      <div className="artifact-content">
        <div className="artifact-main">
          <div className="artifact-image">
            <img src={artifact.podcast} alt={artifact.name} />

            <div className="artifact-small-gallery">
              <button className="prev-set" onClick={handlePrevSet}>
                {"<"}
              </button>
              <div className="small-gallery">
                {artifactImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Chi tiết ${index + 1}`}
                    className="small-gallery-image"
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
              <button className="next-set" onClick={handleNextSet}>
                {">"}
              </button>
            </div>
          </div>

          <div className="artifact-info">
            <h2>{translatedLabels.artifact}</h2>
            <div className="artifact-title">
              <span className="tag">🔥</span>
              <h1>{artifact.name}</h1>
            </div>

            <div className="artifact-rating">
              <span className="votes">
                {artifact.votes} ⭐⭐⭐⭐★ {translatedLabels.rating}
              </span>
            </div>

            <div className="artifact-actions">
              <button className="qr-button" onClick={() => setIsQrModalOpen(true)}>
                {translatedLabels.qrBtn}
              </button>
            </div>

            <table className="artifact-table">
              <tbody>
                <tr>
                  <td>{translatedLabels.discovered}</td>
                  <td>{artifact.dateDiscovered}</td>
                </tr>
                <tr>
                  <td>{translatedLabels.size}</td>
                  <td>{artifact.dimenson}</td>
                </tr>
                <tr>
                  <td>{translatedLabels.weight}</td>
                  <td>{artifact.weight}</td>
                </tr>
                <tr>
                  <td>{translatedLabels.material}</td>
                  <td>{artifact.material}</td>
                </tr>
                <tr>
                  <td>{translatedLabels.function}</td>
                  <td>{artifact.function}</td>
                </tr>
                <tr>
                  <td>{translatedLabels.condition}</td>
                  <td>{artifact.condition}</td>
                </tr>
                <tr>
                  <td>{translatedLabels.origin}</td>
                  <td>{artifact.origin}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <ArtifactMuseumInfo museum={museum} />
      </div>

      <div className="artifact-info-container">
        <ArtifactDescription
          artifact={artifact}
        />
      </div>

      <div style={{ marginTop: "40px" }}>
        <ArtifactsCarousel artifacts={allArtifacts} />
      </div>

      {isQrModalOpen && (
  <div className="qr-modal">
    <div className="qr-modal-content" style={{ padding: "20px", display: "flex", flexDirection: "row", gap: "20px", alignItems: "center", justifyContent: "center" }}>
      <span className="close-modal" onClick={() => setIsQrModalOpen(false)}>
        ×
      </span>
      
      {/* Bên trái: QRCode */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{ marginBottom: "10px" }}>{translatedLabels.scanQR}</h3>
        <QRCode value={qrUrl} size={180} />
      </div>

      {/* Bên phải: GLBViewer */}
      <div style={{ width: "300px", height: "300px", background: "#f8f8f8", borderRadius: "8px", overflow: "hidden" }}>
        <GLBViewer url={qrUrl} />
      </div>
    </div>
  </div>
)}

      <Footer />
    </div>
  );
};

export default ArtifactDetail;
