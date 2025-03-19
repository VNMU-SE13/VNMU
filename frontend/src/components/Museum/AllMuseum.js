import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Home/Header"; 
import Footer from "../Home/Footer"; 

// Styled Components
const AllMuseumContainer = styled.div`
  padding: 40px;
  background-color: #f8f8f8;
`;

const PageTitle = styled.div`
  margin-top: 80px;
  padding: 10px 20px;
  background-color: #f8f8f8;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: bold;
    color: #c8102e;
  }
`;

const MuseumsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const MuseumItem = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const MuseumImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MuseumInfo = styled.div`
  padding: 15px;
  text-align: left;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #c8102e;
    cursor: pointer;
  }

  p {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
    line-height: 1.5;
  }

  strong {
    color: #333;
  }
`;

// 🔹 Danh sách bảo tàng (CHỈ ĐỔI TÊN, GIỮ NGUYÊN ĐƯỜNG LINK ẢNH)
const museums = [
  { id: 1, name: "Bảo tàng Quân khu 5", description: "Khám phá lịch sử quân sự khu vực miền Trung Việt Nam.", image: "/image/BT-QK5.jpg" },
  { id: 2, name: "Bảo tàng Điêu khắc Chăm", description: "Nơi lưu giữ tinh hoa văn hóa Chăm Pa cổ đại.", image: "/image/BT-Cham.jpg" },
  { id: 3, name: "Bảo tàng Đà Nẵng", description: "Lịch sử và văn hóa Đà Nẵng qua các thời kỳ.", image: "/image/BT-DuongDai.jpg" },
  { id: 4, name: "Bảo tàng Mỹ thuật Đà Nẵng", description: "Trưng bày các tác phẩm mỹ thuật nổi bật của Đà Nẵng.", image: "/image/BT-LSVH.png" },
  { id: 5, name: "Bảo tàng Đồng Đình", description: "Không gian văn hóa kết hợp nghệ thuật dân gian.", image: "/image/BT-KhoaHoc.jpg" },
  { id: 6, name: "Nhà trưng bày Hoàng Sa", description: "Tư liệu và hiện vật về chủ quyền biển đảo.", image: "/image/BT-TuNhien.jpg" },
  { id: 7, name: "Bảo tàng Tre trúc Sơn Trà Tịnh Viên", description: "Khu bảo tồn các công trình tre trúc.", image: "/image/BT-MyThuat.jpg" },
  { id: 8, name: "Bảo tàng Tranh 3D Art In Paradise", description: "Trải nghiệm nghệ thuật tranh 3D độc đáo.", image: "/image/BT-HangHai.jpeg" },
  { id: 9, name: "Thế Giới Úp Ngược", description: "Không gian sáng tạo và chụp ảnh độc đáo.", image: "/image/BT-DanToc.jpg" },
  { id: 10, name: "Bảo tàng Phật giáo Đà Nẵng", description: "Bảo tồn và trưng bày di sản Phật giáo.", image: "/image/BT-CongNghe.jpg" },
  { id: 11, name: "Bảo tàng Sáp Đà Nẵng", description: "Tượng sáp người nổi tiếng thế giới.", image: "/image/BT-Gom.jpg" },
];

const AllMuseum = () => {
  const navigate = useNavigate();

  const handleNavigateToDetail = (id) => {
    navigate(`/museums/${id}`);
  };

  return (
    <AllMuseumContainer>
      {/* Header */}
      <Header />

      {/* Title */}
      <PageTitle>
        <h1>Các bảo tàng ở Đà Nẵng</h1>
      </PageTitle>

      {/* Main Content */}
      <MuseumsGrid>
        {museums.map((museum) => (
          <MuseumItem key={museum.id}>
            <MuseumImage src={museum.image} alt={museum.name} />
            <MuseumInfo>
              <h3 onClick={() => handleNavigateToDetail(museum.id)}>
                {museum.name}
              </h3>
              <p>{museum.description}</p>
            </MuseumInfo>
          </MuseumItem>
        ))}
      </MuseumsGrid>

      {/* Footer */}
      <Footer />
    </AllMuseumContainer>
  );
};

export default AllMuseum;
