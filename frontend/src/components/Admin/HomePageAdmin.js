import React, { useState } from 'react';
import { Users, Package, ClipboardList, FileText, HelpCircle, Calendar, Newspaper, User, MessageSquare, LogOut } from 'lucide-react';
import styled from 'styled-components';
import UserManagement from './UserManagement';
import ArtifactManagement from './ArtifactManagement';
import BlogManagement from './BlogManagement';
import EventManagement from './EventManagement';
import NewsManagement from './NewsManagement';

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
  { name: "Quản lý tài khoản", icon: Users },
  { name: "Quản lý hiện vật", icon: Package },
  { name: "Quản lý đơn", icon: ClipboardList },
  { name: "Quản lý blog", icon: FileText },
  { name: "Quản lý câu đố", icon: HelpCircle },
  { name: "Quản lý sự kiện", icon: Calendar },
  { name: "Quản lý tin tức", icon: Newspaper },
];

export default function HomePageAdmin() {
  const [active, setActive] = useState("Quản lý tài khoản");

  return (
    <Container>
      {/* Header */}
      <Header>
        <Logo src="/image/VNMUDoc.png" alt="Logo" />
        <HeaderIcons>
          <User size={24} />
          <MessageSquare size={24} />
          <LogOut size={24} />
        </HeaderIcons>
      </Header>

      <MainLayout>
        {/* Sidebar */}
        <Sidebar>
          <SidebarTitle>Admin Dashboard</SidebarTitle>
          <NavMenu>
            {menuItems.map((item) => (
              <NavButton key={item.name} active={active === item.name} onClick={() => setActive(item.name)}>
                <item.icon size={20} />
                {item.name}
              </NavButton>
            ))}
          </NavMenu>
        </Sidebar>

        {/* Content */}
        <Content>
          <ContentTitle>{active}</ContentTitle>
          
          {active === "Quản lý tài khoản" ? (
            <UserManagement />
          ) : active === "Quản lý hiện vật" ? (
            <ArtifactManagement/>
          ) : active === "Quản lý blog" ? (
            <BlogManagement/>
          ) : active === "Quản lý sự kiện" ? (
            <EventManagement/>
          ) : active === "Quản lý tin tức" ? (
            <NewsManagement/>
          ) : (
            <ContentText>Đây là khu vực quản lý: {active}</ContentText>
          )}
        </Content>
      </MainLayout>
    </Container>
  );
}