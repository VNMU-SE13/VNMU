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
  flex-wrap: wrap;
  gap: 2rem;
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


const MuseumTextWithMap = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MapBox = styled.div`
  width: 300px;
  height: 300px;
  flex-shrink: 0;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
  }
`;

const TextColumn = styled.div`
  flex: 1;
  min-width: 250px;
`;

export const museums = [
  {
    id: 1,
    slug: "bao-tang-quan-khu-5",
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
      { id: 3, name: "Mũ sắt", image: "/image/artifacts/helmet.jpg", category: ["KC chống Mỹ", "KC chống Nhật", "CT biên giới"] },
      { id: 4, name: "Bản đồ tác chiến", image: "/image/artifacts/map.jpg", category: ["KC chống Mỹ", "KC chống Pháp", "CT biên giới"] },
      { id: 5, name: "Huy hiệu quân đội", image: "/image/artifacts/badge.jpg", category: ["KC chống Mỹ", "KC chống Pháp", "CT biên giới"] },
      { id: 6, name: "Súng AK-47", image: "/image/artifacts/ak47.jpg", category: ["KC chống Mỹ", "KC chống Pháp", "CT biên giới"] },
      { id: 7, name: "Radio liên lạc", image: "/image/artifacts/radio.jpg", category: ["KC chống Mỹ", "KC chống Pháp", "CT biên giới"] },
    ],
  },
  {
    id: 2,
    slug: "bao-tang-dieu-khac-cham",
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
    slug: "bao-tang-da-nang",
    name: "Bảo tàng Đà Nẵng",
    description: "Khám phá văn hóa, lịch sử và con người Đà Nẵng.",
    hours: "9:00 sáng - 6:00 chiều",
    closed: "Không",
    address: "24 Trần Phú, Quận Hải Châu, Đà Nẵng",
    image: "/image/BaoTangDaNang.jpg",
    longDescription: `Bảo tàng Đà Nẵng có ba tầng trưng bày với hàng ngàn hiện vật về lịch sử, văn hóa, chiến tranh và sự phát triển của thành phố. Đây là nơi lý tưởng để hiểu về hành trình hình thành và đổi mới của Đà Nẵng.`,
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
    slug: "bao-tang-my-thuat-da-nang",
    name: "Bảo tàng Mỹ thuật Đà Nẵng",
    description: "Nơi hội tụ tinh hoa mỹ thuật miền Trung - Tây Nguyên.",
    hours: "8:30 sáng - 4:30 chiều",
    closed: "Thứ Ba",
    address: "78 Lê Duẩn, Quận Hải Châu, Đà Nẵng",
    image: "/image/BaoTangMyThuat.jpg",
    longDescription: `Trưng bày hơn 1000 tác phẩm nghệ thuật hiện đại và dân gian, bảo tàng là không gian sáng tạo độc đáo, kết nối nghệ thuật đương đại với di sản văn hóa truyền thống.`,
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
    slug: "bao-tang-dong-dinh",
    name: "Bảo tàng Đồng Đình",
    description: "Bảo tàng sinh thái - nghệ thuật trên bán đảo Sơn Trà.",
    hours: "9:00 sáng - 5:00 chiều",
    closed: "Không",
    address: "Hoàng Sa, Bán đảo Sơn Trà, Đà Nẵng",
    image: "/image/BaoTangDongDinh.jpg",
    longDescription: `Nằm giữa rừng nguyên sinh Sơn Trà, bảo tàng Đồng Đình kết hợp giữa kiến trúc truyền thống, nghệ thuật đương đại và không gian thiên nhiên. Đây là nơi lưu giữ cổ vật, văn hóa dân gian và tác phẩm nghệ thuật độc đáo.`,
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
    slug: "nha-trung-bay-hoang-sa",
    name: "Nhà trưng bày Hoàng Sa",
    description: "Khẳng định chủ quyền biển đảo Việt Nam.",
    hours: "8:00 sáng - 5:00 chiều",
    closed: "Chủ Nhật",
    address: "1A Hoàng Sa, Quận Sơn Trà, Đà Nẵng",
    image: "/image/HoangSa.jpg",
    longDescription: ` Nhà trưng bày lưu giữ các tài liệu, bản đồ, hình ảnh và hiện vật chứng minh chủ quyền hợp pháp của Việt Nam đối với quần đảo Hoàng Sa, giúp nâng cao nhận thức và lòng yêu nước cho người dân và du khách.`,
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
    slug: "bao-tang-tre-truc-son-tra-tinh-vien",
    name: "Bảo tàng Tre trúc Sơn Trà Tịnh Viên",
    description: "Không gian thiền tịnh với hơn 100 loại tre trúc.",
    hours: "8:30 sáng - 4:30 chiều",
    closed: "Không",
    address: "Khu vực suối Trúc, bán đảo Sơn Trà, Đà Nẵng",
    image: "/image/TreTruc.jpg",
    longDescription: `Đây là một không gian yên tĩnh, gần gũi thiên nhiên, do Đại đức Thích Thế Tường sáng lập. Bảo tàng không chỉ trưng bày tre trúc mà còn lan tỏa tinh thần thiền, bảo tồn giá trị văn hóa xanh.`,
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
    slug: "bao-tang-tranh-3d-art-in-paradise",
    name: " Bảo tàng Tranh 3D Art In Paradise",
    description: "Thế giới tranh 3D sống động đầy màu sắc.",
    hours: "9:00 sáng - 5:00 chiều",
    closed: "Thứ Tư",
    address: "Lô C2-10 Trần Nhân Tông, Quận Sơn Trà, Đà Nẵng",
    image: "/image/BaoTang3D.jpg",
    longDescription: `Là một trong những bảo tàng tranh 3D lớn nhất Việt Nam, nơi du khách có thể chụp hình tương tác với các bức tranh nghệ thuật sống động, mang lại trải nghiệm giải trí thú vị và độc đáo.`,
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
    slug: "the-gioi-up-nguoc",
    name: "Thế Giới Úp Ngược",
    description: "Không gian ảo ảnh độc đáo để sống ảo cực chất.",
    hours: "8:00 sáng - 5:00 chiều",
    closed: "Không",
    address: "44 Hồ Xuân Hương, Ngũ Hành Sơn, Đà Nẵng",
    image: "/image/UpNguoc.jpg",
    longDescription: `Mỗi căn phòng tại Thế giới Úp Ngược được thiết kế với bố cục đảo ngược, tạo hiệu ứng thị giác thú vị. Đây là điểm đến cực hot cho giới trẻ muốn chụp hình sáng tạo và trải nghiệm mới lạ.`,
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
    slug: "bao-tang-phat-giao-da-nang",
    name: "Bảo tàng Phật giáo Đà Nẵng",
    description: "Nơi lưu giữ văn hóa và nghệ thuật Phật giáo.",
    hours: "9:00 sáng - 6:00 chiều",
    closed: "Thứ Hai",
    address: "Chùa Quán Thế Âm, 48 Sư Vạn Hạnh, Quận Ngũ Hành Sơn, Đà Nẵng",
    image: "/image/BaoTangPhat.jpg",
    longDescription: `Gắn liền với chùa Quán Thế Âm, bảo tàng trưng bày nhiều cổ vật, tượng Phật, pháp khí và tranh tượng liên quan đến Phật giáo, thể hiện chiều sâu tín ngưỡng và văn hóa tâm linh Việt.`,
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
  {
    id: 11,
    slug: "bao-tang-sap-da-nang",
    name: "Bảo tàng Sáp Đà Nẵng",
    description: "Thế giới người nổi tiếng với tượng sáp y như thật.",
    hours: "9:00 sáng - 6:00 chiều",
    closed: "Thứ Hai",
    address: "Bà Nà Hills, Đà Nẵng",
    image: "/image/BaoTangSap.jpg",
    longDescription: `Nằm trong khuôn viên Bà Nà Hills, bảo tàng trưng bày hàng chục tượng sáp của các nhân vật nổi tiếng trên thế giới trong nhiều lĩnh vực. Đây là nơi lý tưởng để chụp ảnh và trải nghiệm văn hóa quốc tế.`,
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
  const { slug } = useParams();
  const museum = museums.find((m) => m.slug === slug);

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
          <MuseumTextWithMap>
            <TextColumn>
              <SectionTitle>Giờ mở cửa</SectionTitle>
              <Text>{museum.hours}</Text>
              <Text>
                <strong>Đóng cửa:</strong> {museum.closed}
              </Text>

              <SectionTitle>Địa chỉ</SectionTitle>
              <Text>{museum.address}</Text>

              <SectionTitle>Mô tả chi tiết</SectionTitle>
              <Text>{museum.longDescription}</Text>
            </TextColumn>

            <MapBox>
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(museum.address)}&output=embed`}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </MapBox>
          </MuseumTextWithMap>

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