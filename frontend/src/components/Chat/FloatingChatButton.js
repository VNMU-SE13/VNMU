import React, { useState } from "react";
import styled from "styled-components";
import { FaComments } from "react-icons/fa";
import ChatboxAI from "./ChatboxAI";

const Button = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 14px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #388e3c;
  }
`;

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatboxAI onClose={() => setIsOpen(false)} />}
      <Button onClick={() => setIsOpen(!isOpen)}>
        <FaComments size={22} />
      </Button>
    </>
  );
};

export default FloatingChatButton;
