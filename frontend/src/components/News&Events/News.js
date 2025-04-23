import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toSlug from "../../utils/toSlug";
import { LanguageContext } from "../../context/LanguageContext";
import  translateText  from "../../utils/translate";

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
  padding: 20px;
  background: white;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const NewsCard = styled.div`
  display: flex;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  min-height: 140px; /* thêm chiều cao tối thiểu cho đều */
  align-items: flex-start;
  gap: 16px;
`;

const NewsImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
`;

const NewsContent = styled.div`
  flex: 1;
`;

const NewsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
`;

const NewsDescription = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* chỉ 2 dòng */
  -webkit-box-orient: vertical;
  min-height: 40px; /* giữ chiều cao cho đều */
  line-height: 1.4;
`;

const NewsMeta = styled.p`
  font-size: 0.8rem;
  color: #adb5bd;
`;

const ViewMore = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  margin-top: 10px;
  display: inline-block;

  &:hover {
    text-decoration: underline;
    color: #dc3545;
  }
`;

export default function News() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Tin tức mới nhất");
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resNew = await axios.get(`${process.env.REACT_APP_API_URL}/Event`);
        const translatedNews = await Promise.all(
          resNew.data.map(async (item) => {
            const [translatedName, translatedDesc, translatedMuseum] = await Promise.all([
              translateText(item.name, language),
              translateText(item.description, language),
              translateText(item.museum.name, language)
            ]);
            return {
              ...item,
              name: translatedName,
              description: translatedDesc,
              museum: { ...item.museum, name: translatedMuseum }
            };
          })
        );
        setNews(translatedNews);
      } catch (err) {
        console.error("Lỗi khi gọi API tin tức:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [language]);

  if (loading) return <p>Loading...</p>;
  return (
    <PageContainer>
      <Header />
      <MainWrapper>
        <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        <Content>
          <Title>{selectedMenu}</Title>
          {news.map((article) => (
            <NewsCard key={article.id}>
              <NewsImage src={article.image} alt={article.name} />
              <NewsContent>
                <NewsTitle>{article.name}</NewsTitle>
                <NewsDescription>{article.description}</NewsDescription>
                <Link to={`/museums/${toSlug(article.museum.name)}`}>{article.museum.name}</Link>
                <NewsMeta>{article.startDate}</NewsMeta>
                <ViewMore to={`/news/${article.id}`}>Xem Thêm</ViewMore>
              </NewsContent>
            </NewsCard>
          ))}
        </Content>
      </MainWrapper>
      <Footer />
    </PageContainer>
  );
}
