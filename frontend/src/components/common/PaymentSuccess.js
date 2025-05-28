import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-green-800">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 Thanh toán thành công!</h1>
        <p className="text-lg mb-4">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
        <a
          href="/"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
