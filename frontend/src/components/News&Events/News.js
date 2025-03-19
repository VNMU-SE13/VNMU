import { useState } from "react";
import styled from "styled-components";
import { FaNewspaper, FaCalendarAlt } from "react-icons/fa";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px; /* Tạo khoảng trống dưới header */
`;


const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 20px;
  gap: 20px; /* Tạo khoảng cách giữa sidebar và nội dung */
`;

const FooterWrapper = styled.div`
 margin-top: auto;
  width: 100%;
  position: relative;
  bottom: 0;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #343a40;
  color: white;
  padding: 20px;
  border-radius: 8px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  height: fit-content;
  margin-left: -200px; /* Thêm khoảng cách với lề trái */
`;


const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  background: ${({ active }) => (active ? "#dc3545" : "transparent")};
  &:hover {
    background: #dc3545;
  }
`;

const SubMenu = styled.div`
  margin-left: 20px;
  display: ${({ open }) => (open ? "block" : "none")};
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

const ViewMore = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 0;
`;

const menuItems = {
  "Tin Tức": ["Tin tức mới nhất", "Tin tức đặc sắc", "Công nghệ", "Bảo tồn"],
  "Sự Kiện": ["Sự kiện sắp diễn ra", "Sự kiện nổi bật"],
};

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
  const [openMenu, setOpenMenu] = useState("Tin Tức");
  const [selectedMenu, setSelectedMenu] = useState("Tin tức mới nhất");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <PageContainer>
      <Header />
      <MainWrapper>
        <Sidebar>
          <SidebarItem active={openMenu === "Tin Tức"} onClick={() => toggleMenu("Tin Tức")}> 
            <FaNewspaper style={{ marginRight: 10 }} /> Tin Tức
          </SidebarItem>
          <SubMenu open={openMenu === "Tin Tức"}>
            {menuItems["Tin Tức"].map((subMenu) => (
              <SidebarItem
                key={subMenu}
                onClick={() => setSelectedMenu(subMenu)}
                style={{ paddingLeft: 30, background: selectedMenu === subMenu ? "#495057" : "transparent" }}
              >
                {subMenu}
              </SidebarItem>
            ))}
          </SubMenu>
          <SidebarItem active={openMenu === "Sự Kiện"} onClick={() => toggleMenu("Sự Kiện")}> 
            <FaCalendarAlt style={{ marginRight: 10 }} /> Sự Kiện
          </SidebarItem>
          <SubMenu open={openMenu === "Sự Kiện"}>
            {menuItems["Sự Kiện"].map((subMenu) => (
              <SidebarItem
                key={subMenu}
                onClick={() => setSelectedMenu(subMenu)}
                style={{ paddingLeft: 30, background: selectedMenu === subMenu ? "#495057" : "transparent" }}
              >
                {subMenu}
              </SidebarItem>
            ))}
          </SubMenu>
        </Sidebar>
        <Content>
          <Title>{selectedMenu}</Title>
          {(newsArticles[selectedMenu] || []).map((article) => (
            <NewsCard key={article.id}>
              <NewsImage src={article.image} alt={article.title} />
              <NewsContent>
                <NewsTitle>{article.title}</NewsTitle>
                <NewsDescription>{article.description}</NewsDescription>
                <NewsMeta>{article.museum} - {article.date}</NewsMeta>
                <ViewMore>Xem Thêm</ViewMore>
              </NewsContent>
            </NewsCard>
          ))}
        </Content>
      </MainWrapper>
      <Footer />
    </PageContainer>
  );
}
