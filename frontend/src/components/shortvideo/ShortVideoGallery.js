import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  background-color: #f6f1e7;
  min-height: 100vh;
  display: flex;
`;

const Sidebar = styled.div`
  width: 240px;
  background: linear-gradient(to bottom, #e9dfc7, #f6f1e7);
  padding: 24px 16px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SidebarTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
  font-weight: bold;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  margin-bottom: 12px;
  font-size: 14px;
  color: #444;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s;

  &:hover {
    background-color: #d2c5ae;
    font-weight: 600;
    color: #000;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryBar = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px 0;
  background-color: #f6f1e7;
  width: 100%;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

const CategoryButton = styled.button`
  background-color: ${({ active }) => (active ? '#000' : '#2c2c2c')};
  color: ${({ active }) => (active ? '#fff' : '#fff')};
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #444;
    transform: scale(1.05);
  }
`;

const VideoGrid = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(5, 180px);
  gap: 12px;
  justify-content: center;
`;

const VideoCard = styled.div`
  background-color: #1f1f1f;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease;
  animation: ${fadeIn} 0.5s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  aspect-ratio: 9 / 16;
  object-fit: cover;
  background-color: black;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.loaded {
    opacity: 1;
  }
`;

const CATEGORIES = ['All', 'Phong Kiến', 'Cận Hiện Đại', 'Trí tuệ nhân tạo'];

function ShortVideoGallery({ videos = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const filteredVideos =
    selectedCategory === 'All'
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  videoRefs.current = [];

  return (
    <PageWrapper>
      <Sidebar>
      <SidebarTitle>
      <a href="https://vnmu.vercel.app" target="_blank" rel="noopener noreferrer">
        Khám phá hệ thống VNMU
      </a>
    </SidebarTitle>
        <SidebarList>
          <SidebarItem>Bảo tàng</SidebarItem>
          <SidebarItem>Giai đoạn lịch sử</SidebarItem>
          <SidebarItem>Tin tức & Sự kiện</SidebarItem>
          <SidebarItem>Đố vui</SidebarItem>
          <SidebarItem>Diễn đàn</SidebarItem>
          <SidebarItem>Quà Lưu Niệm</SidebarItem>
        </SidebarList>
      </Sidebar>

      <ContentWrapper>
        <CategoryBar>
          {CATEGORIES.map((cat) => (
            <CategoryButton
              key={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryBar>

        <VideoGrid>
          {filteredVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              onClick={() => navigate(`/descriptionvideo/${video.id}`)}
            >
              <StyledVideo
                ref={(el) => (videoRefs.current[index] = el)}
                loop
                preload="metadata"
                controls={false}
                muted
                onMouseEnter={(e) => {
                  e.target.muted = false;
                  e.target.play().catch(() => {});
                }}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                  e.target.muted = true;
                }}
                onLoadedData={(e) => {
                  e.target.classList.add('loaded');
                }}
              >
                <source src={video.src} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </StyledVideo>
            </VideoCard>
          ))}
        </VideoGrid>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default ShortVideoGallery;
