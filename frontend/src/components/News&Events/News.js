import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toSlug from "../../utils/toSlug";

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

// Dữ liệu mẫu
const newsArticles = {
  "Tin tức mới nhất": [
    {
      id: 1,
      title: "Khám phá bảo tàng lịch sử",
      description: "Một hành trình hấp dẫn về quá khứ với những hiện vật độc đáo.",
      image: "/image/News&Events/new1.jpg",
      museum: "Bảo tàng Lịch Sử",
      date: "2025-03-06",
    },
    {
      id: 2,
      title: "Công nghệ thực tế ảo trong bảo tàng",
      description: "Trải nghiệm tương tác số hóa mới trong triển lãm.",
      image: "/image/News&Events/new2.jpg",
      museum: "Bảo tàng Công Nghệ",
      date: "2025-03-05",
    },
    {
      id: 3,
      title: "Triển lãm tranh nghệ thuật cổ điển",
      description: "Một không gian nghệ thuật độc đáo với các tác phẩm đỉnh cao.",
      image: "/image/News&Events/new3.jpg",
      museum: "Bảo tàng Mỹ Thuật",
      date: "2025-03-04",
    },
    {
      id: 4,
      title: "Những phát hiện khảo cổ học mới",
      description: "Bước đột phá trong nghiên cứu lịch sử với các hiện vật mới.",
      image: "/image/News&Events/new4.jpg",
      museum: "Bảo tàng Khảo Cổ",
      date: "2025-03-03",
    },
    {
      id: 5,
      title: "Ứng dụng AI trong bảo tồn hiện vật",
      description: "Công nghệ AI giúp bảo tồn hiện vật cổ với độ chính xác cao.",
      image: "/image/News&Events/new5.jpg",
      museum: "Bảo tàng Khoa Học",
      date: "2025-03-02",
    },
    {
      id: 6,
      title: "Hành trình xuyên không gian và thời gian",
      description: "Một chuyến du hành độc đáo khám phá lịch sử loài người.",
      image: "/image/News&Events/new6.jpg",
      museum: "Bảo tàng Vũ Trụ",
      date: "2025-03-01",
    }
  ],
};

export default function News() {
  const navigate = useNavigate()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMenu, setSelectedMenu] = useState("Tin tức mới nhất");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const resNew = await axios.get(`${process.env.REACT_APP_API_URL}/Event`)
      setNews(resNew.data)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) <p>Loading.....</p>
  else
  return (
    <PageContainer>
      <Header />
      <MainWrapper>
        <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        <Content>
          <Title>{selectedMenu}</Title>
          {news.map((article) => (
            <NewsCard key={article.id}>
              <NewsImage src={article.image} alt={article.title} />
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
