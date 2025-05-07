import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ArtifactMuseumInfo from "../Museum/ArtifactMuseumInfo";
import ArtifactDescription from "../Museum/ArtifactDescription";
import ArtifactsCarousel from "../Museum/ArtifactsCarousel";
import axios from "axios";
import "../../assets/css/ArtifactDetail.css";
import toSlug from "../../utils/toSlug";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import GLBViewer from "../GLBViewer";
import data3D from "../data3d";
import FullPageLoading from '../common/FullPageLoading'

const ArtifactDetail = () => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);

  const [artifact, setArtifact] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [allArtifacts, setAllArtifacts] = useState([]);
  const [artifactImages, setArtifactImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [museum, setMuseum] = useState(null);
  const [glbUrl, setGlbUrl] = useState(null);
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
    qrBtn: "Mô Hình 3D",
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

      // Tìm file glb tương ứng từ data3D
      const matchedModel = data3D.find(item => item.id === response.data.id);
      if (matchedModel) {
        setGlbUrl("/" + matchedModel.path);
      }

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
          qrBtn: "Mô Hình 3D",
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

  if (loading || !artifact || !museum) return <FullPageLoading isLoading={true}/>;

  return (
    <div className="artifact-detail">
      <Header />

      <div className="breadcrumb">
        <Link to="/">{translatedLabels.home}</Link> /{" "}
        <Link to="/all-museums">{translatedLabels.allMuseums}</Link> /{" "}
        <Link to={`/museums/${toSlug(museum.name)}`} className="museum-link">
          {museum.name}
        </Link>{" "}
        / <span className="current-artifact">{artifact.artifactName}</span>
      </div>

      <div className="artifact-content">
        <div className="artifact-main">
          <div className="artifact-image">
            <img src={artifactImages[currentImageIndex].imageUrl} alt={artifact.name} />

            <div className="artifact-small-gallery">
              <button className="prev-set" onClick={handlePrevSet}>
                {"<"}
              </button>
              <div className="small-gallery">
                {artifactImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.imageUrl}
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
        <ArtifactDescription artifact={artifact} />
      </div>

      <div style={{ marginTop: "40px" }}>
        <ArtifactsCarousel artifacts={allArtifacts} />
      </div>

      {isQrModalOpen && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  }}>
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      position: "relative",
      width: "600px",
      height: "500px",
      boxShadow: "0 0 20px rgba(0,0,0,0.2)"
    }}>
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          fontSize: "24px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
        onClick={() => setIsQrModalOpen(false)}
      >
        ×
      </span>
      <GLBViewer url={glbUrl} />
    </div>
  </div>
)}

      <Footer />
    </div>
  );
};

export default ArtifactDetail;
