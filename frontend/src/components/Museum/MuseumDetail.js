import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ArtifactsCarousel from "../Museum/ArtifactsCarousel";
import axios from "axios";
import toSlug from "../../utils/toSlug";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import FullPageLoading from '../common/FullPageLoading'

// Animations
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const fadeInUp = keyframes`from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); }`;
const fadeInDown = keyframes`from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); }`;

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

const MuseumTextWithMap = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const TextColumn = styled.div`
  flex: 1;
  min-width: 250px;
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

const MuseumDetail = () => {
  const { language } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true)
  const { slug } = useParams();
  const [museums, setMuseums] = useState([]);
  const [museum, setMuseum] = useState()
  const [translatedMuseum, setTranslatedMuseum] = useState(null);
  const [labels, setLabels] = useState({
    home: "Trang chủ",
    all: "Các bảo tàng",
    notFound: "Bảo tàng không tồn tại.",
    open: "Giờ mở cửa",
    closed: "Đóng cửa",
    address: "Địa chỉ",
    description: "Mô tả chi tiết",
  });

  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Museum`);
        setMuseums(response.data);
        setMuseum(response.data.find((m) => toSlug(m.name) === slug))
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
      finally {
        setLoading(false)
      }
    };

    fetchMuseums();
  }, [slug]);

  useEffect(() => {
    const translateMuseum = async () => {
      if (!museum || language === "vi") {
        setTranslatedMuseum(museum);
        return;
      }

      const translated = {
        ...museum,
        name: await translateText(museum.name, language),
        description: await translateText(museum.description, language),
        location: await translateText(museum.location, language),
        hours: await translateText(museum.hours, language),
        closed: await translateText(museum.closed, language),
      };

      setTranslatedMuseum(translated);
    };

    translateMuseum();
  }, [museum, language]);

  useEffect(() => {
    const translateLabels = async () => {
      if (language === "vi") {
        setLabels({
          home: "Trang chủ",
          all: "Các bảo tàng",
          notFound: "Bảo tàng không tồn tại.",
          open: "Giờ mở cửa",
          closed: "Đóng cửa",
          address: "Địa chỉ",
          description: "Mô tả chi tiết",
        });
      } else {
        setLabels({
          home: await translateText("Trang chủ", language),
          all: await translateText("Các bảo tàng", language),
          notFound: await translateText("Bảo tàng không tồn tại.", language),
          open: await translateText("Giờ mở cửa", language),
          closed: await translateText("Đóng cửa", language),
          address: await translateText("Địa chỉ", language),
          description: await translateText("Mô tả chi tiết", language),
        });
      }
    };

    translateLabels();
  }, [language]);

  if (!translatedMuseum || loading) return <FullPageLoading isLoading={true}/>
  else
  return (
    <MuseumDetailContainer>
      <Header />

      <MuseumContent>
        <Breadcrumb>
          <Link to="/">{labels.home}</Link> / <Link to="/all-museums">{labels.all}</Link> /{" "}
          <span>{translatedMuseum.name}</span>
        </Breadcrumb>

        <MuseumTitle>{translatedMuseum.name}</MuseumTitle>

        <MuseumInfo>
          <MuseumTextWithMap>
            <TextColumn>
              <SectionTitle>{labels.open}: 8h</SectionTitle>
              <SectionTitle>{labels.closed}: 17h</SectionTitle>
             

              <SectionTitle>{labels.address}</SectionTitle>
              <Text>{translatedMuseum.location}</Text>

              <SectionTitle>{labels.description}</SectionTitle>
              <Text>{translatedMuseum.description}</Text>
            </TextColumn>

            <MapBox>
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(translatedMuseum.location)}&output=embed`}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </MapBox>
          </MuseumTextWithMap>

          <MuseumImage>
            <img src={translatedMuseum.image} alt={translatedMuseum.name} />
          </MuseumImage>
        </MuseumInfo>

        <ArtifactsCarousel artifacts={translatedMuseum.artifacts} />
      </MuseumContent>

      <Footer />
    </MuseumDetailContainer>
  );
};

export default MuseumDetail;
