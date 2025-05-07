import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FaLandmark } from "react-icons/fa";
import Header from "../Home/Header";
import souvenirs from "./souvenirdata";

const SouvenirDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = souvenirs.find((s) => s.id === parseInt(id));

    if (!item) return <div>Không tìm thấy hiện vật.</div>;

    return (
        <>
            <Header />
            <Wrapper>
                <BackButton onClick={() => navigate(-1)}>← Quay lại</BackButton>
                <Image src={item.image} alt={item.title} />
                <Info>
                    <Title>{item.title}</Title>
                    <Description>{item.description}</Description>
                    <Museum>
                        <FaLandmark style={{ marginRight: 6 }} />
                        <Link to={`/museums/${item.slug}`}>{item.museum}</Link>
                    </Museum>
                    <InfoText>
                        <strong>Địa chỉ:</strong> {item.address}
                    </InfoText>
                    <InfoText>
                        <strong>Liên hệ:</strong> {item.phone}
                    </InfoText>
                </Info>
            </Wrapper>
        </>
    );
};

export default SouvenirDetail;

// ---------------- STYLED COMPONENTS ---------------- //

const Wrapper = styled.div`
  padding: 180px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const BackButton = styled.button`
  position: absolute;
  top: 120px; /* tăng từ 20px lên 30px */
  left: 30px;
  background: none;
  border: none;
  color: #2563eb;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Image = styled.img`
  width: 400px;
  max-width: 100%;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Info = styled.div`
  max-width: 700px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #4b5563;
  margin-bottom: 12px;
`;

const Museum = styled.div`
  font-size: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;

  a {
    color: #2563eb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
`;
