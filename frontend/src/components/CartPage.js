import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Home/Header";
import FullPageLoading from "./common/FullPageLoading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [loading, setLoading] = useState()
  const [cartItems, setCartItems] = useState()
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [updateItems, setUpdateItems] = useState([])



  const selectedTotal = selectedItems.reduce(
    (sum, id) => {
      const item = cartItems?.find(i => i.id === id);
      return item ? sum + item.product.point * item.quatity : sum;
    }, 
    0
  );



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Cart/GetByUserId`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setCartItems(res.data[0]?.cartItems)
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

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/CartItem/${cartItemId}`);
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const isAllSelected = cartItems?.length > 0 && selectedItems.length === cartItems.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const handleCheckout = () => {
    const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id));
    navigate("/checkout", { state: { selectedCartItems } });
  };




  if (loading) return <FullPageLoading isLoading={true} />
  return (
    <>
      <Header />
      <Wrapper>
        <CartContainer>
          <Table>
            <thead>
              <tr>
                <Th>Select All</Th>
                <Th>Delete</Th>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Subtotal</Th>
              </tr>
            </thead>
            <tbody>
              <Th><input type="checkbox" onChange={handleSelectAll} checked={isAllSelected} /></Th>
              {cartItems && cartItems.map((item, index) => {
                const { id, product, quatity } = item;
                const subtotal = product.point * quatity;

                return (
                  <Tr key={id}>
                    <Td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(id)}
                        onChange={() => handleSelectItem(id)}
                      />
                    </Td>

                    <Td><RemoveButton onClick={() => handleRemoveItem(id)}>×</RemoveButton></Td>
                    <TdProduct>
                      <ProductImage src={product.image} alt={product.name} />
                      <ProductName>{product.name}</ProductName>
                    </TdProduct>
                    <Td>{product.point.toLocaleString()} ₫</Td>
                    <Td>
                      <QuantityInput type="number" defaultValue={quatity} min={1} />
                    </Td>
                    <Td>{subtotal.toLocaleString()} ₫</Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>

          <ActionRow>
            <CouponWrapper>
              <CouponInput placeholder="Coupon code" />
              <BlackButton>Apply coupon</BlackButton>
            </CouponWrapper>
            <BlackButton>Update cart</BlackButton>
          </ActionRow>

          <TotalSection>
            <Title>Cart totals</Title>
            <TotalRow>
              <span>Subtotal</span>
              <span>{selectedTotal.toLocaleString()} ₫</span>
            </TotalRow>
            <TotalRow>
              <strong>Total</strong>
              <strong>{selectedTotal.toLocaleString()} ₫</strong>
            </TotalRow>

            <CheckoutButton disabled={selectedItems.length === 0} onClick={handleCheckout}>
              Proceed to checkout →
            </CheckoutButton>

          </TotalSection>

        </CartContainer>
      </Wrapper>
    </>
  );
};

export default CartPage;


const Wrapper = styled.div`
  padding: 60px 20px;
  background: linear-gradient(180deg, #fdfdfd 0%, #f4f4f4 100%);
  min-height: 100vh;
`;

const CartContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
`;

const Th = styled.th`
  text-align: left;
  font-size: 14px;
  color: #374151;
  padding: 16px 12px;
  border-bottom: 2px solid #e5e7eb;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 16px 12px;
  font-size: 15px;
  vertical-align: middle;
`;

const TdProduct = styled(Td)`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProductImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const ProductName = styled.span`
  color: #111827;
  font-weight: 500;
  text-decoration: underline;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 6px;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const RemoveButton = styled.button`
  font-size: 22px;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-weight: bold;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
`;

const CouponWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const CouponInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  min-width: 200px;
`;

const BlackButton = styled.button`
  background: #111827;
  color: white;
  padding: 10px 20px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #000;
  }
`;

const TotalSection = styled.div`
  max-width: 360px;
  margin-left: auto;
  border: 1px solid #e5e7eb;
  padding: 30px;
  border-radius: 12px;
  background: #fafafa;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 24px;
  color: #1f2937;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
`;

const CheckoutButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #6366f1, #3b82f6);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);

  &:hover {
    background: linear-gradient(135deg, #4f46e5, #2563eb);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(59, 130, 246, 0.45);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

