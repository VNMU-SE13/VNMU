import React, { useState } from "react";
import {
  Users,
  Package,
  ClipboardList,
  FileText,
  HelpCircle,
  Calendar,
  Newspaper,
  User,
  MessageSquare,
  LogOut,
} from "lucide-react";
import styled from "styled-components";
import UserManager from "./UserManager";
import ArtifactManager from "./Artifact/ArtifactManager";

import BlogManager from "./Blog/BlogManager";
import EventManager from "./Event/EventManager";

import HistoricalManager from "./Historical/HistoricalManager";
import FigureManager from "./Figure/FigureManager";
import MuseumManager from "./Museum/MuseumManager";
import AppliManager from "./AppliManager";
import ReportManager from "./ReportManager";
import ProductManager from "./Product/ProductManager";
import QuizManager from "./Quiz/QuizManager";
import QuestionManager from "./Question/QuestionManager";
import AnswerManager from "./Answer/AnswerManager";
import CategoryArtifactManager from "./CategoryArtifact/CategoryArtifactManager";
import CategoryHistoricalManager from "./CategoryHistorical/CategoryHistoricalManager";
import CategoryFigureManager from "./CategoryFigure/CategoryFigureManager";
import CategoryProductManager from "./CategoryProduct/CategoryProductManager";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b71c1c;
  color: white;
  padding: 1rem 2rem;
  height: 80px;
`;

const Logo = styled.img`
  height: 120px;
  max-height: 200%;
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
`;

const MainLayout = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

const Sidebar = styled.aside`
  

  width: 250px;
  background-color: #333;
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Cho phép cuộn khi nội dung quá dài */
  max-height: 100vh; /* Giới hạn chiều cao */
  scrollbar-width: thin; /* Tùy chỉnh thanh cuộn trên Firefox */
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;

  /* Tùy chỉnh thanh cuộn trên Chrome & Edge */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 6px;
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  width: 100%;
  border-radius: 6px;
  background: ${(props) => (props.active ? "#b71c1c" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#ccc")};
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #fff;
`;

const ContentTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #b71c1c;
`;

const ContentText = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #666;
`;

const menuItems = [
  { name: "Quản lý tài khoản", icon: Users, compo: UserManager },
  { name: "Quản lý hiện vật", icon: Package, compo: ArtifactManager },
  { name: "Quản lý đơn ứng tuyển", icon: ClipboardList, compo: AppliManager },
  { name: "Quản lý blog", icon: FileText, compo: BlogManager },
  { name: "Quản lý bài kiểm tra", icon: HelpCircle, compo: QuizManager },
  { name: "Quản lý sự kiện", icon: Calendar, compo: EventManager },
  { name: "Quản lý báo cáo", icon: Newspaper, compo: ReportManager },

  {
    name: "Quản lý các giai đoạn lịch sử",
    icon: Newspaper,
    compo: HistoricalManager,
  },
  {
    name: "Quản lý nhân vật lịch sử",
    icon: Newspaper,
    compo: FigureManager,
  },
  {
    name: "Quản lý bảo tàng ",
    icon: Newspaper,
    compo: MuseumManager,
  },
  {
    name: "Quản lý sản phẩm ",
    icon: Newspaper,
    compo: ProductManager,
  },
  {
    name: "Quản lý câu hỏi ",
    icon: Newspaper,
    compo: QuestionManager,
  },
  {
    name: "Quản lý câu trả lời  ",
    icon: Newspaper,
    compo: AnswerManager,
  },
  {
    name: "Quản lý thể loại hiện vật  ",
    icon: Newspaper,
    compo: CategoryArtifactManager,
  },
  {
    name: "Quản lý thể loại lịch sử  ",
    icon: Newspaper,
    compo: CategoryHistoricalManager,
  },
  {
    name: "Quản lý thể loại nhân vật lịch sử  ",
    icon: Newspaper,
    compo: CategoryFigureManager,
  },
  {
    name: "Quản lý thể loại sản phẩm  ",
    icon: Newspaper,
    compo: CategoryProductManager,
  },
];

export default function HomePageAdmin() {
  const [active, setActive] = useState(menuItems[0]);

  return (
    <Container>
      <Header>
        <Logo src="/image/VNMUDoc.png" alt="Logo" />
        <HeaderIcons>
          <User size={24} />
          <MessageSquare size={24} />
          <LogOut size={24} />
        </HeaderIcons>
      </Header>

      <MainLayout>
        <Sidebar>
          <SidebarTitle>Admin Dashboard</SidebarTitle>
          <NavMenu>
            {menuItems.map((item) => (
              <NavButton
                key={item.name}
                active={active.name === item.name}
                onClick={() => setActive(item)}
              >
                <item.icon size={20} />
                {item.name}
              </NavButton>
            ))}
          </NavMenu>
        </Sidebar>

        <Content>
          <ContentTitle>{active.name}</ContentTitle>
          <active.compo />
        </Content>
      </MainLayout>
    </Container>
  );
}
