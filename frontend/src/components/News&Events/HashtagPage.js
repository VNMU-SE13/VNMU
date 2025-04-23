import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Sidebar from "./Sidebar";
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

// Hàm tạo slug từ tiêu đề
function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Dữ liệu bài viết (sau này nên import từ file JSON hoặc API)
const allArticles = [
  {
    id: 1,
    title: "Khám phá bảo tàng lịch sử",
    description: "Một hành trình hấp dẫn về quá khứ với những hiện vật độc đáo.",
    image: "/image/News&Events/new1.jpg",
    museum: "Bảo tàng Đà Nẵng",
    museumId: 3,
    date: "2025-03-06",
    tags: ["LịchSửViệtNam", "BảoTàngLịchSử", "TriểnLãm2025"]
  },
  {
    id: 2,
    title: "Công nghệ thực tế ảo trong bảo tàng",
    description: "Trải nghiệm tương tác số hóa mới trong triển lãm.",
    image: "/image/News&Events/new2.jpg",
    museum: "Bảo tàng Đà Nẵng",
    museumId: 3,
    date: "2025-03-05",
    tags: ["LịchSửViệtNam", "TrẻEmHọcLịchSử", "GiáoDụcVănHóa"]
  }
];

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const SearchBox = styled.div`
  background: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  font-weight: bold;
`;

const ArticleCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const ArticleTitle = styled(Link)`
  display: block;
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
  color: #000;
  text-decoration: none;
  &:hover {
    color: #007bff;
  }
`;

const ArticleDescription = styled.p`
  margin: 4px 0 0;
  color: #555;
  font-size: 0.95rem;
`;

const ArticleInfo = styled.p`
  margin-top: 6px;
  font-size: 0.85rem;
  color: #888;
`;

const MuseumLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin: 10px 0;
`;

export default function HashtagPage() {
  const { tagName } = useParams();
  const [selectedMenu, setSelectedMenu] = useState("Tin tức mới nhất");
  const [translatedArticles, setTranslatedArticles] = useState([]);
  const { language } = useContext(LanguageContext);

  const filteredArticles = allArticles.filter(article =>
    article.tags.includes(tagName)
  );

  useEffect(() => {
    const translateArticles = async () => {
      const results = await Promise.all(
        filteredArticles.map(async (article) => {
          const [title, desc, museum] = await Promise.all([
            translateText(article.title, language),
            translateText(article.description, language),
            translateText(article.museum, language),
          ]);
          return { ...article, title, description: desc, museum };
        })
      );
      setTranslatedArticles(results);
    };

    if (language === "vi") {
      setTranslatedArticles(filteredArticles);
    } else {
      translateArticles();
    }
  }, [language, tagName]);

  return (
    <PageContainer>
      <Header />
      <MainWrapper>
        <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        <Content>
          <SearchBox>
            Kết quả tìm kiếm cho hashtag: <span style={{ color: "#007bff" }}>#{tagName}</span>
          </SearchBox>

          {translatedArticles.length > 0 ? (
            translatedArticles.map(article => (
              <ArticleCard key={article.id}>
                <ArticleTitle to={`/news/${generateSlug(article.title)}`}>
                  {article.title}
                </ArticleTitle>
                <ArticleInfo>
                  <MuseumLink to={`/museums/${article.museumId}`}>
                    {article.museum}
                  </MuseumLink> - {article.date}
                </ArticleInfo>
                <ArticleImage src={article.image} alt={article.title} />
                <ArticleDescription>{article.description}</ArticleDescription>
              </ArticleCard>
            ))
          ) : (
            <p>Không có bài viết nào với hashtag này.</p>
          )}
        </Content>
      </MainWrapper>
      <Footer />
    </PageContainer>
  );
}
