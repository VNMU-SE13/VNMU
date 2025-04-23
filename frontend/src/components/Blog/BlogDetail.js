import React from "react";
import { FaShareAlt } from "react-icons/fa";
import BlogComments from "./BlogComments";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";


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

const LikeButton = styled.button`
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const CommentSectionWrapper = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
`;

const CommentTitle = styled.h3`
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;



const BlogDetail = ({ blog }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    if (!liked) {
      setLikeCount(prev => prev + 1);
      setLiked(true);
    } else {
      setLikeCount(prev => prev - 1);
      setLiked(false);
    }
  };
  

  return (
    <>
      <Title>{blog.title}</Title>
      <BlogCenterWrapper>
        <BlogImage src={blog.image} alt={blog.title} />
        <BlogDescription>{blog.content}</BlogDescription>

        <BlogMetaRow>
          {blog.hastagOfBlog.map((tag, index) => (
            <Hashtag key={index} onClick={() => navigate(`/listblog/${encodeURIComponent(tag.hashtag)}`)}>{tag.hashtag}</Hashtag>
          ))}
        </BlogMetaRow>

        <BlogMetaRow>
          <BlogDate>Ngày đăng: {new Date(blog.createdDate).toLocaleDateString()}</BlogDate>
          <LikeButton onClick={handleLike}>
            {liked ? "❤️" : "🤍"} {likeCount}
          </LikeButton>
          <ShareButton
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                "_blank"
              )
            }
          >
            <FaShareAlt />
          </ShareButton>
        </BlogMetaRow>
      </BlogCenterWrapper>

      <CommentSectionWrapper>
        <CommentTitle>📝 Bình luận</CommentTitle>
        <BlogComments blogId={blog.id} />
      </CommentSectionWrapper>

      <BackButton onClick={() => navigate("/listblog")}>Quay lại danh sách</BackButton>
    </>
  );
};

export default BlogDetail;
