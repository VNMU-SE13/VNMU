import React, { useState } from "react";
import styled from "styled-components";

// ----- Bình luận UI -----
const CommentSection = styled.div`
  margin-top: 2rem;
`;

const CommentBox = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 1.25rem;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentContent = styled.div`
  background: #fff;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const CommentText = styled.div`
  font-size: 0.95rem;
  color: #333;
`;

const ReplyBox = styled.div`
  margin-left: 48px;
  margin-top: 0.5rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  border: 1px solid #ccc;
`;

const SendButton = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: #1e40af;
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  color: #555;
  font-size: 0.9rem;
  cursor: pointer;
  position: relative;
`;

const EmojiPicker = styled.div`
  position: absolute;
  top: -2.5rem;
  left: 0;
  display: flex;
  gap: 0.25rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 999px;
  padding: 0.25rem 0.5rem;
  z-index: 10;
`;

const BlogComments = () => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Xanh Mượt",
      avatar: "/image/avatar1.jpg",
      content: "Sự an toàn của bản thân là trên hết nha mọi ngườiiii 😢",
      replies: [
        {
          id: 11,
          author: "Đặng Kim Hân Hân",
          avatar: "/image/avatar2.jpg",
          content: "🌸 Đã tặng 1 sao cho bài viết!"
        }
      ]
    },
    {
      id: 2,
      author: "Hương Giang",
      avatar: "/image/avatar3.jpg",
      content: "Bài viết quá hay luôn!"
    }
  ]);
  const [reactions, setReactions] = useState({});
  const [hoveredComment, setHoveredComment] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});

  const handleAddReply = (parentId) => {
    const text = replyInputs[parentId];
    if (!text) return;

    const newReply = {
      id: Date.now(),
      author: "Bạn",
      avatar: "/image/avatar1.jpg",
      content: text
    };

    const updated = comments.map((c) =>
      c.id === parentId
        ? {
            ...c,
            replies: c.replies ? [...c.replies, newReply] : [newReply]
          }
        : c
    );

    setComments(updated);
    setReplyInputs((prev) => ({
      ...prev,
      [parentId]: ""
    }));
  };

  return (
    <CommentSection>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentBox>
            <Avatar src={comment.avatar} alt={comment.author} />
            <CommentContent>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentText>{comment.content}</CommentText>

              <ActionRow>
                <div
                  onMouseEnter={() => setHoveredComment(comment.id)}
                  onMouseLeave={() => setHoveredComment(null)}
                >
                  {!reactions[comment.id] ? (
                    <span>Thích</span>
                  ) : (
                    <span>Đã thích {reactions[comment.id]}</span>
                  )}
                  {hoveredComment === comment.id &&
                    !reactions[comment.id] && (
                      <EmojiPicker>
                        {["👍", "❤️", "😂", "😢", "😮"].map((emoji) => (
                          <span
                            key={emoji}
                            style={{ fontSize: "1.25rem" }}
                            onClick={() =>
                              setReactions((prev) => ({
                                ...prev,
                                [comment.id]: emoji
                              }))
                            }
                          >
                            {emoji}
                          </span>
                        ))}
                      </EmojiPicker>
                    )}
                </div>

                <div
                  onClick={() =>
                    setReplyInputs((prev) => ({
                      ...prev,
                      [comment.id]: prev[comment.id] || ""
                    }))
                  }
                >
                  Phản hồi
                </div>
              </ActionRow>

              {replyInputs[comment.id] !== undefined && (
                <ReplyBox>
                  <InputRow>
                    <Avatar src="/image/avatar1.jpg" alt="me" />
                    <Input
                      placeholder="Nhập bình luận của bạn"
                      value={replyInputs[comment.id]}
                      onChange={(e) =>
                        setReplyInputs((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value
                        }))
                      }
                    />
                    <SendButton onClick={() => handleAddReply(comment.id)}>
                      Gửi
                    </SendButton>
                  </InputRow>
                </ReplyBox>
              )}
            </CommentContent>
          </CommentBox>

          {comment.replies && (
            <ReplyBox>
              {comment.replies.map((reply) => (
                <CommentBox key={reply.id}>
                  <Avatar src={reply.avatar} alt={reply.author} />
                  <CommentContent>
                    <CommentAuthor>{reply.author}</CommentAuthor>
                    <CommentText>{reply.content}</CommentText>
                  </CommentContent>
                </CommentBox>
              ))}
            </ReplyBox>
          )}
        </div>
      ))}

      <InputRow>
        <Avatar src="/image/avatar1.jpg" alt="me" />
        <Input
          placeholder="Nhập bình luận của bạn"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <SendButton
          onClick={() => {
            if (!commentText.trim()) return;
            const newComment = {
              id: Date.now(),
              author: "Bạn",
              avatar: "/image/avatar1.jpg",
              content: commentText,
              replies: []
            };
            setComments([...comments, newComment]);
            setCommentText("");
          }}
        >
          Gửi
        </SendButton>
      </InputRow>
    </CommentSection>
  );
};

export default BlogComments;
