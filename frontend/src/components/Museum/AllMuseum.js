import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import axios from "axios";
import toSlug from "../../utils/toSlug";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

// Styled Components
const AllMuseumContainer = styled.div`
  padding: 40px;
  background-color: #f8f8f8;
`;

const PageTitle = styled.div`
  margin-top: 80px;
  padding: 10px 20px;
  background-color: #f8f8f8;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: bold;
    color: #c8102e;
  }
`;

const MuseumsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const MuseumItem = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const MuseumImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MuseumInfo = styled.div`
  padding: 15px;
  text-align: left;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #c8102e;
    cursor: pointer;
  }

  p {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
    line-height: 1.5;
  }

  strong {
    color: #333;
  }
`;

const AllMuseum = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const [museums, setMuseums] = useState([]);
  const [translatedMuseums, setTranslatedMuseums] = useState([]);
  const [pageTitle, setPageTitle] = useState("Các bảo tàng ở Đà Nẵng");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Museum`);
        setMuseums(response.data);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const translateMuseums = async () => {
      if (language === "vi") {
        setTranslatedMuseums(museums);
        setPageTitle("Các bảo tàng ở Đà Nẵng");
      } else {
        const tTitle = await translateText("Các bảo tàng ở Đà Nẵng", language);
        setPageTitle(tTitle);

        const translated = await Promise.all(
          museums.map(async (museum) => {
            const name = await translateText(museum.name, language);
            const desc = await translateText(museum.description, language);
            return { ...museum, name, description: desc };
          })
        );

        setTranslatedMuseums(translated);
      }
    };

    translateMuseums();
  }, [language, museums]);

  const handleNavigateToDetail = (slug) => {
    navigate(`/museums/${slug}`);
  };

  return (
    <AllMuseumContainer>
      <Header />
      <PageTitle>
        <h1>{pageTitle}</h1>
      </PageTitle>

      <MuseumsGrid>
        {translatedMuseums.map((museum) => (
          <MuseumItem key={museum.id}>
            <MuseumImage src={museum.image} alt={museum.name} />
            <MuseumInfo>
              <h3 onClick={() => handleNavigateToDetail(toSlug(museum.name))}>
                {museum.name}
              </h3>
              <p>{museum.description}</p>
            </MuseumInfo>
          </MuseumItem>
        ))}
      </MuseumsGrid>

      <Footer />
    </AllMuseumContainer>
  );
};

export default AllMuseum;
