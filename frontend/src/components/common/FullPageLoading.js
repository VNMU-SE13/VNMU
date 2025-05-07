import React from "react";
import styled, { keyframes } from "styled-components";

// Animation quay
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Lớp phủ toàn trang
const FullOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

// Spinner giữa trang
const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #e5e7eb;
  border-top: 6px solid #3b82f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const FullPageLoading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <FullOverlay>
      <Spinner />
    </FullOverlay>
  );
};

export default FullPageLoading;
