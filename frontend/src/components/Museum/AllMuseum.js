import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Home/Header"; 
import Footer from "../Home/Footer"; 
import axios from "axios";
import toSlug from "../../utils/toSlug";

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
  const [museums, setMuseums] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7277/api/Museum')
        setMuseums(response.data)
      } catch (err) {
        console.error('Lỗi khi gọi API:', err)
      }
    }

    fetchData()
  }, [])

  const handleNavigateToDetail = (slug) => {
    navigate(`/museums/${slug}`);
  };

  return (
    <AllMuseumContainer>
      {/* Header */}
      <Header />

      {/* Title */}
      <PageTitle>
        <h1>Các bảo tàng ở Đà Nẵng</h1>
      </PageTitle>

      {/* Main Content */}
      <MuseumsGrid>
        {museums.map((museum) => (
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

      {/* Footer */}
      <Footer />
    </AllMuseumContainer>
  );
};

export default AllMuseum;
