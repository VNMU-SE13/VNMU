import styled from "styled-components";
import Header from "./Home/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import FullPageLoading from "./common/FullPageLoading";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCartItems = location.state?.selectedCartItems || [];

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState()
  const [shippingFee, setShippingFee] = useState()
  const [errMsg, setErrMsg] = useState()

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedWardId, setSelectedWardId] = useState()
  const [selectedDistrictId, setSelectedDistrictId] = useState()

  const [formData, setFormData] = useState({});

  const total = selectedCartItems.reduce((sum, item) => sum + item.product.point * item.quatity, 0) + shippingFee;


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ADDRESS}/?depth=1`)
      .then((res) => setProvinces(res.data))
      .catch((err) => console.error("Failed to load provinces", err));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios.get(`${process.env.REACT_APP_API_ADDRESS}/p/${selectedProvince}?depth=2`)
        .then((res) => setDistricts(res.data.districts))
        .catch((err) => console.error("Failed to load districts", err));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`${process.env.REACT_APP_API_ADDRESS}/d/${selectedDistrict}?depth=2`)
        .then((res) => setWards(res.data.wards))
        .catch((err) => console.error("Failed to load wards", err));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedWard) {
      const wardName = wards.find(ward => ward.code == selectedWard).name
      const districtName = districts.find(district => district.code == selectedDistrict).name
      const fetchData = async () => {
        try {
          setLoading(true)
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/Ghn/ReturnId?districtName=${encodeURIComponent(districtName)}&wardName=${encodeURIComponent(wardName)}`)
          setSelectedWardId(res.data.wardCode)
          setSelectedDistrictId(res.data.districtId)
          const res2 = await axios.post(`${process.env.REACT_APP_API_URL}/Ghn/calculate-fee-byId`, {
            toDistrictId: res.data.districtId,
            toWardCode: res.data.wardCode
          })
          setShippingFee(res2.data.data.service_fee)
        }
        catch(err) {
          console.log(err)
        }
        finally {
          setLoading(false)
        }
      }

      fetchData()
      
    }
  },[selectedWard])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  function isValidPhoneNumber(phone) {
    // Regex kiểm tra số điện thoại Việt Nam hợp lệ
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    return phoneRegex.test(phone);
  }

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.phone || !selectedDistrictId || !selectedWardId || !formData.address) {
      alert("Please fill in all billing details.");
      return;
    }

    if (!isValidPhoneNumber(formData.phone)) {
      setErrMsg('Số điện thoại không hợp lệ!')
      return;
    }
    else {
      setErrMsg('')
    }

    const orderData = {
      toName: formData.name,
      toPhone: formData.phone,
      toAddress: formData.address,
      toWardCode: selectedWardId,
      toDistrictId: Number(selectedDistrictId),
      productNames: selectedCartItems.map(item => ({
        name: item.product.name,
        quantity: item.quatity,
        price: item.product.point
      })),
    };

    try {
      setLoading(true)
      // create order ghn
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/Ghn/create-order-byRequest`, orderData, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      });
      // create order
      const response2 = await axios.post(`${process.env.REACT_APP_API_URL}/Order`, {
        orderCode: response.data.data.order_code,
        totalAmount: total
      }, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      const orderId = response2.data.id
      // add order item
      await Promise.all(
        selectedCartItems.map(item =>
          axios.post(`${process.env.REACT_APP_API_URL}/OrderItem`, {
            orderId: orderId,
            productId: item.product.id,
            quatity: item.quatity,
            priceAtPurchase: item.quatity * item.product.point
          })
        )
      );
      // create payment
      const listProduct = selectedCartItems.map(item => {
        return {
          name: item.product.name,
          price: item.product.point,
          quantity: item.quatity
        }
      })
      const resCheckout = await axios.post(`${process.env.REACT_APP_API_URL}/PayOs/create-payment-forProduct`, {
        successUrl: 'http://localhost:3000/',
        cancelUrl: 'http://localhost:3000/payment-success',
        orderId: orderId,
        items: listProduct,
        totalPrice: total
      }, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })

      if(resCheckout.status === 200) {
        window.location.href = resCheckout.data.checkoutUrl
      }

    } catch (error) {
      console.error("Order Error:", error.response);
      alert("An error occurred while placing the order: "+ error.response.data.details);
    }
    finally {
      setLoading(false)
    }
  };

  if (loading) return <FullPageLoading isLoading={true} />
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <Section>
            <Title>Billing Details</Title>
            <Form>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
              <Label>Phone</Label>
              <Input
                type="tel"
                name="phone"
                placeholder="0123456789"
                value={formData.phone}
                onChange={handleChange}
              />
              <span style={{"color": "red"}}>{errMsg}</span>
              <Label>Province / City</Label>
                <select value={selectedProvince} onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedDistrict("");
                  setSelectedDistrictId("")
                  setSelectedWard("");
                  setSelectedWardId("")
                }}>
                  <option value="">Select Province</option>
                  {provinces.map((p) => (
                    <option key={p.code} value={p.code}>{p.name}</option>
                  ))}
                </select>

                <Label>District</Label>
                <select value={selectedDistrict} onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedWard("");
                  setSelectedWardId("")
                }}>
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.code} value={d.code}>{d.name}</option>
                  ))}
                </select>

                <Label>Ward</Label>
                <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                  <option value="">Select Ward</option>
                  {wards.map((w) => (
                    <option key={w.code} value={w.code}>{w.name}</option>
                  ))}
                </select>

                <Label>Street Address</Label>
                <Input 
                  type="text" 
                  placeholder="123 Street" 
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                />

            </Form>
          </Section>

          

          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>

            {selectedCartItems.map((item) => (
              <SummaryRow key={item.id}>
                <span>{item.product.name} x {item.quatity}</span>
                <strong>{(item.product.point * item.quatity).toLocaleString()} ₫</strong>
              </SummaryRow>
            ))}

            <SummaryRow>
              <span>Subtotal</span>
              <strong>{total.toLocaleString()} ₫</strong>
            </SummaryRow>

            <SummaryRow>
              <span>Shipping</span>
              <strong>{shippingFee ? Number(shippingFee).toLocaleString() + 'đ' : 'Free'}</strong>
            </SummaryRow>

            <SummaryRow>
              <strong>Total</strong>
              <TotalAmount>{total.toLocaleString()} ₫</TotalAmount>
            </SummaryRow>

            <PlaceOrderButton onClick={handlePlaceOrder}>
              Place Order →
            </PlaceOrderButton>
          </OrderSummary>
        </Container>
      </Wrapper>
    </>
  );
};

export default CheckoutPage;

// Styled Components (unchanged from your original code)
const Wrapper = styled.div`
  padding: 60px 20px;
  background: linear-gradient(180deg, #fdfdfd 0%, #f4f4f4 100%);
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  color: #1f2937;
`;

const Label = styled.label`
  font-size: 14px;
  margin: 8px 0 4px;
  color: #374151;
`;

const Input = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  margin-bottom: 12px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    color: #111827;
  }
`;

const Radio = styled.input`
  width: 18px;
  height: 18px;
`;

const OrderSummary = styled.div`
  border: 1px solid #e5e7eb;
  padding: 30px;
  border-radius: 12px;
  background: #fafafa;
  height: fit-content;
`;

const SummaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  font-size: 16px;
`;

const TotalAmount = styled.strong`
  color: #111827;
  font-size: 18px;
`;

const PlaceOrderButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #6366f1, #3b82f6);
  color: white;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);

  &:hover {
    background: linear-gradient(135deg, #4f46e5, #2563eb);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(59, 130, 246, 0.45);
  }

  &:active {
    transform: scale(0.98);
  }
`;
