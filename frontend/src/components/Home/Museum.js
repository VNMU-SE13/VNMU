import React from "react";
import '../../assets/css/Museum.css';

const Museum = () => {
  const museums = [
    {
      id: 1,
      image: "/image/BT-QK5.jpg",
      title: "Bảo tàng Quân khu 5",
      description: "Khám phá lịch sử quân sự khu vực miền Trung Việt Nam.",
      hours: "Giờ mở cửa: 8:00 sáng - 5:00 chiều",
      closed: "Đóng cửa: Thứ Hai",
    },
    {
      id: 2,
      image: "/image/BT-Cham.jpg",
      title: "Bảo tàng Điêu khắc Chăm",
      description: "Nơi lưu giữ tinh hoa văn hóa Chăm Pa cổ đại.",
      hours: "Giờ mở cửa: 8:00 sáng - 5:00 chiều",
      closed: "Đóng cửa: Không",
    },
  ];

  const handleSeeAll = () => {
    alert("Redirecting to See All Museums...");
  };

  return (
    <div className="museum-container">
      <div className="museum-header">
        <h2>Các Bảo tàng ở Đà Nẵng</h2>
        <button className="see-all-button" onClick={handleSeeAll}>See All</button>
      </div>
      <div className="museum-grid">
        {museums.map((museum) => (
          <div key={museum.id} className="museum-item">
            <img src={museum.image} alt={museum.title} className="museum-image" />
            <div className="museum-info">
              <h3>{museum.title}</h3>
              <p>{museum.description}</p>
              <p>{museum.hours}</p>
              <p>{museum.closed}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Museum;
