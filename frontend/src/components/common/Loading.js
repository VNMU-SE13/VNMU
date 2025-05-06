import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.2); // xám trong suốt
  backdrop-filter: blur(4px); // làm mờ nền sau
  -webkit-backdrop-filter: blur(4px); // cho Safari
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Spinner = styled.div`
  border: 6px solid #eee;
  border-top: 6px solid #f59e0b;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
`;

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
};

export default Loading;
