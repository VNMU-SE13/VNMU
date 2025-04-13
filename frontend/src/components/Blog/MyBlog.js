import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f2f4f8;
  font-family: "Segoe UI", sans-serif;
`;

const Sidebar = styled.div`
  width: 240px;
  background: #1f2937;
  padding: 2rem 1rem;
  color: white;
  animation: ${slideIn} 0.4s ease;
`;

const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  color: #f59e0b;
  margin-bottom: 1rem;
`;

const SidebarItem = styled.div`
  padding: 0.75rem 0;
  font-size: 1rem;
  color: #f3f4f6;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #fbbf24;
    transform: translateX(5px);
  }
`;

const Submenu = styled.div`
  padding-left: 1rem;
  font-size: 0.95rem;
  color: #d1d5db;
`;

const SubmenuItem = styled.div`
  padding: 0.5rem 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #fbbf24;
    transform: translateX(5px);
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  animation: ${slideIn} 0.5s ease;
`;

const BlogTable = styled.table`
  width: 100%;
  background: #fefcf3;
  border: 1px solid #d6caa8;
  border-collapse: collapse;
  font-size: 1rem;
  font-family: 'Be Vietnam Pro', serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow: hidden;
  animation: fadeUp 0.5s ease;

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Th = styled.th`
  background: #f8f1df;
  border: 1px solid #d6caa8;
  padding: 0.9rem;
  text-align: left;
  font-weight: bold;
  color: #4b3b28;
`;

const Td = styled.td`
  border: 1px solid #e2d8b4;
  padding: 0.75rem;
  color: #3d3d3d;
  background-color: #fffef8;
`;

const ActionLink = styled.span`
  color: #3b82f6;
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: #2563eb;
  }
`;

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
  transition: color 0.3s ease;

  &:hover {
    color: #f15c22;
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
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #333;
    transform: scale(1.05);
  }
`;

const Header = () => (
  <HeaderWrapper>
    <Logo src="/image/VNMUDoc.png" alt="Logo" />
    <Nav>
      <NavLink>Nhật ký trực tuyến</NavLink>
      <NavLink href="http://localhost:3000/writedescription">Viết</NavLink>
      <NavLink>Trở thành thành viên</NavLink>
      <GetStarted>Bắt đầu đọc</GetStarted>
    </Nav>
  </HeaderWrapper>
);

const MyBlog = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("myBlogs");
    if (stored) setBlogs(JSON.parse(stored));
  }, []);

  const handleEdit = (blog, index) => {
    localStorage.setItem("editingBlog", JSON.stringify({ ...blog, index }));
    navigate("/writedescription");
  };

  const handleDelete = (indexToDelete) => {
    const updatedBlogs = blogs.filter((_, index) => index !== indexToDelete);
    setBlogs(updatedBlogs);
    localStorage.setItem("myBlogs", JSON.stringify(updatedBlogs));
  };

  const filteredBlogs =
    filterStatus === "all"
      ? blogs
      : blogs.filter((b) => b.status === filterStatus);

  return (
    <>
      <Header />
      <Container>
        <Sidebar>
          <SidebarTitle>Bài đăng</SidebarTitle>
          <SidebarItem onClick={() => setFilterStatus("all")}>Tất cả</SidebarItem>
          <Submenu>
            <SubmenuItem onClick={() => setFilterStatus("pending")}>Chờ duyệt</SubmenuItem>
            <SubmenuItem onClick={() => setFilterStatus("approved")}>Đã duyệt</SubmenuItem>
          </Submenu>
          <SidebarItem>Nhận xét</SidebarItem>
          <SidebarItem>Cài đặt</SidebarItem>
        </Sidebar>
        <Content>
          <BlogTable>
            <thead>
              <tr>
                <Th></Th>
                <Th>Tiêu đề</Th>
                <Th>Lượt xem</Th>
                <Th>Ngày</Th>
                <Th>Tình trạng</Th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog, index) => (
                <tr key={index}>
                  <Td>
                    <input type="checkbox" />
                  </Td>
                  <Td>
                    <div>
                      <strong>{blog.title}</strong>
                      <div>
                        <ActionLink onClick={() => handleEdit(blog, index)}>
                          Chỉnh sửa
                        </ActionLink>
                        <ActionLink onClick={() => handleDelete(index)}>
                          Xóa
                        </ActionLink>
                      </div>
                    </div>
                  </Td>
                  <Td>0</Td>
                  <Td>{blog.date || new Date().toLocaleDateString()}</Td>
                  <Td>{blog.status === "approved" ? "Đã duyệt" : "Chờ duyệt"}</Td>
                </tr>
              ))}
            </tbody>
          </BlogTable>
        </Content>
      </Container>
    </>
  );
};

export default MyBlog;
