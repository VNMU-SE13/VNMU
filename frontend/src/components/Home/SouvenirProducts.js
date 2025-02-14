import React from "react";
import "../../assets/css/SouvenirProducts.css";
const souvenirProducts = [
  {
    id: 1,
    name: "Tượng cô gái Việt Nam",
    image: "/image/souvenir/souvenir1.jpg",
    price: "150.000đ"
  },
  {
    id: 2,
    name: "Mô hình nón lá mini",
    image: "/image/souvenir/souvenir2.jpg",
    price: "120.000đ"
  },
  {
    id: 3,
    name: "Bộ bưu thiếp nghệ thuật",
    image: "/image/souvenir/souvenir3.jpg",
    price: "90.000đ"
  },
  {
    id: 4,
    name: "Lọ gốm sứ Bát Tràng",
    image: "/image/souvenir/souvenir4.jpg",
    price: "200.000đ"
  }
];

const SouvenirList = () => {
  return (
    <div className="souvenir-section">
      <h2 className="souvenir-title">Sản phẩm lưu niệm nổi bật</h2>
      <div className="souvenir-list">
        {souvenirProducts.map((product) => (
          <div key={product.id} className="souvenir-item">
            <img src={product.image} alt={product.name} className="souvenir-img" />
            <h3 className="souvenir-name">{product.name}</h3>
            <p className="souvenir-price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SouvenirList;
