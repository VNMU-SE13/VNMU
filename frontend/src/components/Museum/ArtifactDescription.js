import React from "react";
import styled from "styled-components";

// Styled Components cho ArtifactDescription
const ArtifactContainer = styled.div`
  font-size: 16px;
  margin-top: 15px;
  color: #444;
  line-height: 1.6;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const DescriptionText = styled.p`
  margin-bottom: 15px;
`;

const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

const TableCell = styled.td`
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

const LabelCell = styled(TableCell)`
  font-weight: bold;
  color: #333;
`;

const ValueCell = styled(TableCell)`
  color: #ff5722;
`;

const WikiLink = styled.a`
  color: #3366cc;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    color: #2255aa;
  }
`;

const ArtifactDescription = () => {
  const artifactInfo = {
    name: "Xe tăng T-54",
    description: (
      <>
        <DescriptionText>
          Xe tăng T-54 là một trong những biểu tượng lịch sử quan trọng gắn liền với những sự kiện hào hùng của dân tộc Việt Nam trong cuộc đấu tranh giành độc lập và thống nhất đất nước. Đây là loại xe tăng chiến đấu chủ lực do Liên Xô sản xuất, được Quân đội Nhân dân Việt Nam sử dụng rộng rãi trong thời kỳ kháng chiến chống Mỹ, đặc biệt là trong Chiến dịch Hồ Chí Minh lịch sử năm 1975.
        </DescriptionText>
        <DescriptionText>
          Một trong những hình ảnh mang tính biểu tượng nhất của T-54 là khoảnh khắc xe tăng mang số hiệu 390 húc đổ cổng chính Dinh Độc Lập vào trưa ngày 30 tháng 4 năm 1975, đánh dấu sự sụp đổ của chính quyền Việt Nam Cộng hòa và kết thúc cuộc chiến tranh kéo dài hơn hai thập kỷ.
        </DescriptionText>
        <DescriptionText>
          Những chiếc T-54 đã tham gia vào nhiều trận đánh quan trọng, từ Chiến dịch Đường 9 – Nam Lào năm 1971 đến Chiến dịch Quảng Trị năm 1972. Xe tăng này không chỉ là phương tiện chiến đấu mà còn là biểu tượng của ý chí và lòng dũng cảm của những người lính xe tăng Việt Nam, như{" "}
          <WikiLink 
            href="https://vi.wikipedia.org/wiki/Bùi_Quang_Thận"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anh hùng Lực lượng Vũ trang Nhân dân Bùi Quang Thận
          </WikiLink>{" "}
          – người cắm lá cờ chiến thắng trên nóc Dinh Độc Lập ngày 30/4/1975.
        </DescriptionText>
        <DescriptionText>
          Ngày nay, những chiếc xe tăng T-54 vẫn được trưng bày tại các bảo tàng và di tích lịch sử trên cả nước, nhắc nhở thế hệ sau về những chiến công oanh liệt và tinh thần chiến đấu quật cường của quân và dân Việt Nam trong sự nghiệp đấu tranh bảo vệ Tổ quốc.
        </DescriptionText>
      </>
    ),
    details: [
      { label: "Năm sản xuất", value: "1950" },
      { label: "Xuất xứ", value: "Liên Xô" },
      { label: "Loại xe", value: "Xe tăng chiến đấu" },
      { label: "Ngày nhập về bảo tàng", value: "16-03-2005" },
      { label: "Lần đầu tiên sử dụng", value: "1968" },
    ],
  };

  return (
    <ArtifactContainer>
      <Title>{artifactInfo.name}</Title>
      {artifactInfo.description}

      <DetailsTable>
        <tbody>
          {artifactInfo.details.map((detail, index) => (
            <tr key={index}>
              <LabelCell>{detail.label}</LabelCell>
              <ValueCell>{detail.value}</ValueCell>
            </tr>
          ))}
        </tbody>
      </DetailsTable>
    </ArtifactContainer>
  );
};

export default ArtifactDescription;
