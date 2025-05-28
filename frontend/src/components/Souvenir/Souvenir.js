import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaLandmark } from "react-icons/fa";
import Header from "../Home/Header";
import souvenirs from "./souvenirdata";
import { Link } from "react-router-dom";
import axios from "axios";
import FullPageLoading from "../common/FullPageLoading";


const Souvenir = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [listProduct, setListProduct] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Product`)
        setListProduct(res.data)
        console.log(res.data)
      }
      catch(err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalPages = Math.ceil(souvenirs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = souvenirs.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <FullPageLoading isLoading={true} />
  return (
    <>
      <Header />
      <TitleHeader>Một số quà lưu niệm của các bảo tàng</TitleHeader>
      <Container>
        {currentItems.map((item) => (
          <Card key={item.id}>
            <Image src={item.image} alt={item.title} />
            <Content>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              <Museum>
                <FaLandmark style={{ marginRight: 6 }} />
                {item.museum}
              </Museum>
              <DetailLink to={`/souvenir/${item.id}`}>
                <Button>Xem chi tiết</Button>
              </DetailLink>


            </Content>
          </Card>
        ))}
      </Container>

      <Pagination>
        <PageButton
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Trang trước
        </PageButton>
        <PageNumber>
          Trang {currentPage} / {totalPages}
        </PageNumber>
        <PageButton
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </PageButton>
      </Pagination>
    </>
  );
};

export default Souvenir;

// ---------------- STYLED COMPONENTS ---------------- //

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 50px 30px 30px 30px;
`;

const Card = styled.div`
  width: 280px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 10px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;       /* Số dòng muốn hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Museum = styled.div`
  font-size: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Button = styled.button`
  margin-top: auto;
  align-self: center; /* căn giữa theo chiều ngang */
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #1e40af;
  }
`;
const TitleHeader = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #1e3a8a;
  margin: 40px 30px 10px 30px;
  padding-top: 90px;
  text-align: center;
  position: relative;
  background: linear-gradient(90deg, #2563eb, #1e3a8a, #2563eb);
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: shimmer 3s linear infinite;

  @keyframes shimmer {
    0% {
      background-position: 0% center;
    }
    100% {
      background-position: 200% center;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  gap: 20px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  background-color: #e5e7eb;
  color: #111827;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #d1d5db;
  }
`;

const PageNumber = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
`;
const DetailLink = styled(Link)`
  align-self: center;
  text-decoration: none;
  width: fit-content;
`;