import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import axios from 'axios'
import LoadingWrapper from '../common/LoadingWrapper'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toDateTime from '../../utils/toDateTime'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// ----- Bình luận UI -----
const CommentSection = styled.div`
  margin-top: 2rem;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 1.5rem;
  position: relative;
`;

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const CommentContent = styled.div`
  background: #ffffff;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  position: relative;
`;

const CommentTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const CommentAuthor = styled.div`
  font-weight: 700;
  color: #111827;
  font-size: 1rem;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
  margin-left: 8px;
`;

const CommentText = styled.div`
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.6;
  margin-top: 0.5rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 2rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  font-size: 1rem;
  color: #374151;
`;

const SendButton = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: #1e40af;
  }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
`;

const DropdownButton = styled.button`
  background: ${({ active }) => (active ? "#f3f4f6" : "transparent")};
  border: none;
  font-size: 1.5rem;
  color: ${({ active }) => (active ? "#f59e0b" : "#9ca3af")};
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #f3f4f6;
    color: #f59e0b;
  }
`;


const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
  width: 140px;
  margin-top: 8px;
  overflow: hidden;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  font-size: 0.95rem;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f9fafb;
    color: #f59e0b;
  }
`;




const BlogComments = ( {blogId} ) => {
  const { language } = useContext(LanguageContext);

  const [translated, setTranslated] = useState({
    like: "Thích",
    liked: "Đã thích",
    reply: "Phản hồi",
    placeholder: "Nhập bình luận của bạn",
    send: "Gửi"
  });

  useEffect(() => {
    const translateAll = async () => {
      if (language === "vi") {
        setTranslated({
          like: "Thích",
          liked: "Đã thích",
          reply: "Phản hồi",
          placeholder: "Nhập bình luận của bạn",
          send: "Gửi"
        });
      } else {
        setTranslated({
          like: await translateText("Thích", language),
          liked: await translateText("Đã thích", language),
          reply: await translateText("Phản hồi", language),
          placeholder: await translateText("Nhập bình luận của bạn", language),
          send: await translateText("Gửi", language)
        });
      }
    };

    translateAll();
  }, [language]);

  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    try {
      setLoading(true)
      const fetchData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Rate/GetByBlogId?eventId=${blogId}`)
        setComments(res.data)
      }
      fetchData()
      setLoading(false)
    }
    catch(err) {
      console.log(err)
    }
  }, [])

  const startEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.content);
  };
  
  const handleSaveEdit = async (id, blogId) => {
    if (!editText || editText.trim().length == 0) {
      toast.warn("Nội dung bình luận không được để trống!");
      return;
    }
  
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/Rate/${id}`,
        {
          content: editText,
          rating: 0,
          blogId: blogId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (res.status === 200) {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, content: editText } : c))
        );
        setEditingCommentId(null);
        toast.success("Cập nhật bình luận thành công!");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật comment:", err);
      toast.error("Không thể cập nhật bình luận. Vui lòng thử lại.");
    }
  };
  
  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc?',
      text: "Bình luận sẽ bị xoá vĩnh viễn!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Vâng, xoá ngay!',
      cancelButtonText: 'Huỷ',
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/Rate/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (res.status === 200) {
        setComments((prev) => prev.filter((c) => c.id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Đã xoá!',
          text: 'Bình luận đã được xoá thành công.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error("Lỗi khi xoá comment:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Không thể xoá bình luận. Vui lòng thử lại.'
      });
    }
  };
  
  

  const handleSubmitComment = () => {
    const fetchData = async () => {
      setLoading(true);
      const payload = {
        content: commentText,
        rating: 0,
        blogId: blogId,
      };
  
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/Rate`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (res.status === 200) {
          setComments((prev) => [...prev, res.data]);
          setCommentText("");
          toast.success("Bình luận đã được gửi!");
        } else {
          toast.warning("Không thể gửi bình luận.");
        }
      } catch (err) {
        console.error("Lỗi khi gửi bình luận:", err);
        console.error("Chi tiết lỗi:", err.response?.data || err.message);
        toast.error(
          `Đã xảy ra lỗi`
        );
      } finally {
        setLoading(false);
      }
    };
  
    if (commentText && commentText.trim().length > 0) {
      fetchData();
    } else {
      toast.error("Vui lòng nhập nội dung bình luận.");
    }
  };

  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setTimeout(() => {
        setOpenDropdownId(null);
      }, 200);
    } else {
      setOpenDropdownId(id);
    }
  };

  if(loading) return <p>Loading...</p>
  else
  return (
    <CommentSection>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentBox>
            <Avatar src={comment.avatar} alt={comment.user?.userName} />
            <CommentContent>
              <CommentAuthor>{comment.user?.userName}</CommentAuthor>
              <span style={{ fontSize: "0.8rem", color: "#999" }}>
                {toDateTime(comment.rateDate)}
              </span>

              {editingCommentId === comment.id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
                  />
                  <div style={{ marginTop: "0.5rem" }}>
                    <button onClick={() => handleSaveEdit(comment.id, comment.blogId)}>💾 Lưu</button>
                    <button onClick={() => setEditingCommentId(null)}>❌ Hủy</button>
                  </div>
                </>
              ) : (
                <CommentText>{comment.content}</CommentText>
              )}
            </CommentContent>

            {comment.user?.id === localStorage.getItem("userId") && (
              <DropdownWrapper>
                <DropdownButton onClick={() => toggleDropdown(comment.id)} active={openDropdownId === comment.id}>
                  ⋮
                </DropdownButton>
                {openDropdownId === comment.id && (
                  <DropdownMenu>
                    <DropdownItem onClick={() => startEdit(comment)}>✏️ Sửa</DropdownItem>
                    <DropdownItem onClick={() => handleDelete(comment.id)}>🗑️ Xoá</DropdownItem>
                  </DropdownMenu>
                )}

              </DropdownWrapper>
            )}


          </CommentBox>
        </div>
      ))}

      <InputRow>
        <Avatar src="/image/avatar1.jpg" alt="me" />
        <Input
          placeholder={translated.placeholder}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <SendButton
          onClick={handleSubmitComment}
        >
          {translated.send}
        </SendButton>
      </InputRow>
    </CommentSection>
  );
};

export default BlogComments;