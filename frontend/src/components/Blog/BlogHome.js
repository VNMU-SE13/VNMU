import React from "react";
import styled from "styled-components";
import BlogHeader from "./BlogHeader";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #fdfaf6;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    gap: 4rem;
    padding: 4rem;
  }
`;

const TextSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transform: translateX(5%);

  @media (max-width: 767px) {
    align-items: center;
    transform: none;
  }
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-family: serif;
  font-weight: 600;
  color: #000;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const Subtext = styled.p`
  font-size: 1.125rem;
  color: #444;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const StartButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
`;

const Illustration = styled.img`
  margin-top: 2rem;
  width: 20rem;

  @media (min-width: 768px) {
    margin-top: 0;
    width: 24rem;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (max-width: 767px) {
    justify-content: center;
  }
`;

const Tag = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  background-color: #f2ebe3;
  color: #5a4634;
  border-radius: 999px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e8e0d3;
  }
`;

const BlogLandingPage = () => {
  return (
    <>
      <BlogHeader />
      <Wrapper>
        <Content>
          <TextSection>
            <Heading>Lịch sử không ngủ quên</Heading>
            <Subtext>Mỗi trang là một thời đại - Nơi để đọc, viết và mở rộng hiểu biết của bạn</Subtext>
            <TagContainer>
              <Tag href="/blog/ancient">🏯 Cổ đại</Tag>
              <Tag href="/blog/medieval">🛡 Trung đại</Tag>
              <Tag href="/blog/early-modern">📜 Cận đại</Tag>
              <Tag href="/blog/modern">🇻🇳 Hiện đại</Tag>
            </TagContainer>
            <StartButton>Bắt đầu đọc</StartButton>
          </TextSection>
          <Illustration src="/image/blog-hero.png" alt="Blog Illustration" />
        </Content>
      </Wrapper>
    </>
  );
};

export default BlogLandingPage;
