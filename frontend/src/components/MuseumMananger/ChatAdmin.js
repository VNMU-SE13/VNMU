// ================= ChatAdmin.js (User chat với Admin) =================
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

// ================= Styled Components =================
const ChatContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 80vh;
  font-family: "Segoe UI", sans-serif;
`;

const MessagesBox = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 10px;
`;

const MessageBubble = styled.div`
  background: ${(props) => (props.isUser ? "#d1fae5" : "#e5e7eb")};
  color: #333;
  padding: 10px 14px;
  border-radius: 20px;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  max-width: 70%;
  font-size: 0.95rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  word-break: break-word;
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border-radius: 30px;
  border: 1px solid #ccc;
  background: #fff;
`;

const SendButton = styled.button`
  background: #10b981;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #059669;
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #c8102e;
  text-align: center;
  margin-bottom: 1rem;
`;

// ================= Main Component =================
const ChatAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const connectionRef = useRef();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const adminId = "a921fdb7-c6aa-4ea8-bcc8-6c69eeaa5917";

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Message`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const relevant = res.data.filter(
        (m) =>
          (m.senderId === userId && m.receiverId === adminId) ||
          (m.senderId === adminId && m.receiverId === userId)
      );
      setMessages(relevant);
    } catch (err) {
      console.error("❌ Lỗi tải lịch sử tin nhắn:", err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Message`,
        { receiverId: adminId, message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await connectionRef.current.invoke("SendMessage", adminId, newMessage);

      setMessages((prev) => [
        ...prev,
        {
          senderId: userId,
          receiverId: adminId,
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    } catch (err) {
      console.error("❌ Lỗi gửi tin nhắn:", err);
      alert("Gửi tin nhắn thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_URL.replace("/api", "")}/api/chatHub`, {
        accessTokenFactory: () => token,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connect;

    connect.start()
      .then(() => console.log("✅ SignalR connected"))
      .catch((err) => console.error("❌ SignalR connection error:", err));

    connect.on("ReceiveMessage", (senderId, message) => {
      if (senderId === adminId) {
        setMessages((prev) => [
          ...prev,
          {
            senderId,
            receiverId: userId,
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    });

    return () => connect.stop();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainer>
      <Title>Trò chuyện với Admin</Title>
      <MessagesBox>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} isUser={msg.senderId === userId}>
            {msg.content}
          </MessageBubble>
        ))}
        <div ref={scrollRef} />
      </MessagesBox>

      <InputRow>
        <Input
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <SendButton onClick={sendMessage}>Gửi</SendButton>
      </InputRow>
    </ChatContainer>
  );
};

export default ChatAdmin;
