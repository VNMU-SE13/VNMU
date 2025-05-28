import React from 'react';

const PaymentFailure = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">❗ Thanh toán thất bại</h1>
        <p className="text-lg mb-4">Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.</p>
        <a
          href="/"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
};

export default PaymentFailure;
