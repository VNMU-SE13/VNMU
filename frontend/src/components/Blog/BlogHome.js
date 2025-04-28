import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import BlogHeader from "./BlogHeader";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";

// Styled Components
const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #fdfaf6;
  display: flex;
  flex-direction: column;
  padding: 60px;
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

// Main Component
const BlogLandingPage = () => {

  const navigate = useNavigate()

  const { language } = useContext(LanguageContext);
  const [translatedText, setTranslatedText] = useState({
    heading: "Lịch sử không ngủ quên",
    subtext: "Mỗi trang là một thời đại - Nơi để đọc, viết và mở rộng hiểu biết của bạn",
    tagAncient: "Cổ đại",
    tagMedieval: "Trung đại",
    tagEarlyModern: "Cận đại",
    tagModern: "Hiện đại",
    startButton: "Bắt đầu đọc"
  });

  useEffect(() => {
    const translateAll = async () => {
      if (language === "vi") {
        setTranslatedText({
          heading: "Lịch sử không ngủ quên",
          subtext: "Mỗi trang là một thời đại - Nơi để đọc, viết và mở rộng hiểu biết của bạn",
          tagAncient: "Cổ đại",
          tagMedieval: "Trung đại",
          tagEarlyModern: "Cận đại",
          tagModern: "Hiện đại",
          startButton: "Bắt đầu đọc"
        });
      } else {
        setTranslatedText({
          heading: await translateText("Lịch sử không ngủ quên", language),
          subtext: await translateText("Mỗi trang là một thời đại - Nơi để đọc, viết và mở rộng hiểu biết của bạn", language),
          tagAncient: await translateText("Cổ đại", language),
          tagMedieval: await translateText("Trung đại", language),
          tagEarlyModern: await translateText("Cận đại", language),
          tagModern: await translateText("Hiện đại", language),
          startButton: await translateText("Bắt đầu đọc", language)
        });
      }
    };

    translateAll();
  }, [language]);

  return (
    <>
      <Header />
      <Wrapper>
        <Content>
          <TextSection>
            <Heading>{translatedText.heading}</Heading>
            <Subtext>{translatedText.subtext}</Subtext>
            <TagContainer>
              <Tag href="/blog/ancient">🏯 {translatedText.tagAncient}</Tag>
              <Tag href="/blog/medieval">🛡 {translatedText.tagMedieval}</Tag>
              <Tag href="/blog/early-modern">📜 {translatedText.tagEarlyModern}</Tag>
              <Tag href="/blog/modern">🇻🇳 {translatedText.tagModern}</Tag>
            </TagContainer>
            <StartButton onClick={() => navigate('/listblog')}>{translatedText.startButton}</StartButton>
          </TextSection>
          <Illustration src="/image/blog-hero.png" alt="Blog Illustration" />
        </Content>
      </Wrapper>
    </>
  );
};

export default BlogLandingPage;
