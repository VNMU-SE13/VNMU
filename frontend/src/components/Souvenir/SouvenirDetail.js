import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../Home/Header';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import FullPageLoading from '../common/FullPageLoading';

const SouvenirDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()
  const [loading, setLoading] = useState()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async (item) => {
    if (!localStorage.getItem('token')) {
        return Swal.fire({
        icon: 'warning',
        title: 'Bạn chưa đăng nhập!',
        text: 'Vui lòng đăng nhập trước.',
        confirmButtonColor: '#f15c22',
        });
    }
    
    try {
      setLoading(true)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/CartItem`, {
        cartId:  localStorage.getItem('cartId'),
        productId: product.id,
        quatity: quantity
      })
      Swal.fire("🛒 Đã thêm vào giỏ!", `${item.name} đã được thêm vào giỏ hàng.`, "success");
    }
    catch(err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  };

  const handleBuyNow = () => {
    Swal.fire('Cảm ơn bạn đã đặt hàng!', '', 'success');
  };

  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product || loading) return <FullPageLoading isLoading={true} />;

  return (
    <>
      <Header />
      <Wrapper>
        <ImageSection>
          <ProductImage src={product.image} alt={product.title} />
        </ImageSection>
        <InfoSection>
          <Category>{product.category || ''}</Category>
          <ProductTitle>{product.name}</ProductTitle>
          <Price>
            <NewPrice>{Number(product.point * quantity).toLocaleString()} ₫</NewPrice>
          </Price>

          <QuantityWrapper>
            <label>Số Lượng</label>
            <QuantityControl>
              <button onClick={decrease}>−</button>
              <span>{quantity}</span>
              <button onClick={increase}>+</button>
            </QuantityControl>
          </QuantityWrapper>

          <ButtonGroup>
            <BuyButton onClick={handleBuyNow}>Mua ngay</BuyButton>
            <AddCartButton onClick={handleAddToCart}>Thêm vào giỏ hàng</AddCartButton>
          </ButtonGroup>

          <Description>
            <strong>Mô tả sản phẩm:</strong><br />
            {product.description || 'Chiếc móc khóa nhỏ gọn với mô hình xe tăng T-54 – biểu tượng chiến thắng trong chiến dịch Hồ Chí Minh.'}
          </Description>
        </InfoSection>
        <BackButton onClick={() => navigate(-1)}> Quay lại</BackButton>
      </Wrapper>

    </>
  );
};

export default SouvenirDetail;

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  padding: 100px 80px 60px;
  background-color: #f3f6fb;
  align-items: flex-start;
  min-height: 100vh;
`;

const ImageSection = styled.div`
  flex: 1;
  max-width: 500px;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: contain;
  border: 1px solid #ddd;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  margin: 10px 0;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NewPrice = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #dc2626;
`;

const OldPrice = styled.div`
  font-size: 18px;
  color: #9ca3af;
  text-decoration: line-through;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 10px;

  label {
    margin-right: 12px;
    font-size: 15px;
    color: #374151;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;

  button {
    width: 36px;
    border: none;
    background: white;
    color: #dc2626;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
  }

  span {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #dc2626;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin: 20px 0;
`;

const BuyButton = styled.button`
  background-color: #dc2626;
  color: white;
  padding: 12px 24px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b91c1c; /* đỏ đậm hơn */
  }
`;

const AddCartButton = styled.button`
  background-color: #dc2626;
  color: white;
  border: 2px solid;
  padding: 12px 24px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b91c1c;;
`;

const Description = styled.div`
  font-size: 15px;
  line-height: 1.6;
`;

const BackButton = styled.button`
  margin: 30px 80px 0;
  padding: 10px 20px;
  font-size: 15px;
  color: #374151;
  background-color:rgb(255, 2, 2);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1d5db;
  }

  &::before {
    content: '←';
    font-size: 18px;
  }
`;

