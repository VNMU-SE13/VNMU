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
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("Tin tức mới nhất");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const handleEditComment = (index) => {
    setEditingIndex(index);
    setEditedContent(selectedArticle.comments[index].content);
    setDropdownIndex(null); // đóng dropdown sau khi chọn
  };
  
  const handleSaveEditedComment = () => {
    const updatedComments = [...selectedArticle.comments];
    updatedComments[editingIndex].content = editedContent;
    setSelectedArticle({ ...selectedArticle, comments: updatedComments });
    setEditingIndex(null);
  };
  
  const handleDeleteComment = (indexToDelete) => {
    const updatedComments = selectedArticle.comments.filter(
      (_, index) => index !== indexToDelete
    );
    setSelectedArticle({ ...selectedArticle, comments: updatedComments });
    setDropdownIndex(null);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }

    const comment = {
      content: formData.get("comment"),
      rating: 0,
      eventId: id    
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/Comment`, comment, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Làm mới lại bình luận sau khi gửi
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/Event/${id}`);
      setSelectedArticle(response.data);
      e.target.reset();
    } catch (err) {
      console.log("Lỗi khi gửi bình luận:", err);
      alert("Không gửi được bình luận. Vui lòng thử lại.");
      alert("Không gửi được bình luận. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Event/${id}`);
        setSelectedArticle(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNews();
  }, [id]);

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
          <NewsMeta>
            {selectedArticle.museum} - {selectedArticle.startDate}
          </NewsMeta>
          <NewsImage src={selectedArticle.image} alt={selectedArticle.name} />
          <NewsContent>{selectedArticle.description}</NewsContent>

          <HashtagWrapper>
            <Hashtag>{selectedArticle.hastag}</Hashtag>
          </HashtagWrapper>

          <CommentBox>
          <h3>Bình luận</h3>
          {selectedArticle.comments &&
            selectedArticle.comments.map((comment, index) => (
              <Comment key={index} style={{ position: "relative" }}>
                {console.log(comment)}
                <p>
                  <strong>{comment.userId}</strong>{" "}
                  <span style={{ color: "#777", fontSize: "0.9rem" }}>
                    ({comment.commentDate})
                  </span>

                  {/* Dropdown Toggle Button */}
                  <button
                    onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      lineHeight: "30px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "background 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                  >
                    ⋮
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownIndex === index && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "5px",
                        zIndex: 10,
                      }}
                    >
                      <div
                        onClick={() => handleEditComment(index)}
                        style={{ padding: "5px 10px", cursor: "pointer" }}
                      >
                        ✏️ Chỉnh sửa
                      </div>
                      <div
                        onClick={() => handleDeleteComment(index)}
                        style={{ padding: "5px 10px", cursor: "pointer", color: "red" }}
                      >
                        🗑️ Xóa
                      </div>
                    </div>
                  )}
                </p>

                {/* Nội dung bình luận */}
                {editingIndex === index ? (
                  <div>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      rows={3}
                      style={{ width: "100%", marginTop: "8px" }}
                    />
                    <button onClick={handleSaveEditedComment}>Lưu</button>
                    <button onClick={() => setEditingIndex(null)}>Hủy</button>
                  </div>
                ) : (
                  <p>{comment.content}</p>
                )}
              </Comment>
            ))}

            <Form onSubmit={handleCommentSubmit}>
              <Textarea
                name="comment"
                rows={3}
                placeholder="Nhập bình luận của bạn..."
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
