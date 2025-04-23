import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import videoData from './videoData';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  background-color: #2d1e1a;
  color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 96px;
  gap: 96px;
  animation: ${fadeIn} 0.5s ease;
  position: relative;
`;

const VideoSection = styled.div`
  width: 455px;
  height: 731px;
  border-radius: 12px;
  overflow: hidden;
  background-color: black;
  flex-shrink: 0;
`;

const FullVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 731px;
  overflow-y: auto;
  padding-right: 8px;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 1.5;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 16px;
  font-size: 18px;
  align-items: center;
`;

const ReactionsMenu = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
  background-color: #444;
  border-radius: 20px;
  position: absolute;
  top: -50px;
  left: 0;
  z-index: 10;
  transition: all 0.3s;
`;

const ReactionIcon = styled.span`
  cursor: pointer;
  font-size: 20px;

  &:hover {
    transform: scale(1.3);
  }
`;

const ReactionArea = styled.div`
  position: relative;
  display: inline-block;
`;

const NavigateButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ArrowButton = styled.button`
  background-color: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 999px;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.25s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.08);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: background 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const emojiMap = {
  like: '👍',
  love: '❤️',
  sad: '😢',
  haha: '😆',
};

function VideoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videoData.find((v) => v.id === id);

  const [reaction, setReaction] = useState(null);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [showReactions, setShowReactions] = useState(false);

  const currentIndex = videoData.findIndex((v) => v.id === id);

  const goToPrev = () => {
    if (currentIndex > 0) {
      const prevId = videoData[currentIndex - 1].id;
      navigate(`/descriptionvideo/${prevId}`);
      window.scrollTo(0, 0);
    }
  };

  const goToNext = () => {
    if (currentIndex < videoData.length - 1) {
      const nextId = videoData[currentIndex + 1].id;
      navigate(`/descriptionvideo/${nextId}`);
      window.scrollTo(0, 0);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/descriptionvideo/${id}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  useEffect(() => {
    const savedReaction = localStorage.getItem(`reaction-${id}`);
    const savedLikes = localStorage.getItem(`likes-${id}`);
    if (savedReaction) setReaction(savedReaction);
    if (savedLikes) setLikeCount(parseInt(savedLikes));
  }, [id]);

  useEffect(() => {
    if (reaction) {
      localStorage.setItem(`reaction-${id}`, reaction);
      localStorage.setItem(`likes-${id}`, likeCount.toString());
    } else {
      localStorage.removeItem(`reaction-${id}`);
      localStorage.setItem(`likes-${id}`, likeCount.toString());
    }
  }, [reaction, likeCount, id]);

  if (!video) {
    return (
      <PageWrapper>
        <div>Video không tồn tại.</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <BackButton onClick={() => navigate('/shortvideo')}>&lt;</BackButton>

      <VideoSection>
        <FullVideo key={video.id} controls autoPlay loop>
          <source src={video.src} type="video/mp4" />
        </FullVideo>
      </VideoSection>

      <NavigateButtons>
        <ArrowButton onClick={goToPrev}><FiChevronUp /></ArrowButton>
        <ArrowButton onClick={goToNext}><FiChevronDown /></ArrowButton>
      </NavigateButtons>

      <InfoSection>
        <Description>
          <strong>Người đăng:</strong> {video.author} <br />
          <strong>Mô tả:</strong> {video.description} <br />
          <strong>Bài hát:</strong> {video.song}
        </Description>

        <ActionsRow>
          <ReactionArea
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
          >
            {showReactions && (
              <ReactionsMenu>
                {Object.entries(emojiMap).map(([type, icon]) => (
                  <ReactionIcon
                    key={type}
                    onClick={() => {
                      if (reaction === type) {
                        setReaction(null);
                        setLikeCount((prev) => Math.max(prev - 1, 0));
                      } else {
                        if (reaction) setLikeCount((prev) => Math.max(prev - 1, 0));
                        setReaction(type);
                        setLikeCount((prev) => prev + 1);
                      }
                      setShowReactions(false);
                    }}
                  >
                    {icon}
                  </ReactionIcon>
                ))}
              </ReactionsMenu>
            )}

            <span style={{ cursor: 'pointer' }}>
              {reaction ? emojiMap[reaction] : '👍'} {likeCount}
            </span>
          </ReactionArea>

          <span style={{ cursor: 'pointer' }} onClick={handleShare}>
            📤 Share
          </span>
        </ActionsRow>
      </InfoSection>
    </PageWrapper>
  );
}

export default VideoDetailPage;
