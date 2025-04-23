import React from "react";
import styled from "styled-components";
import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import { useNavigate } from "react-router-dom";

const StageButton = styled.button`
  width: 100%;
  background: ${({ active }) => (active ? "#fbbf24" : "#f7f1eb")};
  color: #1f2937;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.95rem;
  font-weight: ${({ active }) => (active ? "600" : "500")};
  padding: 10px 18px;
  border-radius: 999px;
  margin-bottom: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${({ active }) => (active ? "0 2px 8px rgba(251, 191, 36, 0.4)" : "0 1px 4px rgba(0, 0, 0, 0.05)")};

  &:hover {
    background: #fcd34d;
    transform: scale(1.02);
    font-weight: 600;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.4);
  }
`;

const Sidebar = styled.div`
  width: 240px;
  background: #1f2937;
  padding: 80px 1.5rem 80px; /* padding: top right/left bottom */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #f9fafb;
  border-right: 1px solid #374151;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
`;

const SidebarTop = styled.div`
  background: #111827;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  color: #fbbf24;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const StageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavSection = styled.div`
  background: #111827;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavLink = styled.div`
  color: #d1d5db;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #fbbf24;
  }
`;

const GetStarted = styled.button`
  margin-top: 1.5rem;
  background-color: #fbbf24;
  color: #1f2937;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: #facc15;
    transform: scale(1.03);
  }
`;

const BlogSidebar = ({ listStage, selectedStage, handleSelectStage }) => {
    const navigate = useNavigate();
    const { language } = useContext(LanguageContext);
    const [translated, setTranslated] = useState({
      diary: "Nhật ký trực tuyến",
      write: "Viết",
      becomeMember: "Trở thành thành viên",
      startReading: "Bắt đầu đọc",
      alertTitle: "Bạn chưa đăng nhập!",
      alertText: "Vui lòng đăng nhập trước khi viết bài.",
      confirmText: "Đăng nhập ngay",
      cancelText: "Để sau"
    });
  
    useEffect(() => {
      const translateAll = async () => {
        if (language === "vi") {
          setTranslated({
            diary: "Nhật ký trực tuyến",
            write: "Viết",
            becomeMember: "Trở thành thành viên",
            startReading: "Bắt đầu đọc",
            alertTitle: "Bạn chưa đăng nhập!",
            alertText: "Vui lòng đăng nhập trước khi viết bài.",
            confirmText: "Đăng nhập ngay",
            cancelText: "Để sau"
          });
        } else {
          setTranslated({
            diary: await translateText("Nhật ký trực tuyến", language),
            write: await translateText("Viết", language),
            becomeMember: await translateText("Trở thành thành viên", language),
            startReading: await translateText("Bắt đầu đọc", language),
            alertTitle: await translateText("Bạn chưa đăng nhập!", language),
            alertText: await translateText("Vui lòng đăng nhập trước khi viết bài.", language),
            confirmText: await translateText("Đăng nhập ngay", language),
            cancelText: await translateText("Để sau", language)
          });
        }
      };
  
      translateAll();
    }, [language]);
  
    const handleWriteClick = () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        Swal.fire({
          title: translated.alertTitle,
          text: translated.alertText,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: translated.confirmText,
          cancelButtonText: translated.cancelText,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      } else {
        navigate("/writedescription");
      }
    };
  
    const handleDiaryClick = () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        Swal.fire({
          title: translated.alertTitle,
          text: 'Vui lòng đăng nhập!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: translated.confirmText,
          cancelButtonText: translated.cancelText,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      } else {
        navigate("/myblog");
      }
    }


    return (
        <Sidebar>
            <NavSection>
                <Nav>
                    <NavLink onClick={() => navigate('/blog')}>Blog</NavLink>
                    <NavLink onClick={handleDiaryClick}>{translated.diary}</NavLink>
                    <NavLink onClick={handleWriteClick}>{translated.write}</NavLink>
                </Nav>
                <GetStarted onClick={() => navigate('/listblog')}>
                    {translated.startReading}
                </GetStarted>
            </NavSection>
            <SidebarTop>
                <SidebarTitle>Giai đoạn</SidebarTitle>
                <StageList>
                {listStage.map((stage) => (
                    <StageButton
                    key={stage.id}
                    active={selectedStage === stage.id}
                    onClick={() => handleSelectStage(stage.id)}
                    >
                    {stage.name}
                    </StageButton>
                ))}
                </StageList>
            </SidebarTop>
        </Sidebar>


    );
};

export default BlogSidebar;
