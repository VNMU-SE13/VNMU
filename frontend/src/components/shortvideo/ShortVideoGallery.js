import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0px rgba(0, 0, 0, 0.1); }
  50% { transform: scale(1.02); box-shadow: 0 0 12px rgba(0, 0, 0, 0.2); }
  100% { transform: scale(1); box-shadow: 0 0 0px rgba(0, 0, 0, 0.1); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 4px #aaa; }
  50% { text-shadow: 0 0 8px #fff; }
  100% { text-shadow: 0 0 4px #aaa; }
`;

// Layout
const PageWrapper = styled.div`
  background-color: #f6f1e7;
  min-height: 100vh;
  display: flex;
`;

// Sidebar
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
  cursor: pointer;
  animation: ${glow} 2s ease-in-out infinite;
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
  padding: 10px 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: linear-gradient(to right, #f0e7cf, #f9f6ec);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transform: translateY(0);

  &:hover {
    background: #e8ddc2;
    font-weight: 600;
    color: #000;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
`;

// Content
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
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  animation: ${pulse} 4s infinite;

  &:hover {
    background-color: #444;
    transform: scale(1.08);
  }
`;

// Video Grid
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

// Pagination
const PaginationBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 20px 0;
`;

const PaginationButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background-color: #2c2c2c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #000;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
    transform: none;
  }
`;

// Constants
const CATEGORIES = ['All', 'Phong Kiến', 'Cận Hiện Đại', 'Trí tuệ nhân tạo'];
const VIDEOS_PER_PAGE = 10;

// Component
function ShortVideoGallery({ videos = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const filteredVideos =
    selectedCategory === 'All'
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const currentVideos = filteredVideos.slice(startIndex, startIndex + VIDEOS_PER_PAGE);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <PageWrapper>
      <Sidebar>
        <SidebarTitle onClick={() => navigate('/')}>
          Khám phá hệ thống<br />VNMU
        </SidebarTitle>
        <SidebarList>
          <SidebarItem onClick={() => navigate('/all-museums')}>Bảo tàng</SidebarItem>
          <SidebarItem>Giai đoạn lịch sử</SidebarItem>
          <SidebarItem onClick={() => navigate('/news')}>Tin tức & Sự kiện</SidebarItem>
          <SidebarItem onClick={() => navigate('/quiz')}>Đố vui</SidebarItem>
          <SidebarItem onClick={() => navigate('/blog')}>Diễn đàn</SidebarItem>
          <SidebarItem>Quà Lưu Niệm</SidebarItem>
        </SidebarList>
      </Sidebar>

      <ContentWrapper>
        <CategoryBar>
          {CATEGORIES.map((cat) => (
            <CategoryButton
              key={cat}
              active={selectedCategory === cat}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryBar>

        <VideoGrid>
          {currentVideos.map((video, index) => (
            <VideoCard key={video.id} onClick={() => navigate(`/descriptionvideo/${video.id}`)}>
              <StyledVideo
                ref={(el) => (videoRefs.current[index] = el)}
                loop
                preload="metadata"
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
                onLoadedData={(e) => e.target.classList.add('loaded')}
              >
                <source src={video.src} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </StyledVideo>
            </VideoCard>
          ))}
        </VideoGrid>

        <PaginationBar>
          <PaginationButton
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            &lt; Quay lại 
          </PaginationButton>
          <PaginationButton
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Tiếp theo &gt;
          </PaginationButton>
        </PaginationBar>
      </ContentWrapper>
    </PageWrapper>
  );
} 

export default ShortVideoGallery;
