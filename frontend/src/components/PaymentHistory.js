import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Home/Header';
import axios from 'axios';
import toDateTime from '../utils/toDateTime';
import FullPageLoading from './common/FullPageLoading';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  background: #fff;
  width: 90%;
  max-width: 520px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: fadeInScale 0.3s ease-out forwards;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 26px;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const ModalContent = styled.div`
  padding: 24px;
`;

const ModalItem = styled.p`
  font-size: 16px;
  margin: 12px 0;
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  text-align: right;
  background: #f1f3f5;
  border-top: 1px solid #e9ecef;
`;

const ActionButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 18px;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }
`;

// Layout container
const Container = styled.div`
  margin-top: 100px;
  padding: 30px 20px;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  background: #fff;
  width: 100%;
  max-width: 1200px;
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 6px;
  color: #111;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

// Tabs
const TabGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 999px;
  border: none;
  background-color: ${props => (props.active ? '#007bff' : '#f2f2f2')};
  color: ${props => (props.active ? '#fff' : '#333')};
  font-weight: 600;
  box-shadow: ${props => (props.active ? '0 4px 12px rgba(0, 123, 255, 0.2)' : 'none')};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#e4e4e4')};
  }
`;

// Filters
const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 160px;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  transition: 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Table
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
`;

const Th = styled.th`
  background: #f9fafb;
  padding: 14px 12px;
  text-align: left;
  border-bottom: 2px solid #eee;
`;

const Td = styled.td`
  padding: 14px 12px;
  border-bottom: 1px solid #f1f1f1;
`;

const Status = styled.span`
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 13px;
  background-color: ${props => {
    switch (props.status) {
      case 'PAID': return '#d7f5e9';
      case 'PENDING': return '#fff3cd';
      case 'CANCELLED': return '#f8d7da';
      case 'Đang Giao': return '#e0f0ff';
      case 'Đã Giao': return '#d1f0d1';
      case 'Đã Hủy': return '#fdecea';
      default: return '#eee';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'PAIDED': return '#28a745';
      case 'PENDING': return '#e69500';
      case 'CANCELED': return '#dc3545';
      case 'Đang Giao': return '#007bff';
      case 'Đã Giao': return '#198754';
      case 'Đã Hủy': return '#c82333';
      default: return '#333';
    }
  }};
`;

// Link
const Link = styled.a`
  color: #007bff;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// Pagination
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: ${props => (props.active ? '#007bff' : '#fff')};
  color: ${props => (props.active ? '#fff' : '#333')};
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#f5f5f5')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const DetailButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// Component
const PaymentHistory = () => {
  const [loading, setLoading] = useState()
  const [listTransaction, setListTransaction] = useState()
  const [activeTab, setActiveTab] = useState('account');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionAcc, setTransactionAcc] = useState()
  const [transactionSou, setTransactionSou] = useState()
  const itemsPerPage = 5;
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const totalPages = Math.ceil(listTransaction?.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/PaymentTransaction/GetByUserId`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        setTransactionAcc(res.data.slice().reverse())
        const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/Order/GetByUserId`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        setTransactionSou(res2.data.reverse())
        setListTransaction(res.data.reverse())
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

  const handleTabChange = (tab) => {
    tab === 'account' ? setListTransaction(transactionAcc) : setListTransaction(transactionSou)
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleViewOrderDetail = async (orderCode, totalFee) => {
      try {
        setLoading(true)
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/Ghn/order-detail`, `"${orderCode}"`, {
          headers: {
            'Content-Type': 'application/json-patch+json',
          }
        })
        setSelectedOrderDetail({...res.data.data, totalFee, orderCode}); 
        setIsModalOpen(true); 
      }
      catch(err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }

  if (loading) return <FullPageLoading isLoading={true} />
  return (
    <>
      <Header />
      <Container>
        <Card>
          <Title>Lịch sử đơn hàng</Title>
          <SubTitle>Hiển thị thông tin các giao dịch của bạn tại VNMU</SubTitle>

          <TabGroup>
            <TabButton active={activeTab === 'account'} onClick={() => handleTabChange('account')}>
              Giao dịch Tài Khoản
            </TabButton>
            <TabButton active={activeTab === 'souvenir'} onClick={() => handleTabChange('souvenir')}>
              Giao dịch Quà Lưu Niệm
            </TabButton>
          </TabGroup>

          <FilterRow>
            <Input placeholder="Mã đơn hàng" />
            <Input placeholder="Số tiền từ" />
            <Input placeholder="Số tiền đến" />
            <Input type="date" />
            <Input type="date" />
            <Button>Lọc</Button>
          </FilterRow>

          <Table>
            <thead>
              <tr>
                <Th>Thời gian</Th>
                <Th>Mã đơn hàng</Th>
                {activeTab === 'account' ? <Th>Sản phẩm</Th> : <Th></Th>}
                {activeTab === 'account' ? <Th>Số lượng</Th> :<Th></Th>}
                <Th>Tổng tiền</Th>
                <Th>Trạng thái</Th>
                {activeTab === 'souvenir' ? <Th>Chi tiết</Th> :<Th></Th>}
              </tr>
            </thead>
            <tbody>
              {listTransaction && listTransaction.map((row, index) => {
                if (index < currentPage*itemsPerPage && index>=(currentPage-1)*itemsPerPage)
                  return (
                <tr key={index}>
                  <Td>{activeTab === 'account' ? toDateTime(row.created) : toDateTime(row.createdAt)}</Td>
                  <Td>{row.orderCode}</Td>
                  {activeTab === 'account' ? <Td>Tài khoản premium</Td> : <Th></Th>}
                  {activeTab === 'account' ? <Td>x1</Td> :<Th></Th>}
                  
                  <Td>{activeTab === 'account' ? Number('2000').toLocaleString() + ' ₫' : row.totalAmount.toLocaleString() + ' ₫'}</Td>
                  <Td><Status status={row.status}>{row.status}</Status></Td>

                  {activeTab === 'souvenir' ? (<Td>
                    <DetailButton onClick={() => handleViewOrderDetail(row.orderCode, row.totalAmount)}>
                      Chi tiết
                    </DetailButton>
                  </Td>) : <Td></Td>}
                </tr>
              )})}
               {isModalOpen && selectedOrderDetail && (
                <ModalOverlay>
                  <ModalWrapper>
                    <ModalHeader>
                      <ModalTitle>Chi tiết đơn hàng</ModalTitle>
                      <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
                    </ModalHeader>

                    <ModalContent>
                      <ModalItem><strong>Mã đơn hàng:</strong> {selectedOrderDetail.orderCode}</ModalItem>
                      <ModalItem><strong>Trạng thái:</strong> {selectedOrderDetail.status}</ModalItem>
                      <ModalItem><strong>Người nhận:</strong> {selectedOrderDetail.to_name}</ModalItem>
                      <ModalItem><strong>Địa chỉ:</strong> {selectedOrderDetail.to_address}</ModalItem>
                      <ModalItem><strong>SĐT:</strong> {selectedOrderDetail.to_phone}</ModalItem>
                      <ModalItem><strong>Sản phẩm:</strong></ModalItem>
                      {selectedOrderDetail?.items?.map(item => <ModalItem>{item.name} x {item.quantity}</ModalItem>)}
                      <ModalItem><strong>Tổng tiền:</strong> {selectedOrderDetail.totalFee?.toLocaleString()} ₫</ModalItem>
                    </ModalContent>

                    <ModalFooter>
                      <ActionButton onClick={() => setIsModalOpen(false)}>Đóng</ActionButton>
                    </ModalFooter>
                  </ModalWrapper>
                </ModalOverlay>
              )}
            </tbody>
          </Table>

          <Pagination>
            <PageButton onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>«</PageButton>
            {Array.from({ length: totalPages }, (_, i) => (
              <PageButton key={i + 1} onClick={() => setCurrentPage(i + 1)} active={currentPage === i + 1}>
                {i + 1}
              </PageButton>
            ))}
            <PageButton onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>»</PageButton>
          </Pagination>
        </Card>
      </Container>
    </>
  );
};

export default PaymentHistory;
