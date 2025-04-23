// ================= ChatUser.js (Admin chat với nhiều User) =================
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

const Wrapper = styled.div`
  display: flex;
  height: 80vh;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  font-family: "Segoe UI", sans-serif;
  background: #fafafa;
`;

const Sidebar = styled.div`
  width: 240px;
  background: #f7f7f7;
  border-right: 1px solid #ddd;
  padding: 1rem;
  overflow-y: auto;
`;

const SidebarTitle = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #c8102e;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserItem = styled.div`
  padding: 10px;
  background: ${(props) => (props.active ? "#c8102e" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.active ? "#b00d22" : "#eee")};
  }
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const MessagesBox = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MessageBubble = styled.div`
  background: ${(props) => (props.isUser ? "#d1fae5" : "#e5e7eb")};
  color: #333;
  padding: 10px 14px;
  border-radius: 20px;
  align-self: ${(props) => (props.isUser ? "flex-start" : "flex-end")};
  max-width: 60%;
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

  &:hover {
    background: #059669;
  }
`;

const ChatUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const connectionRef = useRef();

  const token = localStorage.getItem("token");
  const adminId = "09a2c21a-5087-4619-9bae-36028d2ed607";

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/User`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách users:", err);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Message`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const relevant = res.data.filter(
        (m) =>
          (m.senderId === adminId && m.receiverId === userId) ||
          (m.senderId === userId && m.receiverId === adminId)
      );
      setMessages(relevant);
    } catch (err) {
      console.error("Lỗi lấy tin nhắn:", err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Message`,
        { receiverId: selectedUser.id, message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await connectionRef.current.invoke("SendMessage", selectedUser.id, newMessage);

      setMessages((prev) => [
        ...prev,
        {
          senderId: adminId,
          receiverId: selectedUser.id,
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id);
    }
  }, [selectedUser]);

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
      if (!selectedUser) return;
      if (senderId === selectedUser.id || senderId === adminId) {
        setMessages((prev) => [
          ...prev,
          {
            senderId,
            receiverId: senderId === adminId ? selectedUser.id : adminId,
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    });

    return () => connect.stop();
  }, [selectedUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Wrapper>
      <Sidebar>
        <SidebarTitle>Người dùng</SidebarTitle>
        <UserList>
          {users.map((u) => (
            <UserItem
              key={u.id}
              active={selectedUser?.id === u.id}
              onClick={() => setSelectedUser(u)}
            >
              {u.userName || u.email}
            </UserItem>
          ))}
        </UserList>
      </Sidebar>

      <ChatArea>
        <MessagesBox>
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} isUser={msg.senderId !== adminId}>
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
      </ChatArea>
    </Wrapper>
  );
};

export default ChatUser;
