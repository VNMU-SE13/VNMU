import React from "react";
import styled, { keyframes } from "styled-components";

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Wrapper for the component area
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px; /* có thể tùy chỉnh để giữ không gian khi loading */
`;

// Spinner hiển thị khi loading
const Spinner = styled.div`
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingWrapper = ({ isLoading, children }) => {
  return (
    <Wrapper>
      {isLoading ? <Spinner /> : children}
    </Wrapper>
  );
};

export default LoadingWrapper;
