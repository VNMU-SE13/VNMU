import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ArtifactsCarousel from "../Museum/ArtifactsCarousel";
import axios from "axios";
import toSlug from "../../utils/toSlug";

// Keyframes Animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const MuseumDetailContainer = styled.div`
  margin-top: 80px;
  padding: 20px;
  background-color: #f8f8f8;
`;

const MuseumContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const MuseumTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  animation: ${fadeInDown} 1s ease-in-out;
`;

const MuseumInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const MuseumText = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 1.5s ease-in-out;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #c8102e;
  text-align: left;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const Text = styled.p`
  font-size: 16px;
  color: #444;
  margin-bottom: 15px;
  line-height: 1.8;
  text-align: justify;
  animation: ${fadeInUp} 1.5s ease-in-out;
`;

const MuseumImage = styled.div`
  flex: 1;
  max-width: 400px;
  display: flex;
  justify-content: center;
  animation: ${fadeInUp} 1.5s ease-in-out;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  color: #666;
  animation: ${fadeIn} 1s ease-in-out;

  a {
    color: #0073e6;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  span {
    color: #333;
    font-weight: bold;
  }
`;

const ArtifactsSection = styled.div`
  margin-top: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ArtifactsTitle = styled.h2`
  font-size: 24px;
  color: #c8102e;
  margin-bottom: 20px;
`;

const ArtifactsSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArtifactItem = styled.div`
  text-align: center;
  flex: 1;

  img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
    margin: 0 auto;
    display: block;
  }

  p {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #c8102e;
  transition: color 0.3s ease;

  &:hover {
    color: #a00c1d;
  }
`;


const MuseumTextWithMap = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MapBox = styled.div`
  width: 300px;
  height: 300px;
  flex-shrink: 0;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
  }
`;

const TextColumn = styled.div`
  flex: 1;
  min-width: 250px;
`;


const MuseumDetail = () => {

  const [museums, setMuseums] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Museum`)
        setMuseums(response.data)
      } catch (err) {
        console.error('Lỗi khi gọi API:', err)
      }
    }

    fetchData()
  }, [])

  const { slug } = useParams();
  const museum = museums.find((m) => toSlug(m.name) === slug);

  if (!museum) {
    return <p>Bảo tàng không tồn tại.</p>;
  }

  return (
    <MuseumDetailContainer>
      <Header />

      <MuseumContent>
        <Breadcrumb>
          <Link to="/">Trang chủ</Link> / <Link to="/all-museums">Các bảo tàng</Link> /{" "}
          <span>{museum.name}</span>
        </Breadcrumb>

        <MuseumTitle>{museum.name}</MuseumTitle>

        <MuseumInfo>
          <MuseumTextWithMap>
            <TextColumn>
              <SectionTitle>Giờ mở cửa</SectionTitle>
              <Text>{museum.hours}</Text>
              <Text>
                <strong>Đóng cửa:</strong> {museum.closed}
              </Text>

              <SectionTitle>Địa chỉ</SectionTitle>
              <Text>{museum.location}</Text>

              <SectionTitle>Mô tả chi tiết</SectionTitle>
              <Text>{museum.description}</Text>
            </TextColumn>

            <MapBox>
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(museum.location)}&output=embed`}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </MapBox>
          </MuseumTextWithMap>

          <MuseumImage>
            <img src={museum.image} alt={museum.name} />
          </MuseumImage>
        </MuseumInfo>

        {/* Sử dụng ArtifactsCarousel thay vì slider cũ */}

        <ArtifactsCarousel artifacts={museum.artifacts} />

      </MuseumContent>

      <Footer />
    </MuseumDetailContainer>
  );
};

export default MuseumDetail;