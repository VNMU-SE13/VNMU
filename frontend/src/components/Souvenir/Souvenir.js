import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaLandmark } from "react-icons/fa";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import FullPageLoading from "../common/FullPageLoading";
import Swal from 'sweetalert2'


const Souvenir = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1)
  const [listProduct, setListProduct] = useState()
  const [loading, setLoading] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Product`)
        setListProduct(res.data)
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

  const openQuantityModal = (productId) => {
    setSelectedProductId(productId)
    setSelectedQuantity(1)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedProductId(null)
  }

  const confirmAddToCart = () => {
    handleAddCart(selectedProductId, selectedQuantity)
    closeModal()
  }

  const handleAddCart = async (id, quantity) => {
    try {
      setLoading(true)
      console.log(quantity)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/CartItem`, {
        cartId: localStorage.getItem('cartId'),
        productId: id,
        quatity: quantity
      })

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Đã thêm vào giỏ hàng!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Thêm vào giỏ hàng thất bại!',
        text: 'Vui lòng thử lại sau.',
      })
    }
    finally {
      setLoading(false)
    }
  }

  if (loading || !listProduct) return <FullPageLoading isLoading={true} />
  return (
    <>
      <Header />
      <TitleHeader>Một số quà lưu niệm của các bảo tàng</TitleHeader>
      <Container>
        {listProduct.map((item, index) => {
          if (index >= itemsPerPage*(currentPage-1) && index < itemsPerPage*currentPage)
          return (
          <Card key={item.id}>
            <Image src={item.image} alt={item.title} />
            <Content>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              <Museum>
                <FaLandmark style={{ marginRight: 6 }} />
                {item.museum}
              </Museum>
              <ButtonGroup>
                {/* <DetailLink to={`/souvenir/${item.id}`}>
                  <Button>Xem chi tiết</Button>
                </DetailLink> */}
                <DetailLink>
                  <Button onClick={() => openQuantityModal(item.id)}>Thêm vào giỏ hàng</Button>
                </DetailLink>
                <DetailLink to={`/souvenir/${item.id}`}>
                  <Button>Mua ngay</Button>
                </DetailLink>
              </ButtonGroup>



            </Content>
          </Card>
        )})}
      </Container>
      {/* Modal chọn số lượng */}
      <ModalOverlay show={modalOpen}>
        <ModalContent>
          <h2>Chọn số lượng</h2>
          <QuantityInput
            type="number"
            min="1"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          />
          <ButtonGroupModal>
            <ModalButton onClick={confirmAddToCart}>Xác nhận</ModalButton>
            <ModalButton variant="cancel" onClick={closeModal}>Hủy</ModalButton>
          </ButtonGroupModal>
        </ModalContent>
      </ModalOverlay>

      <Pagination>
        <PageButton
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Trang trước
        </PageButton>
        <PageNumber>
          Trang {currentPage} / {Math.ceil(listProduct.length / itemsPerPage)}
        </PageNumber>
        <PageButton
          onClick={() => setCurrentPage((p) => Math.min(p + 1, Math.ceil(listProduct.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(listProduct.length / itemsPerPage)}
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
  font-size: 12px;

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: auto;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`

// Overlay mờ
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 999;
`

// Hộp nội dung modal
const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in-out;
  text-align: center;
`

// Input số lượng
const QuantityInput = styled.input`
  width: 80px;
  padding: 10px;
  font-size: 16px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  margin-top: 16px;
  text-align: center;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`

// Nhóm nút
const ButtonGroupModal = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 12px;
`

// Nút xác nhận / hủy
const ModalButton = styled.button`
  padding: 10px 18px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  min-width: 100px;
  transition: background-color 0.2s ease;

  ${({ variant }) =>
    variant === 'cancel'
      ? `
        background-color: #ccc;
        color: #333;

        &:hover {
          background-color: #bbb;
        }
      `
      : `
        background-color: #007bff;
        color: white;

        &:hover {
          background-color: #0056b3;
        }
      `}
`
