import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Sidebar from "./Sidebar";

const newsArticles = {
  "Tin tức mới nhất": [
    {
      id: 1,
      title: "Khám phá bảo tàng lịch sử",
      description: "Một hành trình hấp dẫn về quá khứ với những hiện vật độc đáo.",
      image: "/image/News&Events/new1.jpg",
      museum: "Bảo tàng Lịch Sử",
      date: "2025-03-06",
      tags: ["LịchSửViệtNam", "BảoTàngLịchSử", "TriểnLãm2025"],
      content: `
Bảo tàng Lịch Sử vừa cho ra mắt một cuộc triển lãm đặc biệt, nơi du khách có thể đắm mình trong dòng chảy lịch sử của dân tộc. Các hiện vật trưng bày bao gồm từ những công cụ đá nguyên thủy, đồ gốm thời kỳ Đông Sơn, đến áo giáp, binh khí cổ đại và tài liệu chiến tranh đầy giá trị.

Một điểm nhấn đặc biệt của triển lãm lần này là **bộ sưu tập vương miện và trang phục cung đình triều Nguyễn**, lần đầu tiên được trưng bày công khai sau khi được phục dựng bằng công nghệ số 3D. Bên cạnh đó, bảo tàng cũng tổ chức các buổi *minitalk* với các nhà sử học uy tín, giúp người xem hiểu sâu hơn về bối cảnh từng hiện vật.

Ngoài ra, khu vực tương tác mới cho phép khách tham quan trải nghiệm **game nhập vai thời lịch sử**, nơi họ có thể "hóa thân" thành một chiến binh hoặc thương nhân cổ đại qua kính thực tế ảo. Trẻ em có thể tham gia các workshop làm trống đồng mô hình, tô màu tranh dân gian Đông Hồ...

Triển lãm mở cửa từ 8:00 sáng đến 6:00 chiều mỗi ngày, kéo dài đến hết tháng 4 năm 2025. Đây là cơ hội hiếm có để khám phá quá khứ hào hùng của dân tộc qua lăng kính sống động và hiện đại.`
    },
    {
      id: 2,
      title: "Công nghệ thực tế ảo trong bảo tàng",
      description: "Trải nghiệm tương tác số hóa mới trong triển lãm.",
      image: "/image/News&Events/new2.jpg",
      museum: "Bảo tàng Công Nghệ",
      date: "2025-03-05",
      tags: ["LịchSửViệtNam", "TrẻEmHọcLịchSử", "GiáoDụcVănHóa"],
      content: "Bài viết về công nghệ thực tế ảo được áp dụng trong các bảo tàng."
    }
  ]
};

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
  const [selectedMenu, setSelectedMenu] = useState("Tin tức mới nhất");

  let selectedArticle = null;
  Object.values(newsArticles).forEach((category) => {
    category.forEach((article) => {
      if (article.id.toString() === id) {
        selectedArticle = article;
      }
    });
  });

  const [comments, setComments] = useState([
    {
      username: "NguyenHoa97",
      date: "2025-03-07",
      content: "Mình đã đi và thực sự ấn tượng với khu vực tương tác thực tế ảo. Bé nhà mình cực kỳ thích!"
    },
    {
      username: "MinhTam_Art",
      date: "2025-03-07",
      content: "Trang phục cung đình triều Nguyễn thật sự tuyệt đẹp. Cảm giác như được sống lại thời phong kiến!"
    },
    {
      username: "LeVanKhoa",
      date: "2025-03-08",
      content: "Ước gì trường học cho học sinh đi tham quan bảo tàng kiểu này mỗi năm một lần. Rất bổ ích!"
    }
  ]);

  const [newComment, setNewComment] = useState({ username: "", content: "" });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.username || !newComment.content) return;

    const now = new Date();
    const date = now.toISOString().slice(0, 10);

    setComments([...comments, {
      username: newComment.username,
      date,
      content: newComment.content
    }]);

    setNewComment({ username: "", content: "" });
  };

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
          <Title>{selectedArticle.title}</Title>
          <NewsMeta>{selectedArticle.museum} - {selectedArticle.date}</NewsMeta>
          <NewsImage src={selectedArticle.image} alt={selectedArticle.title} />
          <NewsContent>{selectedArticle.content}</NewsContent>

          <HashtagWrapper>
            {selectedArticle.tags?.map((tag, index) => (
              <Hashtag key={index} to={`/tags/${tag}`}>#{tag}</Hashtag>
            ))}
          </HashtagWrapper>

          <CommentBox>
            <h3>Bình luận</h3>
            {comments.map((comment, index) => (
              <Comment key={index}>
                <p><strong>{comment.username}</strong> <span style={{ color: "#777", fontSize: "0.9rem" }}>({comment.date})</span></p>
                <p>{comment.content}</p>
              </Comment>
            ))}

            <Form onSubmit={handleCommentSubmit}>
              <Input
                type="text"
                placeholder="Tên của bạn"
                value={newComment.username}
                onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
              />
              <Textarea
                rows={3}
                placeholder="Nhập bình luận của bạn..."
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
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
