import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { GiShield, GiScrollQuill, GiPagoda } from "react-icons/gi";
import { FaShareAlt } from "react-icons/fa";
import BlogComments from "./BlogComments";
import axios from "axios";
import BlogHeader from "./BlogHeader";

const Hashtag = styled.span`
  background-color: #fef3c7;        /* Màu nền vàng nhạt */
  color: #b45309;                   /* Màu chữ nâu cam */
  font-size: 0.85rem;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 600;
  margin-right: 0.5rem;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #fde68a;
    color: #92400e;
    transform: scale(1.05);
  }
`;
// ----- Layout -----
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f2f4f8;
`;

const Sidebar = styled.div`
  width: 240px;
  background: #1f2937;
  padding: 2rem 1rem;
  color: white;
`;

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


const Content = styled.div`
  flex: 1;
  padding: 2rem;
`;

const BlogItemRow = styled.div`
  background: #fff;
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #f59e0b;
  gap: 1rem;
  justify-content: space-between;
`;

const Thumbnail = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 6px;
  object-fit: cover;
`;

const BlogInfo = styled.div`
  flex: 1;
`;

const BlogTitle = styled.h4`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: #222;
`;

const BlogDate = styled.p`
  font-size: 0.85rem;
  color: #888;
`;

const BlogDescription = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.7;
  max-width: 80%;
  margin: 0;
`;

const DetailButton = styled.button`
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  height: fit-content;
  align-self: flex-start;
  white-space: nowrap;
  margin-left: auto;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const BlogImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 1.25rem;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: #1f2937;
`;

const BlogCenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlogMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

const ShareButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #1877f2;
  font-size: 1.2rem;

  &:hover {
    color: #0d5ae5;
  }
`;

const BackButton = styled(ShareButton)`
  background-color: #2563eb;
  color: #fff;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 6px;
  margin-top: 2rem;

  &:hover {
    background-color: #1d4ed8;
    color: #fff;
  }
`;

const FadeInBox = styled.div`
  animation: fadein 0.4s ease-in-out;
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listBlog, setListBlog] = useState([])
  const [listFilteredBlog, setListFilteredBlog] = useState([])
  const [listStage, setListStage] = useState([])
  const [selectedStage, setSelectedStage] = useState(0);
  const [blog, setBlog] = useState()

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

  const handleSelectStage = (stageId) => {
    setSelectedStage(stageId)
    setListBlog(() => {
      return selectedStage === 0
        ? listBlog
        : listBlog.filter((blog) => blog.id === selectedStage);
    });
    

    console.log(listFilteredBlog)
    if (id) navigate("/blog");
  }

  return (
    <>
      <BlogHeader />
      <Container>
        <Sidebar>
          <h3 style={{ marginBottom: "1rem", color: "#f59e0b" }}>Giai đoạn</h3>
          {listStage.map((stage) => (
            <StageButton
              key={stage.id}
              active={selectedStage === stage.id}
              onClick={() => {
                handleSelectStage(stage.id);
              }}
            >
              {stage.name}
            </StageButton>
          ))}
        </Sidebar>

        <Content>
          {id && blog ? (
            <FadeInBox>
              <Title>{blog.title}</Title>
              <BlogCenterWrapper>
                <BlogImage src={blog.image} alt={blog.title} />
                <BlogDescription>{blog.content}</BlogDescription>
                <BlogMetaRow>
                  {blog.hastagOfBlog.map((tag, index) => (
                    <Hashtag key={index}>{tag.hashtag}</Hashtag>
                  ))}

                </BlogMetaRow>
                <BlogMetaRow>
                  <BlogDate>Ngày đăng: {blog.createdDate}</BlogDate>
                  <ShareButton
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                        "_blank"
                      )
                    }
                    aria-label="Chia sẻ bài viết"
                  >
                    <FaShareAlt />
                  </ShareButton>
                </BlogMetaRow>
              </BlogCenterWrapper>
              <BlogComments />
              <BackButton onClick={() => navigate("/listblog")}>
                Quay lại danh sách
              </BackButton>
            </FadeInBox>
          ) : (
            <FadeInBox>
              <h2>Danh sách bài viết theo giai đoạn: {selectedStage}</h2>
              {listFilteredBlog.length > 0 ? (
                listFilteredBlog.map((blog) => (
                  <BlogItemRow key={blog.id}>
                    <Thumbnail src={blog.image} alt="thumbnail" />
                    <BlogInfo>
                      <BlogTitle>{blog.title}</BlogTitle>
                      <BlogDescription>{blog.content}</BlogDescription>
                    </BlogInfo>
                    <DetailButton onClick={() => navigate(`/blog/${blog.id}`)}>
                      Xem chi tiết
                    </DetailButton>
                  </BlogItemRow>
                ))
              ) : (
                <p>Không tìm thấy bài viết.</p>
              )}
            </FadeInBox>
          )}
        </Content>
      </Container>
    </>
  );
};

export default BlogPage;
