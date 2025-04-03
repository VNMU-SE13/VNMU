import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom"; // ✅ dùng Link thay thẻ a
import axios from 'axios'

// Styled Components
const NewsEventsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #f5f5dc;
  padding: 40px;
  border-radius: 10px;
  margin-top: 40px;
  gap: 20px;
`;

const NewsHeader = styled.div`
  flex: 1;
  max-width: 300px;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #8b0000;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const SeeAllButton = styled.button`
  background: none;
  border: 2px solid #8b0000;
  color: #8b0000;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #8b0000;
    color: white;
  }
`;

const NewsContent = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-height: 360px;
  margin-left: 150px;
`;

const NewsSlider = styled.div`
  display: flex;
  gap: 20px;
  overflow: hidden;
  flex: 1;
  min-width: 900px;
  position: relative;
  transition: transform 0.5s ease-in-out;
`;

const NewsCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 370px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const NewsImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  color: #8b0000;
  margin-bottom: 5px;
  line-height: 1.2;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #555;
  flex-grow: 1;
  margin-bottom: 6px;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const MuseumName = styled.p`
  font-size: 12px;
  color: #666;
  font-style: italic;
  margin-bottom: 8px;
`;

const ReadMore = styled(Link)`
  color: #8b0000;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  align-self: flex-start;
  transition: color 0.3s ease;

  &:hover {
    color: #555;
  }
`;

const DateLabel = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 12px;
  color: #888;
  font-style: italic;
`;

const ScrollButton = styled.button`
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  &.prev {
    left: -60px;
  }

  &.next {
    right: 90px;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #a00d22;
  }
`;

// Component chính
const NewsEvents = () => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/news");
  };

  const [startIndex, setStartIndex] = useState(0);
  const [events, setEvents] = useState([])
  const itemsPerPage = 3;

  const handleNext = () => {
    if (startIndex + itemsPerPage < events.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7277/api/Event')
        setEvents(response.data)
      } catch (err) {
        console.error('Lỗi khi gọi API:', err)
      }
    }
    fetchData()
  }, [])

  const visibleEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <NewsEventsContainer>
      <NewsHeader>
        <Title>Tin Tức & Sự Kiện</Title>
        <Description>
          Cập nhật các tin tức mới nhất về bảo tàng, sự kiện triển lãm, và những câu chuyện thú vị về các hiện vật lịch sử.
        </Description>
        <SeeAllButton onClick={handleSeeAll}>See All</SeeAllButton>
      </NewsHeader>
      
      <NewsContent>
        <ScrollButton className="prev" onClick={handlePrev} disabled={startIndex === 0}>
          <FaChevronLeft />
        </ScrollButton>

        <NewsSlider>
          {visibleEvents.map((event) => (
            <NewsCard key={event.id}>
              <NewsImage src={event.image} alt={event.name} />
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
              <MuseumName>{event.museum}</MuseumName>
              <ReadMore to={`/news/${event.id}`}>Read More</ReadMore> {/* ✅ điều hướng */}
              <DateLabel>{event.startDate}</DateLabel> {/* ✅ ngày đăng */}
            </NewsCard>
          ))}
        </NewsSlider>

        <ScrollButton className="next" onClick={handleNext} disabled={startIndex + itemsPerPage >= events.length}>
          <FaChevronRight />
        </ScrollButton>
      </NewsContent>
    </NewsEventsContainer>
  );
};

export default NewsEvents;
