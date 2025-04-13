import React, { use, useEffect, useState } from "react";
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

const ArtifactDetail = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [qrUrl, setQrUrl] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [allArtifacts, setAllArtifacts] = useState([]);
  const [artifactImages, setArtifactImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [museum, setMuseum] = useState()
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/Artifact/${id}`)
      setArtifact(response.data)
      setArtifactImages(response.data.images)
      const resMuseums = await axios.get(`${process.env.REACT_APP_API_URL}/Museum/${response.data.museumId}`)
      setMuseum(resMuseums.data)
      setLoading(false)
    }

    setQrUrl(`${window.location.origin}/image/Tank_Platoon_0411141224_texture.glb`);

    fetchData()

    // axios.get(`${process.env.REACT_APP_API_URL}/Artifact`)
    //   .then(res => setAllArtifacts(res.data))
    //   .catch(err => console.error('Lỗi khi lấy danh sách hiện vật:', err));
  }, []);

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

  const startIndex = currentImageIndex;

  if(loading) return <p>Loading...</p>
  else
  return (
    <div className="artifact-detail">
      <Header />

      <div className="breadcrumb">
        <a href="/">Trang chủ</a> /
        <a href="/all-museums">Các bảo tàng</a>/
        <a href={`/museums/${toSlug(museum.name)}`} className="museum-link">{museum.name}</a> /
        <span className="current-artifact">{artifact.artifactName}</span>
      </div>

      <div className="artifact-content">
        <div className="artifact-main">
          <div className="artifact-image">
            <img src={artifact.image} alt={artifact.name} />

            <div className="artifact-small-gallery">
              <button className="prev-set" onClick={handlePrevSet}>{"<"}</button>
              <div className="small-gallery">
                {artifactImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Chi tiết ${index + 1}`}
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

            </div>

            <div className="artifact-actions">
              <button className="qr-button" onClick={() => setIsQrModalOpen(true)}>Mã QR</button>
            </div>

            <table className="artifact-table">
              <tbody>
                <tr>
                  <td>Ngày phát hiện</td>
                  <td>{artifact.dateDiscovered}</td>
                </tr>
                <tr>
                  <td>Kích thước</td>
                  <td>{artifact.dimenson}</td>
                </tr>
                <tr>
                  <td>Trọng lượng</td>
                  <td>{artifact.weight}</td>
                </tr>
                <tr>
                  <td>Chất liệu</td>
                  <td>{artifact.material}</td>
                </tr>
                <tr>
                  <td>Chức năng</td>
                  <td>{artifact.function}</td>
                </tr>
                <tr>
                  <td>Tình trạng</td>
                  <td>{artifact.condition}</td>
                </tr><tr>
                  <td>Nguồn gốc</td>
                  <td>{artifact.origin}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <ArtifactMuseumInfo
          museum={museum}
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
    <div className="qr-modal-content" style={{ padding: "20px" }}>
      <span className="close-modal" onClick={() => setIsQrModalOpen(false)}>×</span>
      <h3>Quét mã QR để mở mô hình 3D</h3>
      <QRCode value={qrUrl} size={240} />
    </div>
  </div>
)}



      <Footer />
    </div>
  );
};

export default ArtifactDetail;
