import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import BlogDetail from "./BlogDetail";
import Header from "../Home/Header";
import BlogSidebar from "./BlogSidebar";

// ----- Layout -----
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f9fafb;
  margin-left: 240px; /* đẩy Content ra bằng đúng chiều rộng Sidebar */
  flex-direction: column; /* Dọc để chứa các phần tử BlogItemRow */
  gap: 1.5rem; /* Khoảng cách giữa các phần tử */
`;


const Content = styled.div`
  flex: 1;
  padding: 110px 2rem 6rem; /* 90px Header + 20px khoảng cách */
  overflow-y: auto;
  min-height: 100vh;
`;

const BlogItemRow = styled.div`
  background: #ffffff;
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #f59e0b;
  gap: 1.5rem;
  transition: all 0.3s ease;
  flex: 1; /* Làm cho tất cả các phần tử có chiều rộng bằng nhau */
  min-width: 0; /* Đảm bảo không bị co lại */
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.1);
  }
`;

const Thumbnail = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
`;

const BlogInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BlogTitle = styled.h4`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.4;
`;

const BlogDescription = styled.p`
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailButton = styled.button`
  padding: 10px 18px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  height: fit-content;
  white-space: nowrap;
  margin-left: auto;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
    transform: scale(1.05);
  }
`;

const FadeInBox = styled.div`
  animation: fadein 0.4s ease-in-out;
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PaginationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 240px; /* sidebar width */
  right: 0;
  background: #ffffff;
  padding: 12px 0;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  z-index: 50;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
`;


const BlogPage = () => {
  const { id, hashtag } = useParams();
  const navigate = useNavigate();
  const [listBlog, setListBlog] = useState([])
  const [listFilteredBlog, setListFilteredBlog] = useState([])
  const [listStage, setListStage] = useState([])
  const [selectedStage, setSelectedStage] = useState(0);
  const [blog, setBlog] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState()

  const totalPages = Math.ceil(listFilteredBlog.length / itemsPerPage);
  const paginatedBlogs = listFilteredBlog.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  useEffect(() => {
    try {
      const fetchData = async () => {
        const resBlog = await axios.get(`${process.env.REACT_APP_API_URL}/Blog`)
        setListBlog(resBlog.data)
        setListFilteredBlog(resBlog.data)
        const resStage = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryBlog`)
        setListStage(() => {
          return [{id: 0, name: 'Tất cả'},...resStage.data]
        })
      }
      
      fetchData()
    }
    catch(err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Blog/${id}`)
        setBlog(res.data)
      }
      if(id)
        fetchData()
    }
    catch(err) {
      console.log(err)
    }
  }, [id])

  useEffect(() => {
    if(hashtag) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/Blog/getByHashtag?hastag=${encodeURIComponent(hashtag)}`)
          console.log(res.data)
          setListFilteredBlog(res.data)
        }
        catch(err) {
          console.log(err)
        }
      }
      fetchData()
    }
  }, [hashtag])

  const handleSelectStage = (stageId) => {
    setSelectedStage(stageId)
    setListFilteredBlog(() => {
      return stageId == 0
        ? listBlog
        : listBlog.filter((blog) => blog.categoryBlogId === stageId);
    });  
  }

  return (
    <>
      <Header />
      <Container>
        <BlogSidebar
          listStage={listStage}
          selectedStage={selectedStage}
          handleSelectStage={handleSelectStage}
        />

        <Content>
          {id && blog ? (
            <BlogDetail blog={blog}/>
          ) : (
            <FadeInBox>
              <h2>Danh sách bài viết theo: {selectedStage}</h2>
              {paginatedBlogs.length > 0 ? (
                paginatedBlogs.map((blog) => (
                  <BlogItemRow key={blog.id}>
                    <Thumbnail src={blog.image} alt="thumbnail" />
                    <BlogInfo>
                      <BlogTitle>{blog.title}</BlogTitle>
                      <BlogDescription dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </BlogInfo>
                    <DetailButton onClick={() => navigate(`/blog/${blog.id}`)}>
                      Xem chi tiết
                    </DetailButton>
                  </BlogItemRow>
                ))
              ) : (
                <p>Không tìm thấy bài viết.</p>
              )}
              <PaginationWrapper>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    style={{
                      margin: "0 6px",
                      padding: "8px 14px",
                      backgroundColor: currentPage === index + 1 ? "#f59e0b" : "#e5e7eb",
                      color: currentPage === index + 1 ? "#fff" : "#111",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </PaginationWrapper>

            </FadeInBox>
          )}
        </Content>
      </Container>
    </>
  );
};

export default BlogPage;
