import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

// Animation
const slideUp = keyframes`
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 360px;
  height: 520px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  animation: ${slideUp} 0.4s ease forwards;
`;

const Header = styled.div`
  background: #4caf50;
  color: white;
  padding: 12px 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0 0;
  font-size: 16px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;

  button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;

const Body = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Footer = styled.div`
  display: flex;
  padding: 10px 12px;
  border-top: 1px solid #eee;
  background-color: #fafafa;
  border-radius: 0 0 16px 16px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SendButton = styled.button`
  padding: 10px 16px;
  margin-left: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #3d9141;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Message = styled.div`
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 14px;
  align-self: ${({ sender }) =>
    sender === "user" ? "flex-end" : "flex-start"};
  background-color: ${({ sender }) =>
    sender === "user" ? "#dcf8c6" : "#f1f0f0"};
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
`;

const MsgContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Timestamp = styled.div`
  font-size: 12px;
  margin-top: 4px;
  color: #666;
  text-align: ${({ sender }) =>
    sender === "user" ? "right" : "left"};
`;

const Avatar = styled.span`
  font-size: 20px;
`;

const DotFlashing = styled.div`
  display: inline-block;
  width: 1rem;
  text-align: left;

  &::after {
    content: " .";
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%, 20% { color: transparent; }
    40% { color: black; }
    60% { color: transparent; }
    80%, 100% { color: black; }
  }
`;

const ChatboxAI = ({ onClose }) => {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("chat_history");
    return stored ? JSON.parse(stored) : [];
  });

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  const getCurrentTimestamp = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: inputText, time: getCurrentTimestamp() },
    ];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5246/api/GPT/ChatGPT?searchText=${encodeURIComponent(inputText)}`
      );

      setMessages([
        ...newMessages,
        { sender: "bot", text: response.data, time: getCurrentTimestamp() },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "❌ Lỗi khi gọi API", time: getCurrentTimestamp() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem("chat_history");
  };

  return (
    <Wrapper>
      <Header>
        Trợ lý ảo AI
        <HeaderActions>
          <button title="Xoá lịch sử" onClick={handleClear}>🗑</button>
          <button title="Đóng" onClick={onClose}>✖</button>
        </HeaderActions>
      </Header>

      <Body>
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender}>
            <MsgContent>
              <Avatar>{msg.sender === "bot" ? "🤖" : "🙋‍♂️"}</Avatar>
              <span>{msg.text}</span>
            </MsgContent>
            <Timestamp sender={msg.sender}>{msg.time}</Timestamp>
          </Message>
        ))}
        {isLoading && (
          <Message sender="bot">
            <MsgContent>
              <Avatar>🤖</Avatar> <DotFlashing />
            </MsgContent>
            <Timestamp sender="bot">{getCurrentTimestamp()}</Timestamp>
          </Message>
        )}
      </Body>

      <Footer>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Nhập câu hỏi..."
        />
        <SendButton onClick={handleSend}>Gửi</SendButton>
      </Footer>
    </Wrapper>
  );
};

export default ChatboxAI;
