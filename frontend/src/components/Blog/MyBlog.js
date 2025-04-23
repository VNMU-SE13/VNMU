import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import BlogHeader from "./BlogHeader";
import axios from 'axios';
import Swal from "sweetalert2";
import toDateTime from "../../utils/toDateTime";
import Header from "../Home/Header";
import BlogSidebar from "./BlogSidebar";

const HEADER_HEIGHT = 90; // header height cố định
const SIDEBAR_WIDTH = 240; // sidebar width cố định

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
  background: #f9fafb;
  margin-left: ${SIDEBAR_WIDTH}px;
`;

const Sidebar = styled.div`
  width: ${SIDEBAR_WIDTH}px;
  background: #1f2937;
  padding: 2rem 1rem;
  color: white;
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  animation: ${slideIn} 0.4s ease;
  z-index: 20;
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  color: #f59e0b;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SidebarItem = styled.div`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #f3f4f6;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #374151;
    color: #fbbf24;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: ${HEADER_HEIGHT + 20}px 2rem 4rem; /* top + bottom space */
  overflow-y: auto;
`;

const BlogTable = styled.table`
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-collapse: collapse;
  font-size: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  animation: ${slideIn} 0.5s ease;
`;

const Th = styled.th`
  background: #f8f1df;
  border: 1px solid #d6caa8;
  padding: 1rem;
  text-align: left;
  color: #4b3b28;
`;

const Td = styled.td`
  border: 1px solid #e5e7eb;
  padding: 0.85rem;
  color: #374151;
  background-color: #ffffff;
`;

const ActionButton = styled.button`
  padding: 8px 14px;
  margin-right: 8px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;
  color: white;

  &:hover {
    transform: scale(1.05);
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #3b82f6;

  &:hover {
    background-color: #2563eb;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #ef4444;

  &:hover {
    background-color: #dc2626;
  }
`;

const MyBlog = () => {
  const [listBlog, setListBlog] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listFilteredBlog, setListFilteredBlog] = useState([])
  const [listStage, setListStage] = useState([])
  const [selectedStage, setSelectedStage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Blog/getAllByUserLogged`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const resStage = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryBlog`)
        setListStage(() => {
          return [{id: 0, name: 'Tất cả'},...resStage.data]
        })
        setListBlog(res.data);
        setListFilteredBlog(res.data)
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/myblog/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc chắn muốn xóa bài viết này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Vâng, xóa ngay!",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/Blog/${id}`);

        if (res.status === 200) {
          setListBlog((prev) => prev.filter((blog) => blog.id !== id));
          setListFilteredBlog((prev) => prev.filter((blog) => blog.id !== id));
          Swal.fire({
            icon: "success",
            title: "Đã xóa!",
            text: "Bài viết đã được xóa thành công.",
            timer: 1800,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Thất bại!",
            text: "Không thể xóa bài viết. Vui lòng thử lại.",
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Đã xảy ra lỗi khi xóa bài viết.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectStage = (stageId) => {
    setSelectedStage(stageId)
    setListFilteredBlog(() => {
      return selectedStage == 0
        ? listBlog
        : listBlog.filter((blog) => blog.categoryBlogId === selectedStage);
    });  
  }


  return (
    <>
      <Header />
      <BlogSidebar
          listStage={listStage}
          selectedStage={selectedStage}
          handleSelectStage={handleSelectStage}
      />
      <Container>
        <Content>
          <BlogTable>
            <thead>
              <tr>
                <Th></Th>
                <Th>Tiêu đề</Th>
                <Th>Lượt thích</Th>
                <Th>Ngày</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {listFilteredBlog.map((blog, index) => (
                <tr key={index}>
                  <Td><input type="checkbox" /></Td>
                  <Td>
                    <div>
                      <strong>{blog.title}</strong>
                    </div>
                  </Td>
                  <Td>0</Td>
                  <Td>{toDateTime(blog.createdDate)}</Td>
                  <Td>
                    <div style={{ marginTop: "0.5rem" }}>
                        <EditButton onClick={() => handleEdit(blog.id)}>✏️ Chỉnh sửa</EditButton>
                        <DeleteButton onClick={() => handleDelete(blog.id)}>🗑 Xóa</DeleteButton>
                      </div>
                    </Td>
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
