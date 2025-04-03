import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Sidebar from "./Sidebar";
import axios from "axios";


// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const NewsImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const NewsMeta = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 10px;
`;

const NewsContent = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  white-space: pre-line;
`;

const HashtagWrapper = styled.div`
  margin-top: 20px;
`;

const Hashtag = styled(Link)`
  display: inline-block;
  margin-right: 10px;
  font-size: 0.9rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentBox = styled.div`
  margin-top: 40px;
`;

const Comment = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 10px;
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  width: fit-content;
  padding: 8px 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #218838;
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [selectedMenu, setSelectedMenu] = useState("Tin tức mới nhất");
  const [newComment, setNewComment] = useState();

  

  const handleCommentSubmit = (e) => {
    
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://localhost:7277/api/Event/${id}`)
        setSelectedArticle(response.data)
      }
      catch(err) {
        console.log(err)
      }
    }

    fetchNews()
  }, [])

  if (!selectedArticle) {
    return (
      <PageContainer>
        <Header />
        <MainWrapper>
          <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
          <Content>
            <Title>Bài viết không tồn tại</Title>
            <BackButton onClick={() => navigate(-1)}>Quay lại</BackButton>
          </Content>
        </MainWrapper>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />
      <MainWrapper>
        <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        <Content>
          <Title>{selectedArticle.name}</Title>
          <NewsMeta>{selectedArticle.museum} - {selectedArticle.startDate}</NewsMeta>
          <NewsImage src={selectedArticle.image} alt={selectedArticle.name} />
          <NewsContent>{selectedArticle.description}</NewsContent>

          {/* <HashtagWrapper>
            {selectedArticle.tags?.map((tag, index) => (
              <Hashtag key={index} to={`/tags/${tag}`}>#{tag}</Hashtag>
            ))}
          </HashtagWrapper> */}

          <CommentBox>
            <h3>Bình luận</h3>
            {selectedArticle.comments.map((comment, index) => (
              <Comment key={index}>
                <p><strong>{comment.userId}</strong> <span style={{ color: "#777", fontSize: "0.9rem" }}>({comment.commentDate})</span></p>
                <p>{comment.content}</p>
              </Comment>
            ))}

            <Form onSubmit={handleCommentSubmit}>
             
              <Textarea
                rows={3}
                placeholder="Nhập bình luận của bạn..."
                // value={newComment.content}
                // onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              />
              <SubmitButton type="submit">Gửi bình luận</SubmitButton>
            </Form>
          </CommentBox>

          <BackButton onClick={() => navigate(-1)}>Quay lại</BackButton>
        </Content>
      </MainWrapper>
      <Footer />
    </PageContainer>
  );
}
