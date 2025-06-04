import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import FullPageLoading from '../common/FullPageLoading'
import axios from 'axios'

const accountOrders = [
  { time: '2025-05-09', id: '8097357', product: 'Canva Pro', qty: 1, price: '25.000đ', status: 'PAIDED', userName: 'Nguyễn Văn A' },
  { time: '2025-05-02', id: '8075939', product: 'ChatGPT Plus', qty: 1, price: '20.000đ', status: 'PAIDED', userName: 'Trần Thị B' },
  { time: '2025-04-30', id: '8067432', product: 'Canva Pro', qty: 1, price: '25.000đ', status: 'PENDING', userName: 'Lê Văn C' },
];

const souvenirOrders = [
  { time: '2025-05-05', id: '9051234', product: 'Móc khóa VNMU', qty: 2, price: '60.000đ', status: 'Đang Giao', userName: 'Trịnh Thị F' },
  { time: '2025-04-25', id: '9044321', product: 'Sổ tay', qty: 1, price: '45.000đ', status: 'Đã Giao', userName: 'Đặng Văn G' },
  { time: '2025-04-20', id: '9041122', product: 'Áo thun VNMU', qty: 1, price: '120.000đ', status: 'Đã Hủy', userName: 'Ngô Thị H' },
];

const parsePrice = price => Number(price.replace(/\./g, '').replace('đ', '').trim());

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4'];

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '24px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
};

const PaymentStatic = () => {
  const [orders, setOrders] = useState()
  const [products, setProducts] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // fetch order
        const resOrder = await axios.get(`${process.env.REACT_APP_API_URL}/Order`)
        setOrders(resOrder.data)
        // fetch product
        const resProduct = await axios.get(`${process.env.REACT_APP_API_URL}/Product`)
        setProducts(resProduct.data)
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

  const [activeTab, setActiveTab] = useState('summary');
  const allOrders = [...accountOrders, ...souvenirOrders];

  const totalRevenue = orders?.reduce((sum, order) => {
    const price = order.totalAmount;
    return ['PAIDED'].includes(order.status) ? sum + price : sum;
  }, 0);

  const totalOrderCount = orders?.length;
  const totalQuantity = products?.length;

  const statusStats = ['PAIDED', 'PENDING', 'CANCELED', 'Đang Giao', 'Đã Giao', 'Đã Hủy'].map(status => ({
    status,
    count: allOrders.filter(o => o.status === status).length
  }));

  const statusPieData = [
    {
      name: 'Đơn thành công',
      value: statusStats.filter(s => ['PAIDED', 'Đang Giao', 'Đã Giao'].includes(s.status)).reduce((sum, s) => sum + s.count, 0),
    },
    {
      name: 'Đơn đang xử lý',
      value: statusStats.find(s => s.status === 'PENDING')?.count || 0,
    },
    {
      name: 'Đơn bị hủy',
      value: statusStats.filter(s => ['CANCELED', 'Đã Hủy'].includes(s.status)).reduce((sum, s) => sum + s.count, 0),
    },
  ];

  const monthStats = {};
  allOrders.forEach(order => {
    const month = order.time.slice(0, 7);
    if (!monthStats[month]) monthStats[month] = 0;
    if (['PAIDED', 'Đang Giao', 'Đã Giao'].includes(order.status)) {
      monthStats[month] += parsePrice(order.price);
    }
  });
  const revenueByMonth = Object.entries(monthStats).map(([month, revenue]) => ({ month, revenue }));

  const productCount = {};
  allOrders.forEach(order => {
    const key = order.product;
    if (!productCount[key]) productCount[key] = 0;
    productCount[key] += order.qty;
  });
  const topProducts = Object.entries(productCount)
    .map(([product, qty]) => ({ product, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  if(loading) return <FullPageLoading isLoading={true} />
  return (
    <div style={{ padding: 40, fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f8f9fa' }}>
      <h2 style={{ marginBottom: 24, fontSize: 28, color: '#111' }}>📊 Thống kê đơn hàng</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button onClick={() => setActiveTab('summary')} style={{ padding: '10px 16px', borderRadius: 10, border: 'none', backgroundColor: activeTab === 'summary' ? '#007bff' : '#e0e0e0', color: activeTab === 'summary' ? '#fff' : '#333', fontWeight: 600, cursor: 'pointer' }}>Đơn hàng</button>
        <button onClick={() => setActiveTab('charts')} style={{ padding: '10px 16px', borderRadius: 10, border: 'none', backgroundColor: activeTab === 'charts' ? '#007bff' : '#e0e0e0', color: activeTab === 'charts' ? '#fff' : '#333', fontWeight: 600, cursor: 'pointer' }}>Biểu đồ</button>
        <button onClick={() => setActiveTab('products')} style={{ padding: '10px 16px', borderRadius: 10, border: 'none', backgroundColor: activeTab === 'products' ? '#007bff' : '#e0e0e0', color: activeTab === 'products' ? '#fff' : '#333', fontWeight: 600, cursor: 'pointer' }}>SP bán chạy</button>
      </div>

      {activeTab === 'summary' && (
        <div style={{ ...cardStyle }}>
          <h3 style={{ fontSize: 20, marginBottom: 12 }}>📊 Tổng quan đơn hàng</h3>

          <div style={{ display: 'flex', gap: 40, marginBottom: 20 }}>
            <div><strong>Tổng số đơn hàng:</strong> {totalOrderCount}</div>
            <div><strong>Tổng sản phẩm:</strong> {totalQuantity}</div>
            <div><strong>Tổng doanh thu:</strong> {totalRevenue?.toLocaleString('vi-VN')}đ</div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'charts' && (
        <>
          <div style={{ ...cardStyle }}>
            <h3 style={{ fontSize: 20, marginBottom: 12 }}>🟦 Biểu đồ số đơn theo trạng thái</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="status" type="category" />
                <Tooltip />
                <Bar dataKey="count" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ ...cardStyle }}>
            <h3 style={{ fontSize: 20, marginBottom: 12 }}>📅 Doanh thu theo tháng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')}đ`} />
                <Bar dataKey="revenue" fill="#28a745" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {activeTab === 'products' && (
        <div style={{ ...cardStyle }}>
          <h3 style={{ fontSize: 20, marginBottom: 12 }}>🔥 Top 5 sản phẩm bán chạy</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={topProducts} dataKey="qty" nameKey="product" cx="50%" cy="50%" outerRadius={100} label>
                {topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PaymentStatic;
