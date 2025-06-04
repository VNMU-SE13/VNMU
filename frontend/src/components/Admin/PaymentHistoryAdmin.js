import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../Home/Header';
import axios from 'axios';
import toDateTime from '../../utils/toDateTime';
import FullPageLoading from '../common/FullPageLoading'
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

// Component
const PaymentHistoryAdmin = () => {
  const [loading, setLoading] = useState()
  const [listTransaction, setListTransaction] = useState()
  const [activeTab, setActiveTab] = useState('account');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionAcc, setTransactionAcc] = useState()
  const [transactionSou, setTransactionSou] = useState()
  const itemsPerPage = 5;

  const totalPages = Math.ceil(listTransaction?.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/PaymentTransaction`)
        setTransactionAcc(res.data.slice().reverse())
        const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/PaymentTransactionProduct`)
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

  if (loading) return <FullPageLoading isLoading={true} />
  return (
    <>
      <Header />
      <Container>
        <Card>
          <Title>Lịch sử đơn hàng</Title>
          <SubTitle>Hiển thị thông tin các giao dịch tại VNMU</SubTitle>

          <TabGroup>
            <TabButton active={activeTab === 'account'} onClick={() => handleTabChange('account')}>
              Đơn hàng Tài Khoản
            </TabButton>
            <TabButton active={activeTab === 'souvenir'} onClick={() => handleTabChange('souvenir')}>
              Đơn hàng Quà Lưu Niệm
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
                <Th>Sản phẩm</Th>
                <Th>Số lượng</Th>
                <Th>Tổng tiền</Th>
                <Th>Trạng thái</Th>
              </tr>
            </thead>
            <tbody>
              {listTransaction && listTransaction.map((row, index) => {
                if (index < currentPage*itemsPerPage && index>=(currentPage-1)*itemsPerPage)
                  return (
                <tr key={index}>
                  <Td>{toDateTime(row.created)}</Td>
                  <Td>{row.orderCode}</Td>
                  <Td>Tài khoản premium</Td>
                  <Td>x1</Td>
                  <Td>{activeTab === 'account' ? Number('2000').toLocaleString() + ' ₫' : row.totalPrice.toLocaleString() + ' ₫'}</Td>
                  <Td><Status status={row.status}>{row.status}</Status></Td>
                </tr>
              )})}
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

export default PaymentHistoryAdmin;
