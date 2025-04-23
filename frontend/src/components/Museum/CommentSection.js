import React, { useState, useContext, useEffect } from "react";
import "../../assets/css/CommentSection.css";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

const CommentSection = () => {
  const { language } = useContext(LanguageContext);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { user: "Người dùng 1", text: "Chiếc xe tăng T-54 này đánh dấu một thời kỳ lịch sử quan trọng." },
    { user: "Người dùng 2", text: "Một biểu tượng huyền thoại của lực lượng thiết giáp thế giới!" },
    { user: "Người dùng 3", text: "Với lớp giáp dày, T-54 từng làm đối thủ e ngại." },
    { user: "Người dùng 4", text: "T-54 minh chứng cho sức mạnh và chiến thuật bọc thép." },
    { user: "Người dùng 5", text: "Bình luận 5" },
    { user: "Người dùng 6", text: "Bình luận 6" },
    { user: "Người dùng 7", text: "Bình luận 7" },
    { user: "Người dùng 8", text: "Bình luận 8" },
    { user: "Người dùng 9", text: "Bình luận 9" },
    { user: "Người dùng 10", text: "Bình luận 10" },
  ]);
  const [translatedComments, setTranslatedComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [labels, setLabels] = useState({
    title: "Cảm nghĩ và Bình luận",
    placeholder: "Nhập bình luận của bạn...",
    submit: "Gửi Bình Luận",
  });

  const commentsPerPage = 5;

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([{ user: "Bạn", text: newComment }, ...comments]);
      setNewComment("");
    }
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = translatedComments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(translatedComments.length / commentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const translateAll = async () => {
      if (language === "vi") {
        setTranslatedComments(comments);
        setLabels({
          title: "Cảm nghĩ và Bình luận",
          placeholder: "Nhập bình luận của bạn...",
          submit: "Gửi Bình Luận",
        });
      } else {
        const translated = await Promise.all(
          comments.map(async (c) => ({
            user: await translateText(c.user, language),
            text: await translateText(c.text, language),
          }))
        );

        setTranslatedComments(translated);

        setLabels({
          title: await translateText("Cảm nghĩ và Bình luận", language),
          placeholder: await translateText("Nhập bình luận của bạn...", language),
          submit: await translateText("Gửi Bình Luận", language),
        });
      }
    };

    translateAll();
  }, [language, comments]);

  return (
    <div className="comment-section">
      <h3>{labels.title}</h3>

      <div className="comment-input">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder={labels.placeholder}
          rows="4"
        />
        <button onClick={handleCommentSubmit}>{labels.submit}</button>
      </div>

      <div className="comment-list">
        {currentComments.map((comment, index) => (
          <div key={index} className="comment-item">
            <strong>{comment.user}:</strong>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage}>&lt;</button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage}>&gt;</button>
      </div>
    </div>
  );
};

export default CommentSection;
