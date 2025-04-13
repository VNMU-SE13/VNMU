import React, { useRef } from "react";
import styled from "styled-components";

// Styled Components
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

const TitleRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0;
  margin-right: 10px;
`;

const PodcastButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
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
  const synthRef = useRef(window.speechSynthesis);

  const artifactInfo = {
    name: "Xe tăng T-54",
    descriptionTexts: [
      "Xe tăng T-54 là một trong những biểu tượng lịch sử quan trọng gắn liền với những sự kiện hào hùng của dân tộc Việt Nam trong cuộc đấu tranh giành độc lập và thống nhất đất nước. Đây là loại xe tăng chiến đấu chủ lực do Liên Xô sản xuất, được Quân đội Nhân dân Việt Nam sử dụng rộng rãi trong thời kỳ kháng chiến chống Mỹ, đặc biệt là trong Chiến dịch Hồ Chí Minh lịch sử năm 1975.",
      "Một trong những hình ảnh mang tính biểu tượng nhất của T-54 là khoảnh khắc xe tăng mang số hiệu 390 húc đổ cổng chính Dinh Độc Lập vào trưa ngày 30 tháng 4 năm 1975, đánh dấu sự sụp đổ của chính quyền Việt Nam Cộng hòa và kết thúc cuộc chiến tranh kéo dài hơn hai thập kỷ.",
      "Những chiếc T-54 đã tham gia vào nhiều trận đánh quan trọng, từ Chiến dịch Đường 9 – Nam Lào năm 1971 đến Chiến dịch Quảng Trị năm 1972. Xe tăng này không chỉ là phương tiện chiến đấu mà còn là biểu tượng của ý chí và lòng dũng cảm của những người lính xe tăng Việt Nam, như Anh hùng Lực lượng Vũ trang Nhân dân Bùi Quang Thận – người cắm lá cờ chiến thắng trên nóc Dinh Độc Lập ngày 30/4/1975.",
      "Ngày nay, những chiếc xe tăng T-54 vẫn được trưng bày tại các bảo tàng và di tích lịch sử trên cả nước, nhắc nhở thế hệ sau về những chiến công oanh liệt và tinh thần chiến đấu quật cường của quân và dân Việt Nam trong sự nghiệp đấu tranh bảo vệ Tổ quốc."
    ],
    details: [
      { label: "Năm sản xuất", value: "1950" },
      { label: "Xuất xứ", value: "Liên Xô" },
      { label: "Loại xe", value: "Xe tăng chiến đấu" },
      { label: "Ngày nhập về bảo tàng", value: "16-03-2005" },
      { label: "Lần đầu tiên sử dụng", value: "1968" },
    ],
  };

  const speakDescription = () => {
    const synth = synthRef.current;

    // Nếu đang nói thì dừng lại
    if (synth.speaking) {
      synth.cancel();
      return;
    }

    // Tạo nội dung cần nói
    const utterance = new SpeechSynthesisUtterance(
      artifactInfo.descriptionTexts.join(" ")
    );
    utterance.lang = "vi-VN";
    utterance.rate = 1;
    synth.speak(utterance);
  };

  return (
    <ArtifactContainer>
      <TitleRow>
        <Title>{artifactInfo.name}</Title>
        <PodcastButton onClick={speakDescription}>Podcast</PodcastButton>
      </TitleRow>

      {artifactInfo.descriptionTexts.map((text, index) => (
        <DescriptionText key={index}>{text}</DescriptionText>
      ))}

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
