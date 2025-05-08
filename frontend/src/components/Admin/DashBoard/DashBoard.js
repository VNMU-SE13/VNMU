import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { User, Shield, Image, Landmark } from "lucide-react";
import FullPageLoading from '../../common/FullPageLoading'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DashboardWrapper = styled.div`
  padding: 3rem;
  background-color: #f9fafb;
  font-family: "Segoe UI", sans-serif;
  min-height: 100vh;
`;

const ColoredGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`;

const StatCard = styled.div`
  border-radius: 16px;
  padding: 2rem;
  background: linear-gradient(135deg, #ffffff, #f0f4f8);
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: var(--delay);
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  opacity: 0.08;
`;

const CardNumber = styled.h3`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  color: #1e293b;
`;

const CardTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #475569;
  margin-top: 0.75rem;
`;

const AdminDashboardStats = () => {
  const [loading, setLoading] = useState();
  const [countUser, setCountUser] = useState(0);
  const [countMuseum, setCountMuseum] = useState(0);
  const [countArtifact, setCountArtifact] = useState(0);
  const [countBlog, setCountBlog] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/User`);
        setCountUser(res.data.length);

        res = await axios.get(`${process.env.REACT_APP_API_URL}/Museum`);
        setCountMuseum(res.data.length);

        res = await axios.get(`${process.env.REACT_APP_API_URL}/Artifact`);
        setCountArtifact(res.data.length);

        res = await axios.get(`${process.env.REACT_APP_API_URL}/Blog`);
        setCountBlog(res.data.length);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (loading) return <FullPageLoading isLoading={true} />;

  const cards = [
    { icon: <User size={56} />, number: countUser, title: "Người dùng", delay: "0.1s" },
    { icon: <Image size={56} />, number: countArtifact, title: "Hiện vật", delay: "0.2s" },
    { icon: <Landmark size={56} />, number: countMuseum, title: "Bảo tàng", delay: "0.3s" },
    { icon: <Shield size={56} />, number: countBlog, title: "Bài viết", delay: "0.4s" },
  ];

  return (
    <DashboardWrapper>
      <h2 style={{ marginBottom: "2rem", fontSize: "1.5rem", fontWeight: "700", color: "#1f2937" }}>
        📊 Thống kê hệ thống
      </h2>
      <ColoredGrid>
        {cards.map((card, index) => (
          <StatCard key={index} style={{ '--delay': card.delay }}>
            <CardIcon>{card.icon}</CardIcon>
            <CardNumber>{card.number}</CardNumber>
            <CardTitle>{card.title}</CardTitle>
          </StatCard>
        ))}
      </ColoredGrid>
    </DashboardWrapper>
  );
};

export default AdminDashboardStats;