import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/AllMuseum.css";
import Header from "../Home/Header"; // Import Header
import Footer from "../Home/Footer"; // Import Footer

const museums = [
  {
    id: 1,
    name: "Bảo tàng Quân khu 5",
    description: "Khám phá lịch sử quân sự khu vực miền Trung Việt Nam.",
    hours: "8:00 sáng - 5:00 chiều",
    closed: "Thứ Hai",
    image: "/image/BT-QK5.jpg",
  },
  {
    id: 2,
    name: "Bảo tàng Điêu khắc Chăm",
    description: "Nơi lưu giữ tinh hoa văn hóa Chăm Pa cổ đại.",
    hours: "8:00 sáng - 5:00 chiều",
    closed: "Không",
    image: "/image/BT-Cham.jpg",
  },
  {
    id: 3,
    name: "Bảo tàng Nghệ thuật Đương đại",
    description: "Trưng bày các tác phẩm nghệ thuật đương đại độc đáo.",
    hours: "9:00 sáng - 6:00 chiều",
    closed: "Không",
    image: "/image/BT-DuongDai.jpg",
  },
  {
    id: 4,
    name: "Bảo tàng Lịch sử Văn hóa",
    description: "Khám phá lịch sử và văn hóa Đà Nẵng qua các thời kỳ.",
    hours: "8:30 sáng - 4:30 chiều",
    closed: "Thứ Ba",
    image: "/image/BT-LSVH.png",
  },
  {
    id: 5,
    name: "Bảo tàng Khoa học",
    description: "Khám phá thế giới khoa học qua các mô hình tương tác.",
    hours: "9:00 sáng - 5:00 chiều",
    closed: "Không",
    image: "/image/BT-KhoaHoc.jpg",
  },
  {
    id: 6,
    name: "Bảo tàng Tự nhiên",
    description: "Trưng bày động vật và thực vật trong khu vực miền Trung.",
    hours: "8:00 sáng - 5:00 chiều",
    closed: "Chủ Nhật",
    image: "/image/BT-TuNhien.jpg",
  },
  {
    id: 7,
    name: "Bảo tàng Mỹ thuật",
    description: "Nơi trưng bày các tác phẩm mỹ thuật nổi bật của Đà Nẵng.",
    hours: "8:30 sáng - 4:30 chiều",
    closed: "Không",
    image: "/image/BT-MyThuat.jpg",
  },
  {
    id: 8,
    name: "Bảo tàng Hàng hải",
    description: "Khám phá lịch sử hàng hải khu vực miền Trung Việt Nam.",
    hours: "9:00 sáng - 5:00 chiều",
    closed: "Thứ Tư",
    image: "/image/BT-HangHai.jpeg",
  },
  {
    id: 9,
    name: "Bảo tàng Dân tộc học",
    description: "Khám phá văn hóa và phong tục của các dân tộc miền Trung.",
    hours: "8:00 sáng - 5:00 chiều",
    closed: "Không",
    image: "/image/BT-DanToc.jpg",
  },
  {
    id: 10,
    name: "Bảo tàng Công nghệ",
    description: "Trưng bày các thành tựu công nghệ mới nhất tại Việt Nam.",
    hours: "9:00 sáng - 6:00 chiều",
    closed: "Thứ Hai",
    image: "/image/BT-CongNghe.jpg",
  },
  {
    id: 11,
    name: "Bảo tàng Gốm sứ",
    description: "Bộ sưu tập gốm sứ độc đáo từ các thời kỳ lịch sử Việt Nam.",
    hours: "8:30 sáng - 4:30 chiều",
    closed: "Không",
    image: "/image/BT-Gom.jpg",
  },
];

const AllMuseum = () => {
  const navigate = useNavigate();

  const handleNavigateToDetail = (id) => {
    navigate(`/museums/${id}`);
  };

  return (
    <div className="all-museum">
      {/* Header */}
      <Header />

      {/* Title */}
      <div className="page-title">
        <h1>Các bảo tàng ở Đà Nẵng</h1>
      </div>

      {/* Main Content */}
      <div className="museums-grid">
        {museums.map((museum) => (
          <div className="museum-item" key={museum.id}>
            <img src={museum.image} alt={museum.name} className="museum-image" />
            <div className="museum-info">
              <h3
                className="museum-title"
                onClick={() => handleNavigateToDetail(museum.id)}
                style={{ cursor: "pointer", color: "#c8102e" }}
              >
                {museum.name}
              </h3>
              <p>{museum.description}</p>
              <p>
                <strong>Giờ mở cửa:</strong> {museum.hours}
              </p>
              <p>
                <strong>Đóng cửa:</strong> {museum.closed}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AllMuseum;
