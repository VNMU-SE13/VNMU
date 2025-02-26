import React, { useState } from "react";
import "../../assets/css/CommentSection.css"; // CSS file for styling

const CommentSection = () => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { user: "Người dùng 1", text: "Bình luận 1" },
    { user: "Người dùng 2", text: "Bình luận 2" },
    { user: "Người dùng 3", text: "Bình luận 3" },
    { user: "Người dùng 4", text: "Bình luận 4" },
    { user: "Người dùng 5", text: "Bình luận 5" },
    { user: "Người dùng 6", text: "Bình luận 6" },
    { user: "Người dùng 7", text: "Bình luận 7" },
    { user: "Người dùng 8", text: "Bình luận 8" },
    { user: "Người dùng 9", text: "Bình luận 9" },
    { user: "Người dùng 10", text: "Bình luận 10" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([{ user: "Bạn", text: newComment }, ...comments]); // Thêm vào đầu mảng
      setNewComment(""); // Clear input after submission
    }
  };

  // Phân trang: tính toán các bình luận hiện tại
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="comment-section">
      {/* Tiêu đề phần bình luận */}
      <h3>Cảm nghĩ và Bình luận</h3>

      {/* Phần nhập bình luận */}
      <div className="comment-input">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Nhập bình luận của bạn..."
          rows="4"
        />
        <button onClick={handleCommentSubmit}>Gửi Bình Luận</button>
      </div>

      {/* Phần bình luận từ người khác */}
      <div className="comment-list">
        {currentComments.map((comment, index) => (
          <div key={index} className="comment-item">
            <strong>{comment.user}:</strong>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      {/* Các nút điều hướng bình luận */}
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
