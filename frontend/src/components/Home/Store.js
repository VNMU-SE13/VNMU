// src/components/Store.js
import React from "react";
import "../../assets/css/QuizAndStore.css";
import SouvenirProducts from "./SouvenirProducts";

const Store = () => {
  return (
    <div className="store-section">
      <div className="store-header reverse-layout">
        <div className="store-image">
          <img src="/image/Luuniem.png" alt="Store Illustration" className="store-img" />
        </div>
        <div className="store-content">
          <h2>Cửa hàng lưu niệm</h2>
          <p>
            Khám phá hàng trăm sản phẩm độc đáo lấy cảm hứng từ nghệ thuật, từ trang sức, sách đến đồ trang trí nhà cửa.
          </p>
          <button className="store-shop-button">Mua ngay</button>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <SouvenirProducts />
    </div>
  );
};

export default Store;
