import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BookOpen, FileText, LogOut, Landmark, MessageCircle } from "lucide-react";
import MuseumArtifactManager from "./MuseumArtifactManager";
import MuseumNewsManager from "./MuseumNewsManager";
import MyMuseum from "./MyMuseum";
import ChatAdmin from "./ChatAdmin";
import axios from "axios";

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
`;

const Sidebar = styled.div`
  width: 260px;
  background-color: #fef3c7;
  color: #78350f;
  padding: 1.5rem;
  border-right: 2px solid #fcd34d;
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.05);
`;

const SidebarTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  font-weight: bold;
  color: #92400e;
  font-family: "Noto Serif", "Segoe UI", serif;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#92400e" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "#78350f")};
  font-size: 0.9rem;
  font-weight: 500;
  font-family: "Segoe UI", sans-serif;
  cursor: pointer;
  border: none;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fcd34d;
    color: #78350f;
  }
`;

const Content = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 2rem;
`;

export default function MuseumManager() {
  const [active, setActive] = useState("artifact");
  const [museum, setMuseum] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Museum`)
        setMuseum(res.data.filter(m => m.user && m.user.id === localStorage.getItem("userId")))
      }
      catch(err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>Quản lý Bảo tàng</SidebarTitle>

        {/* 🔼 MỤC MỚI: Bảo tàng của tôi */}
        <MenuButton active={active === "myMuseum"} onClick={() => setActive("myMuseum")}>
          <Landmark size={18} />
          Bảo tàng của tôi
        </MenuButton>

        {/* 🔼 MỤC CŨ: Hiện vật */}
        <MenuButton active={active === "artifact"} onClick={() => setActive("artifact")}>
          <BookOpen size={18} />
          Hiện vật bảo tàng
        </MenuButton>

        {/* 🔼 MỤC CŨ: Tin tức */}
        <MenuButton active={active === "news"} onClick={() => setActive("news")}>
          <FileText size={18} />
          Tin tức bảo tàng
        </MenuButton>

        {/* 🔽 MỤC MỚI: Trò chuyện */}
        <MenuButton active={active === "chat"} onClick={() => setActive("chat")}>
          <MessageCircle size={18} />
          Trò chuyện với admin
        </MenuButton>

        <MenuButton>
          <LogOut size={18} />
          Đăng xuất
        </MenuButton>
      </Sidebar>

      {museum && (<Content>
        {active === "artifact" && <MuseumArtifactManager museum={museum[0]} />}
        {active === "news" && <MuseumNewsManager />}
        {active === "myMuseum" && <MyMuseum />}
        {active === "chat" && <ChatAdmin />}
      </Content>)}
    </Container>
  );
}
