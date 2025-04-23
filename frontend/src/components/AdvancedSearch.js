import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Home/Header";
import Footer from "./Home/Footer";

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f9fafc;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  padding: 20px;
  padding-top: 100px;
  animation: ${fadeIn} 0.5s ease;
`;

const Sidebar = styled.div`
  width: 380px;
  padding-right: 20px;
  border-right: 1px solid #ccc;
`;

const Content = styled.div`
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease;

  input[type="number"] {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    margin-top: 6px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s;
  }

  input[type="number"]:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px 10px;
  margin-top: 8px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ArtifactGridCard = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s, box-shadow 0.25s;
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 400px;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 12px;
    border: 1px solid #eee;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }

  h4 {
    font-size: 1rem;
    margin: 0 0 6px;
    font-weight: 600;
    color: #333;
    line-height: 1.5;
  }

  p {
    font-size: 0.85rem;
    color: #555;
    margin: 0 0 8px;
    line-height: 1.5;
  }

  .museum-name {
    font-size: 0.8rem;
    color: #777;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 6px 12px;
    font-size: 0.85rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.25s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const PaginationWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  gap: 20px;

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 6px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.25s;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background: #ccc;
      cursor: default;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: #003366;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-left: 4px solid #007bff;
  padding-left: 10px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "🔍";
    font-size: 1.2rem;
    margin-right: 4px;
    animation: bounceIcon 1s ease infinite alternate;
  }

  @keyframes bounceIcon {
    0% { transform: translateY(0); }
    100% { transform: translateY(-2px); }
  }
`;

const KeywordInputWrapper = styled.div`
  margin-top: 8px;

  input {
    width: 100%;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
`;

const ResultCount = styled.p`
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 16px;
  color: #007bff;
  background: #e8f1ff;
  padding: 8px 12px;
  border-left: 4px solid #007bff;
  border-radius: 4px;
  font-weight: bold;
  position: relative;
  display: inline-block;

  &::before {
    content: "📦";
    margin-right: 8px;
    font-size: 1.1rem;
  }
`;
export default function AdvancedSearch() {
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [paginatedArtifacts, setPaginatedArtifacts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [museums, setMuseums] = useState([]);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    museum: "",
    category: "",
    condition: "",
    keyword: "",
    year: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get("http://localhost:5246/api/Museum").then((res) => setMuseums(res.data));
    axios.get("http://localhost:5246/api/CategoryArtifact").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (filters.museum) {
      axios.get(`http://localhost:5246/api/Museum/${filters.museum}`).then((res) => {
        setArtifacts(res.data.artifacts || []);
      });
    } else {
      axios.get("http://localhost:5246/api/Artifact").then((res) => setArtifacts(res.data));
    }
  }, [filters.museum]);

  useEffect(() => {
    const year = parseInt(filters.year);
    const filtered = artifacts.filter((item) => {
      const matchYear = !filters.year || (item.dateDiscovered && parseInt(item.dateDiscovered) === year);
      return (
        (!filters.category || item.categoryArtifactId === parseInt(filters.category)) &&
        (!filters.condition || item.condition === filters.condition) &&
        (!filters.keyword || item.artifactName.toLowerCase().includes(filters.keyword.toLowerCase())) &&
        matchYear
      );
    });
    setFilteredArtifacts(filtered);
    setCurrentPage(1);
  }, [filters.category, filters.condition, filters.keyword, filters.year, artifacts]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginatedArtifacts(filteredArtifacts.slice(start, end));
  }, [currentPage, filteredArtifacts]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const toggleRadioFilter = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  const getMuseumName = (museumId) => {
    const found = museums.find((m) => m.id === museumId);
    return found ? found.name : "Không rõ";
  };

  const totalPages = Math.max(1, Math.ceil(filteredArtifacts.length / itemsPerPage));

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <Sidebar>
          <SectionTitle>Tìm kiếm chi tiết</SectionTitle>

          <FilterSection>
            <label><strong>Bảo tàng</strong></label>
            <CheckboxGroup>
              {museums.map((museum) => (
                <label key={museum.id}>
                  <input
                    type="checkbox"
                    checked={filters.museum === museum.id.toString()}
                    onChange={() => handleFilterChange("museum", filters.museum === museum.id.toString() ? "" : museum.id.toString())}
                  />
                  {museum.name}
                </label>
              ))}
            </CheckboxGroup>
          </FilterSection>

          <FilterSection>
            <label><strong>Giai đoạn lịch sử</strong></label>
            <CheckboxGroup>
              {categories.map((cat) => (
                <label key={cat.id}>
                  <input
                    type="checkbox"
                    checked={filters.category === cat.id.toString()}
                    onChange={() => handleFilterChange("category", filters.category === cat.id.toString() ? "" : cat.id.toString())}
                  />
                  {cat.name}
                </label>
              ))}
            </CheckboxGroup>
            <div style={{ marginTop: "10px" }}>
              <label><strong>Nhập năm:</strong></label><br />
              <input
                type="number"
                placeholder="Ví dụ: 1670"
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
              />
            </div>
          </FilterSection>

          <FilterSection>
            <label><strong>Tình trạng</strong></label><br />
            <label>
              <input
                type="checkbox"
                checked={filters.condition === "Nguyên vẹn"}
                onChange={() => toggleRadioFilter("condition", "Nguyên vẹn")}
              />
              Nguyên vẹn
            </label><br />
            <label>
              <input
                type="checkbox"
                checked={filters.condition === "Hư hại một số bộ phận"}
                onChange={() => toggleRadioFilter("condition", "Hư hại một số bộ phận")}
              />
              Hư hại
            </label>
          </FilterSection>

          <FilterSection>
            <label><strong>Từ khóa</strong></label>
            <KeywordInputWrapper>
              <input
                type="text"
                placeholder="Nhập từ khóa..."
                onChange={(e) => handleFilterChange("keyword", e.target.value)}
              />
            </KeywordInputWrapper>
          </FilterSection>
        </Sidebar>

        <Content>
          <SectionTitle>Các hiện vật sau khi tìm kiếm</SectionTitle>
          <ResultCount>Tìm kiếm được {filteredArtifacts.length} hiện vật.</ResultCount>
          <GridWrapper>
            {paginatedArtifacts.length === 0 ? (
              <p>Không tìm thấy hiện vật phù hợp.</p>
            ) : (
              paginatedArtifacts.map((item) => (
                <ArtifactGridCard key={item.id}>
                  <img src={item.image} alt={item.artifactName} />
                  <h4>{item.artifactName}</h4>
                  <p>{item.description}</p>
                  <div className="museum-name">🏛 {getMuseumName(item.museumId)}</div>
                  <button onClick={() => navigate(`/artifact/${item.id}`)}>
                    Xem chi tiết
                  </button>
                </ArtifactGridCard>
              ))
            )}
          </GridWrapper>
        </Content>
      </MainContent>

      <PaginationWrapper>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          Trang trước
        </button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Trang sau
        </button>
      </PaginationWrapper>

      <Footer />
    </PageWrapper>
  );
}
