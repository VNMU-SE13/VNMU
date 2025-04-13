import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from 'sweetalert2';

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

    const handleWriteClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        Swal.fire({
        title: 'Bạn chưa đăng nhập!',
        text: 'Vui lòng đăng nhập trước khi viết bài.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng nhập ngay',
        cancelButtonText: 'Để sau',
        }).then((result) => {
        if (result.isConfirmed) {
            navigate("/login");
        }
        });
    } else {
        navigate("/writedescription");
    }
    };

    return (
        <HeaderWrapper>
            <a href="http://localhost:3000">
            <Logo src="/image/VNMUDoc.png" alt="Logo" />
            </a>
            <Nav>
                <NavLink href="http://localhost:3000/myblog">Nhật ký trực tuyến</NavLink>
                <NavLink onClick={handleWriteClick}>Viết</NavLink>
                <NavLink href="http://localhost:3000/login">Trở thành thành viên</NavLink>
                <GetStarted onClick={() => window.location.href = "http://localhost:3000/listblog"}>
                Bắt đầu đọc
                </GetStarted>
            </Nav>
        </HeaderWrapper>
    )
}

export default BlogHeader