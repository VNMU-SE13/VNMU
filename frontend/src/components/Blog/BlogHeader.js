import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 0rem 2rem;
  background-color: #fdfaf6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

const Logo = styled.img`
  width: 130px;
  height: auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled.a`
  color: #111;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const GetStarted = styled.button`
  background-color: #111;
  color: #fff;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const BlogHeader = () => {
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
    <HeaderWrapper>
      <a onClick={() => navigate('/')}>
        <Logo src="/image/VNMUDoc.png" alt="Logo" />
      </a>
      <Nav>
        <NavLink onClick={() => navigate('/blog')}>Blog</NavLink>
        <NavLink onClick={handleDiaryClick}>{translated.diary}</NavLink>
        <NavLink onClick={handleWriteClick}>{translated.write}</NavLink>
        <NavLink onClick={() => navigate('/login')}>{translated.becomeMember}</NavLink>
        <GetStarted onClick={() => navigate('/listblog')}>
          {translated.startReading}
        </GetStarted>
      </Nav>
    </HeaderWrapper>
  );
};

export default BlogHeader;
