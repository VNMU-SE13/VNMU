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
  ChevronDown,
  ChevronUp,
  Settings,
  BarChart2,
} from "lucide-react";
import styled from "styled-components";

// Component quản lý
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
import ChatUser from "./ChatUser";
import Dashboard from "./DashBoard/DashBoard";

// Styled-components
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
  overflow-y: auto;
  max-height: 100vh;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 6px;
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  font-family: "Segoe UI", sans-serif;
`;

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0.65rem 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: "Segoe UI", sans-serif;
  border-radius: 6px;
  background-color: ${(props) => (props.active ? "#444" : "transparent")};
  cursor: pointer;
  margin-bottom: 4px;
  transition: background 0.2s ease;

  &:hover {
    background-color: #444;
  }
`;

const NavButton = styled.button`
  display: block;
  text-align: left;
  padding: 0.5rem 0.75rem;
  width: 100%;
  border-radius: 6px;
  background: ${(props) => (props.active ? "#b71c1c" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#ccc")};
  font-size: 0.875rem;
  font-family: "Segoe UI", sans-serif;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background 0.2s ease;
  margin-left: 0.75rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CollapseWrapper = styled.div`
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: ${(props) => (props.isOpen ? "1000px" : "0px")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
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

const groupedMenuItems = [
  {
    title: "Quản lý người dùng",
    icon: Users,
    items: [
      { name: "Quản lý tài khoản", compo: UserManager },
      // { name: "Quản lý đơn ứng tuyển", compo: AppliManager },
    ],
  },
  {
    title: "Quản lý hệ thống",
    icon: Settings,
    items: [
      { name: "Quản lý hiện vật", compo: ArtifactManager },
      { name: "Quản lý blog", compo: BlogManager },
      { name: "Quản lý bài kiểm tra", compo: QuizManager },
      { name: "Quản lý sự kiện", compo: EventManager },
      // { name: "Quản lý báo cáo", compo: ReportManager },
      // { name: "Quản lý các giai đoạn lịch sử", compo: HistoricalManager },
      // { name: "Quản lý nhân vật lịch sử", compo: FigureManager },
      { name: "Quản lý bảo tàng", compo: MuseumManager },
      // { name: "Quản lý sản phẩm", compo: ProductManager },
      { name: "Quản lý câu hỏi", compo: QuestionManager },
      { name: "Quản lý câu trả lời", compo: AnswerManager },
      { name: "Quản lý thể loại hiện vật", compo: CategoryArtifactManager },
      { name: "Quản lý thể loại lịch sử", compo: CategoryHistoricalManager },
      // { name: "Quản lý thể loại nhân vật lịch sử", compo: CategoryFigureManager },
      // { name: "Quản lý thể loại sản phẩm", compo: CategoryProductManager },
    ],
  },
  {
    title: "Thống kê",
    icon: BarChart2,
    items: [
      {name: 'DashBoardDashBoard', compo: Dashboard}
    ],
  },
  {
    title: "Chat với người dùng",
    icon: MessageSquare, // 👈 thêm icon mới luôn
    items: [
      { name: "Trò chuyện với user", compo: ChatUser },
    ],
  },
  {
    title: "Thiết lập",
    icon: Settings,
    items: [],
  },
];

export default function HomePageAdmin() {
  const [active, setActive] = useState(groupedMenuItems[0].items[0]);
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

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

          {groupedMenuItems.map((group) => (
            <div key={group.title}>
              <GroupHeader onClick={() => toggleGroup(group.title)} active={openGroups[group.title]}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <group.icon size={18} />
                  {group.title}
                </div>
                {group.items.length > 0 &&
                  (openGroups[group.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </GroupHeader>

              <CollapseWrapper isOpen={openGroups[group.title]}>
                {group.items.map((item) => (
                  <NavButton
                    key={item.name}
                    active={active.name === item.name}
                    onClick={() => setActive(item)}
                  >
                    {item.name}
                  </NavButton>
                ))}
              </CollapseWrapper>
            </div>
          ))}
        </Sidebar>

        <Content>
          <ContentTitle>{active.name}</ContentTitle>
          <active.compo />
        </Content>
      </MainLayout>
    </Container>
  );
}
