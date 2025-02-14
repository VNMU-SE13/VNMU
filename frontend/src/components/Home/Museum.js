import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../../assets/css/Museum.css';

const Museum = () => {
  const navigate = useNavigate(); 

  const museums = [
    {
      id: 1,
      image: "/image/BT-QK5.jpg",
      title: "Bảo tàng Quân khu 5",
      description: "Khám phá lịch sử quân sự khu vực miền Trung Việt Nam.",
      hours: "Giờ mở cửa: 8:00 sáng - 5:00 chiều",
      closed: "Đóng cửa: Chủ Nhật",
    },

    {
      id: 2,
      image: "/image/BT-Cham.jpg",
      title: "Bảo tàng Điêu khắc Chăm",
      description: "Nơi lưu giữ tinh hoa văn hóa Chăm Pa cổ đại.",
      hours: "Giờ mở cửa: 8:00 sáng - 5:00 chiều",
      closed: "Đóng cửa: Lễ Tết hằng năm",
    },
  ];
 
  const handleTitleClick = (id) => {
    navigate(`/museums/${id}`); // Điều hướng tới trang chi tiết bảo tàng với ID
  };

  const handleSeeAll = () => {
    navigate("/all-museums"); // Điều hướng đến trang AllMuseum
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
              <h3
                onClick={() => handleTitleClick(museum.id)} // Điều hướng khi nhấn vào tiêu đề
                style={{ cursor: "pointer", color: "#c8102e" }} // Thêm style để người dùng biết có thể click
              >
                {museum.title}
              </h3>
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

