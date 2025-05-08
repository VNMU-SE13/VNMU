import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Sidebar from "./Sidebar";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import toSlug from "../../utils/toSlug";
import toDateTime from "../../utils/toDateTime"
import Swal from 'sweetalert2';


// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px;
  background-color: #f4f7fa; /* Light background for the page */
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
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
  display: inline-block;
`;

const NewsImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const NewsMeta = styled.p`
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 10px;

  a {
    color: #007bff;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #0056b3;
  }
`;

const NewsContent = styled.p`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.8;
  white-space: pre-line;
`;

const HashtagWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const Hashtag = styled(Link)`
  display: inline-block;
  background-color: #f1f1f1;
  color: #007bff;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const CommentBox = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
`;

const Comment = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  border-radius: 10px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: fit-content;
  padding: 10px 18px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #218838;
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Username = styled.span`
  font-weight: bold;
  color: #007bff;
  font-size: 1.1rem;
`;

const CommentDate = styled.span`
  font-size: 0.9rem;
  color: #888;
`;

const CommentContent = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
`;

const EditButton = styled.button`
  background: transparent;
  border: none;
  color: #28a745;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 10px;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #218838;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #c82333;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const EditCommentWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  textarea {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    resize: vertical;
    font-size: 1rem;
    min-height: 100px;
    transition: border-color 0.3s ease;
  }

  textarea:focus {
    border-color: #007bff;
    outline: none;
  }

  button {
    padding: 12px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 6px solid #e0e0e0;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #555;
`;

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("Tin tức mới nhất");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [comments, setComments] = useState()
  const { language } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true)

  const t = async (text) => await translateText(text, language);

  const handleEditComment = (index) => {
    setEditingIndex(index);
    setEditedContent(comments[index].content);
    setDropdownIndex(null);
  };

  const handleSaveEditedComment = async () => {
    setLoading(true)
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/Comment/${comments[editingIndex].id}`, {
        content: editedContent,
        rating: 0,
        eventId: id
      })
      const updatedComments = [...comments];
      updatedComments[editingIndex].content = editedContent;
      setComments(updatedComments)
    }
    catch(err) {
      console.log(err)
    }
    setEditingIndex(null);
    setLoading(false)
  };

  const handleDeleteComment = async (indexToDelete) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/Comment/${comments[indexToDelete].id}`)
      const updatedComments = comments.filter((_, index) => index !== indexToDelete);
      setComments(updatedComments)
      setDropdownIndex(null);
    }
    catch(err) {
      console.log(err)
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    if (!localStorage.getItem('token')) {
          Swal.fire({
            icon: 'warning',
            title: 'Vui lòng đăng nhập',
            text: 'Bạn cần đăng nhập để bình luận.',
            confirmButtonText: 'Đăng nhập ngay'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login');
            }
          });
          return;
    }
  
    const comment = {
      content: formData.get("comment"),
      rating: 0,
      eventId: Number(id),
    };
  
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/Comment`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Comment/GetByEventId?eventId=${id}`);
      setComments(res.data);
      e.target.reset();
    } catch (err) {
      console.log("Lỗi khi gửi bình luận:", err);
      await Swal.fire({
        icon: 'error',
        title: await t(err.response.data),
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Event/${id}`);
        const translatedDesc = await t(response.data.description);
        const translatedName = await t(response.data.name);
        const translatedMuseum = await t(response.data.museum?.name || "");
        setSelectedArticle({ ...response.data, description: translatedDesc, name: translatedName, museum: translatedMuseum });
        const resCom = await axios.get(`${process.env.REACT_APP_API_URL}/Comment/GetByEventId?eventId=${id}`)
        setComments(resCom.data)
      } catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false)
      }
    };

    fetchNews();
  }, [id, language]);

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
        <Content>
          <Title>{selectedArticle.name}</Title>
          <NewsMeta>
            <Link to={`/museums/${toSlug(selectedArticle.museum)}`}>{selectedArticle.museum}</Link>
             - {toDateTime(selectedArticle.startDate)}
          </NewsMeta>
          <NewsImage src={selectedArticle.image} alt={selectedArticle.name} />
          <NewsContent>{selectedArticle.description}</NewsContent>

          <HashtagWrapper>
            <Hashtag>{selectedArticle.hastag.hashtag}</Hashtag>
          </HashtagWrapper>

          {loading ?   <LoadingWrapper>
                        <Spinner />
                        <LoadingText>Đang tải dữ liệu...</LoadingText>
                      </LoadingWrapper> : (<CommentBox>
            <h3>{language === 'vi' ? "Bình luận" : "Comments"}</h3>
            {comments &&
              comments.map((comment, index) => (
                <Comment key={index}>
                  <UserInfo>
                    <Username>{comment.user.userName}</Username>
                    <CommentDate>{toDateTime(comment.commentDate)}</CommentDate>

                  
                  </UserInfo>

                  {editingIndex === index ? (
                    <EditCommentWrapper>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        placeholder={language === 'vi' ? "Nhập nội dung chỉnh sửa..." : "Enter edited comment..."}
                      />
                      <button onClick={handleSaveEditedComment}>
                        {language === 'vi' ? "Lưu" : "Save"}
                      </button>
                      <button onClick={() => setEditingIndex(null)}>
                        {language === 'vi' ? "Hủy" : "Cancel"}
                      </button>
                    </EditCommentWrapper>
                  ) : (
                    <CommentContent>{comment.content}</CommentContent>
                  )}

                 {(localStorage.getItem("userId") === comment.user.id) && ( <div>
                    <EditButton onClick={() => handleEditComment(index)}>
                      ✏️ {language === 'vi' ? "Chỉnh sửa" : "Edit"}
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteComment(index)}>
                      🗑️ {language === 'vi' ? "Xóa" : "Delete"}
                    </DeleteButton>
                  </div>)}
                </Comment>
              ))}

            <Form onSubmit={handleCommentSubmit}>
              <Textarea
                name="comment"
                rows={3}
                placeholder={language === 'vi' ? "Nhập bình luận của bạn..." : "Enter your comment..."}
              />
              <SubmitButton type="submit">
                {language === 'vi' ? "Gửi bình luận" : "Submit Comment"}
              </SubmitButton>
            </Form>
          </CommentBox>)}


          <BackButton onClick={() => navigate(-1)}>{language === 'vi' ? "Quay lại" : "Go back"}</BackButton>
        </Content>
      </MainWrapper>
      <Footer />
    </PageContainer>
  );
}
