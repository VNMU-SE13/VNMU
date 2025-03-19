import React from "react";
import { useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ArtifactsCarousel from "../Museum/ArtifactsCarousel";

// Keyframes Animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const MuseumDetailContainer = styled.div`
  margin-top: 80px;
  padding: 20px;
  background-color: #f8f8f8;
`;

const MuseumContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const MuseumTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  animation: ${fadeInDown} 1s ease-in-out;
`;

const MuseumInfo = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 20px;
  animation: ${fadeInUp} 1.2s ease-in-out;
`;

const MuseumText = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 1.5s ease-in-out;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #c8102e;
  text-align: left;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const Text = styled.p`
  font-size: 16px;
  color: #444;
  margin-bottom: 15px;
  line-height: 1.8;
  text-align: justify;
  animation: ${fadeInUp} 1.5s ease-in-out;
`;

const MuseumImage = styled.div`
  flex: 1;
  max-width: 400px;
  display: flex;
  justify-content: center;
  animation: ${fadeInUp} 1.5s ease-in-out;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  color: #666;
  animation: ${fadeIn} 1s ease-in-out;

  a {
    color: #0073e6;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  span {
    color: #333;
    font-weight: bold;
  }
`;

const ArtifactsSection = styled.div`
  margin-top: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ArtifactsTitle = styled.h2`
  font-size: 24px;
  color: #c8102e;
  margin-bottom: 20px;
`;

const ArtifactsSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArtifactItem = styled.div`
  text-align: center;
  flex: 1;

  img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
    margin: 0 auto;
    display: block;
  }

  p {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #c8102e;
  transition: color 0.3s ease;

  &:hover {
    color: #a00c1d;
  }
`;
export const museums = [
    {
      id: 1,
      name: "Bảo tàng Quân khu 5",
      description: "Khám phá lịch sử quân sự khu vực miền Trung Việt Nam.",
      hours: "8:00 sáng - 5:00 chiều",
      closed: "Thứ Hai",
      address: "Nguyễn Chí Thanh, Đà Nẵng, Việt Nam",
      image: "/image/BT-QK5.jpg",
      longDescription: `Bảo tàng Quân khu 5 là nơi trưng bày và lưu giữ những hiện vật quý giá liên quan đến lịch sử quân sự của khu vực miền Trung. Đây là điểm đến hấp dẫn cho những ai yêu thích lịch sử và muốn tìm hiểu về các giai đoạn kháng chiến chống thực dân và đế quốc.`,
      artifacts: [
        { id: 1, name: "Xe tăng T-54", image: "/image/artifacts/tank.jpg", category: ["KC chống Mỹ", "KC chống Pháp", "CT biên giới"] },
        { id: 2, name: "Súng thần công", image: "/image/artifacts/cannon.jpg", category: ["KC chống Pháp", "KC chống Nhật", "CT biên giới"] },
        { id: 3, name: "Mũ sắt", image: "/image/artifacts/helmet.jpg",category: ["KC chống Mỹ", "KC chống Nhật", "CT biên giới"] },
        { id: 4, name: "Bản đồ tác chiến", image: "/image/artifacts/map.jpg",category: ["KC chống Mỹ", "KC chống Pháp", "CT biên giới"]  },
        { id: 5, name: "Huy hiệu quân đội", image: "/image/artifacts/badge.jpg", category: ["KC chống Mỹ", "KC chống Pháp", "CT biên giới"]},
        { id: 6, name: "Súng AK-47", image: "/image/artifacts/ak47.jpg", category: ["KC chống Mỹ", "KC chống Pháp", "CT biên giới"]},
        { id: 7, name: "Radio liên lạc", image: "/image/artifacts/radio.jpg", category: ["KC chống Mỹ", "KC chống Pháp", "CT biên giới"] },
      ],
    },
    {
      id: 2,
      name: "Bảo tàng Điêu khắc Chăm",
      description: "Nơi lưu giữ tinh hoa văn hóa Chăm Pa cổ đại.",
      hours: "8:00 sáng - 5:00 chiều",
      closed: "Không",
      address: "Số 2, 2 Tháng 9, Đà Nẵng, Việt Nam",
      image: "/image/BT-Cham.jpg",
      longDescription: `Bảo tàng Điêu khắc Chăm là nơi lưu giữ những giá trị văn hóa nghệ thuật độc đáo của người Chăm Pa cổ. Với hàng trăm hiện vật quý giá, bảo tàng mang đến cho du khách cái nhìn toàn diện về lịch sử và văn hóa Chăm Pa.`,
      artifacts: [
        { id: 1, name: "Tượng thần Shiva", image: "/image/artifacts/shiva.jpg" },
        { id: 2, name: "Tượng nữ thần Parvati", image: "/image/artifacts/parvati.jpg" },
        { id: 3, name: "Bức phù điêu Linga-Yoni", image: "/image/artifacts/linga.jpg" },
        { id: 4, name: "Trống Chăm", image: "/image/artifacts/drum.jpg" },
        { id: 5, name: "Bình gốm Chăm cổ", image: "/image/artifacts/ceramic.jpg" },
        { id: 6, name: "Tượng bò thần Nandi", image: "/image/artifacts/nandi.jpg" },
        { id: 7, name: "Chạm khắc Mandala", image: "/image/artifacts/mandala.jpg" },
      ],
    },
    {
      id: 3,
      name: "Bảo tàng Nghệ thuật Đương đại",
      description: "Trưng bày các tác phẩm nghệ thuật đương đại độc đáo.",
      hours: "9:00 sáng - 6:00 chiều",
      closed: "Không",
      address: "123 Đường Nghệ Thuật, Đà Nẵng, Việt Nam",
      image: "/image/BT-DuongDai.jpg",
      longDescription: `Bảo tàng Nghệ thuật Đương đại là nơi trưng bày các tác phẩm nghệ thuật hiện đại từ nhiều nghệ sĩ nổi tiếng trong nước và quốc tế. Đây là điểm đến lý tưởng cho những ai yêu thích nghệ thuật sáng tạo và hiện đại.`,
      artifacts: [
        { id: 1, name: "Tranh sơn dầu", image: "/image/artifacts/oil_paint.jpg" },
        { id: 2, name: "Tác phẩm điêu khắc", image: "/image/artifacts/sculpture.jpg" },
        { id: 3, name: "Tác phẩm sắp đặt", image: "/image/artifacts/installation.jpg" },
        { id: 4, name: "Tranh trừu tượng", image: "/image/artifacts/abstract.jpg" },
        { id: 5, name: "Tượng hiện đại", image: "/image/artifacts/modern_statue.jpg" },
        { id: 6, name: "Nghệ thuật số", image: "/image/artifacts/digital.jpg" },
        { id: 7, name: "Đèn Neon Art", image: "/image/artifacts/neon.jpg" },
      ],
    },
    {
      id: 4,
      name: "Bảo tàng Lịch sử Văn hóa",
      description: "Khám phá lịch sử và văn hóa Đà Nẵng qua các thời kỳ.",
      hours: "8:30 sáng - 4:30 chiều",
      closed: "Thứ Ba",
      address: "56 Đường Văn Hóa, Đà Nẵng, Việt Nam",
      image: "/image/BT-LSVH.png",
      longDescription: `Bảo tàng Lịch sử Văn hóa cung cấp cái nhìn toàn diện về lịch sử và văn hóa của Đà Nẵng. Tại đây, du khách có thể tìm hiểu về các giai đoạn phát triển của thành phố qua các hiện vật và tư liệu phong phú.`,
      artifacts: [
        { id: 1, name: "Tranh lịch sử", image: "/image/artifacts/history_painting.jpg" },
        { id: 2, name: "Sách cổ", image: "/image/artifacts/ancient_book.jpg" },
        { id: 3, name: "Bản đồ cổ", image: "/image/artifacts/old_map.jpg" },
        { id: 4, name: "Đồng xu cổ", image: "/image/artifacts/old_coin.jpg" },
        { id: 5, name: "Đồ gốm cổ", image: "/image/artifacts/ceramics.jpg" },
        { id: 6, name: "Phù điêu lịch sử", image: "/image/artifacts/relief.jpg" },
        { id: 7, name: "Tài liệu chiến tranh", image: "/image/artifacts/documents.jpg" },
      ],
    },
    {
      id: 5,
      name: "Bảo tàng Khoa học",
      description: "Khám phá thế giới khoa học qua các mô hình tương tác.",
      hours: "9:00 sáng - 5:00 chiều",
      closed: "Không",
      address: "789 Đường Khoa Học, Đà Nẵng, Việt Nam",
      image: "/image/BT-KhoaHoc.jpg",
      longDescription: `Bảo tàng Khoa học là nơi lý tưởng cho các gia đình và học sinh đến khám phá thế giới khoa học qua các mô hình và hoạt động tương tác thú vị. Bảo tàng mang đến không gian học tập và giải trí sáng tạo.`,
      artifacts: [
        { id: 1, name: "Mô hình hệ mặt trời", image: "/image/artifacts/solar_system.jpg" },
        { id: 2, name: "Robot tương tác", image: "/image/artifacts/robot.jpg" },
        { id: 3, name: "Đồng hồ thiên văn", image: "/image/artifacts/astronomy.jpg" },
        { id: 4, name: "Trò chơi trí tuệ", image: "/image/artifacts/puzzle.jpg" },
        { id: 5, name: "Kính thiên văn", image: "/image/artifacts/telescope.jpg" },
        { id: 6, name: "Thí nghiệm hóa học", image: "/image/artifacts/chemistry.jpg" },
        { id: 7, name: "Lịch sử vật lý", image: "/image/artifacts/physics.jpg" },
      ],
    },
    {
        id: 6,
        name: "Bảo tàng Tự nhiên",
        description: "Trưng bày động vật và thực vật trong khu vực miền Trung.",
        hours: "8:00 sáng - 5:00 chiều",
        closed: "Chủ Nhật",
        address: "90 Đường Sinh Thái, Đà Nẵng, Việt Nam",
        image: "/image/BT-TuNhien.jpg",
        longDescription: `Bảo tàng Tự nhiên giới thiệu đa dạng sinh học phong phú của khu vực miền Trung, từ các loài động vật quý hiếm đến hệ thực vật đặc trưng. Đây là nơi giáo dục ý nghĩa về bảo vệ môi trường và sinh thái.`,
        artifacts: [
          { id: 1, name: "Xương khủng long", image: "/image/artifacts/dinosaur_bones.jpg" },
          { id: 2, name: "Hóa thạch san hô", image: "/image/artifacts/coral_fossil.jpg" },
          { id: 3, name: "Mô hình hệ sinh thái rừng", image: "/image/artifacts/forest_model.jpg" },
          { id: 4, name: "Động vật biển", image: "/image/artifacts/marine_life.jpg" },
          { id: 5, name: "Thực vật quý hiếm", image: "/image/artifacts/rare_plants.jpg" },
          { id: 6, name: "Bướm nhiệt đới", image: "/image/artifacts/tropical_butterflies.jpg" },
          { id: 7, name: "Đá quý", image: "/image/artifacts/precious_stones.jpg" },
        ],
      },
      {
        id: 7,
        name: "Bảo tàng Mỹ thuật",
        description: "Nơi trưng bày các tác phẩm mỹ thuật nổi bật của Đà Nẵng.",
        hours: "8:30 sáng - 4:30 chiều",
        closed: "Không",
        address: "45 Đường Mỹ Thuật, Đà Nẵng, Việt Nam",
        image: "/image/BT-MyThuat.jpg",
        longDescription: `Bảo tàng Mỹ thuật là nơi trưng bày các tác phẩm nghệ thuật từ truyền thống đến hiện đại, góp phần tôn vinh và gìn giữ văn hóa mỹ thuật Việt Nam. Đây là điểm đến hấp dẫn cho những người yêu nghệ thuật.`,
        artifacts: [
          { id: 1, name: "Tranh phong cảnh", image: "/image/artifacts/landscape_painting.jpg" },
          { id: 2, name: "Điêu khắc gỗ", image: "/image/artifacts/wood_carving.jpg" },
          { id: 3, name: "Tranh lụa", image: "/image/artifacts/silk_painting.jpg" },
          { id: 4, name: "Tranh sơn mài", image: "/image/artifacts/lacquer_painting.jpg" },
          { id: 5, name: "Nghệ thuật giấy", image: "/image/artifacts/paper_art.jpg" },
          { id: 6, name: "Tượng điêu khắc đồng", image: "/image/artifacts/bronze_sculpture.jpg" },
          { id: 7, name: "Mô hình mỹ thuật", image: "/image/artifacts/art_model.jpg" },
        ],
      },
      {
        id: 8,
        name: "Bảo tàng Hàng hải",
        description: "Khám phá lịch sử hàng hải khu vực miền Trung Việt Nam.",
        hours: "9:00 sáng - 5:00 chiều",
        closed: "Thứ Tư",
        address: "67 Đường Hàng Hải, Đà Nẵng, Việt Nam",
        image: "/image/BT-HangHai.jpeg",
        longDescription: `Bảo tàng Hàng hải lưu giữ những hiện vật quý giá về lịch sử hàng hải và các câu chuyện về ngành hàng hải miền Trung Việt Nam. Đây là nơi ghi lại dấu ấn của các thời kỳ phát triển hàng hải trong nước.`,
        artifacts: [
          { id: 1, name: "Mô hình tàu cổ", image: "/image/artifacts/ship_model.jpg" },
          { id: 2, name: "Bản đồ hàng hải", image: "/image/artifacts/marine_map.jpg" },
          { id: 3, name: "La bàn cổ", image: "/image/artifacts/ancient_compass.jpg" },
          { id: 4, name: "Đèn hải đăng", image: "/image/artifacts/lighthouse.jpg" },
          { id: 5, name: "Trang phục thủy thủ", image: "/image/artifacts/sailor_uniform.jpg" },
          { id: 6, name: "Vật dụng tàu thuyền", image: "/image/artifacts/boat_tools.jpg" },
          { id: 7, name: "Ngư cụ đánh bắt", image: "/image/artifacts/fishing_gear.jpg" },
        ],
      },
      {
        id: 9,
        name: "Bảo tàng Dân tộc học",
        description: "Khám phá văn hóa và phong tục của các dân tộc miền Trung.",
        hours: "8:00 sáng - 5:00 chiều",
        closed: "Không",
        address: "12 Đường Dân Tộc, Đà Nẵng, Việt Nam",
        image: "/image/BT-DanToc.jpg",
        longDescription: `Bảo tàng Dân tộc học trưng bày các hiện vật và tư liệu liên quan đến văn hóa, phong tục tập quán của các dân tộc miền Trung. Đây là nơi bảo tồn và phát huy giá trị di sản văn hóa của các dân tộc.`,
        artifacts: [
          { id: 1, name: "Trang phục dân tộc", image: "/image/artifacts/ethnic_clothing.jpg" },
          { id: 2, name: "Nhạc cụ dân tộc", image: "/image/artifacts/ethnic_instruments.jpg" },
          { id: 3, name: "Nhà sàn thu nhỏ", image: "/image/artifacts/stilt_house.jpg" },
          { id: 4, name: "Trống đồng", image: "/image/artifacts/bronze_drum.jpg" },
          { id: 5, name: "Đồ gốm dân tộc", image: "/image/artifacts/ethnic_pottery.jpg" },
          { id: 6, name: "Cồng chiêng", image: "/image/artifacts/gongs.jpg" },
          { id: 7, name: "Dụng cụ dệt vải", image: "/image/artifacts/loom.jpg" },
        ],
      },
      {
        id: 10,
        name: "Bảo tàng Công nghệ",
        description: "Trưng bày các thành tựu công nghệ mới nhất tại Việt Nam.",
        hours: "9:00 sáng - 6:00 chiều",
        closed: "Thứ Hai",
        address: "34 Đường Công Nghệ, Đà Nẵng, Việt Nam",
        image: "/image/BT-CongNghe.jpg",
        longDescription: `Bảo tàng Công nghệ là nơi giới thiệu những tiến bộ khoa học kỹ thuật và các thành tựu công nghệ mới nhất tại Việt Nam. Đây là điểm đến lý thú cho những ai quan tâm đến công nghệ và đổi mới sáng tạo.`,
        artifacts: [
          { id: 1, name: "Máy in 3D", image: "/image/artifacts/3d_printer.jpg" },
          { id: 2, name: "Mô hình AI", image: "/image/artifacts/ai_model.jpg" },
          { id: 3, name: "Điện thoại cổ", image: "/image/artifacts/old_phone.jpg" },
          { id: 4, name: "Máy tính đầu tiên", image: "/image/artifacts/first_computer.jpg" },
          { id: 5, name: "Robot công nghiệp", image: "/image/artifacts/industrial_robot.jpg" },
          { id: 6, name: "Máy tính bảng", image: "/image/artifacts/tablet.jpg" },
          { id: 7, name: "Drone công nghệ cao", image: "/image/artifacts/drone.jpg" },
        ],
      },
  ];

  const MuseumDetail = () => {
  const { id } = useParams();
  const museum = museums.find((m) => m.id === parseInt(id));

  if (!museum) {
    return <p>Bảo tàng không tồn tại.</p>;
  }

  return (
    <MuseumDetailContainer>
      <Header />

      <MuseumContent>
        <Breadcrumb>
          <Link to="/">Trang chủ</Link> / <Link to="/all-museums">Các bảo tàng</Link> /{" "}
          <span>{museum.name}</span>
        </Breadcrumb>

        <MuseumTitle>{museum.name}</MuseumTitle>

        <MuseumInfo>
          <MuseumText>
            <SectionTitle>Giờ mở cửa</SectionTitle>
            <Text>{museum.hours}</Text>
            <Text>
              <strong>Đóng cửa:</strong> {museum.closed}
            </Text>

            <SectionTitle>Địa chỉ</SectionTitle>
            <Text>{museum.address}</Text>

            <SectionTitle>Mô tả chi tiết</SectionTitle>
            <Text>{museum.longDescription}</Text>
          </MuseumText>

          <MuseumImage>
            <img src={museum.image} alt={museum.name} />
          </MuseumImage>
        </MuseumInfo>

        {/* Sử dụng ArtifactsCarousel thay vì slider cũ */}

            <ArtifactsCarousel artifacts={museum.artifacts} />

      </MuseumContent>

      <Footer />
    </MuseumDetailContainer>
  );
};

export default MuseumDetail;