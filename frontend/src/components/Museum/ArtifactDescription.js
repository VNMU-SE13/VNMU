import React from "react";
import "../../assets/css/ArtifactDescription.css"; // Add CSS file for styling

const ArtifactDescription = () => {
  const artifactInfo = {
    name: "Xe tăng T-54",
    description: `Xe tăng T-54 là một trong những biểu tượng lịch sử quan trọng gắn liền với những sự kiện hào hùng của dân tộc Việt Nam trong cuộc đấu tranh giành độc lập và thống nhất đất nước. Đây là loại xe tăng chiến đấu chủ lực do Liên Xô sản xuất, được Quân đội Nhân dân Việt Nam sử dụng rộng rãi trong thời kỳ kháng chiến chống Mỹ, đặc biệt là trong Chiến dịch Hồ Chí Minh lịch sử năm 1975. Một trong những hình ảnh mang tính biểu tượng nhất của T-54 là khoảnh khắc xe tăng mang số hiệu 390 húc đổ cổng chính Dinh Độc Lập vào trưa ngày 30 tháng 4 năm 1975, đánh dấu sự sụp đổ của chính quyền Việt Nam Cộng hòa và kết thúc cuộc chiến tranh kéo dài hơn hai thập kỷ.

Những chiếc T-54 đã tham gia vào nhiều trận đánh quan trọng trong lịch sử quân sự Việt Nam, từ Chiến dịch Đường 9 – Nam Lào năm 1971 đến Chiến dịch Quảng Trị năm 1972. Các xe tăng này không chỉ là phương tiện chiến đấu mà còn là biểu tượng của ý chí và lòng dũng cảm của những người lính xe tăng Việt Nam, như Anh hùng Lực lượng Vũ trang Nhân dân Bùi Quang Thận – người cắm lá cờ chiến thắng trên nóc Dinh Độc Lập ngày 30/4/1975.

Ngày nay, những chiếc xe tăng T-54 vẫn được trưng bày tại các bảo tàng và di tích lịch sử trên cả nước, nhắc nhở thế hệ sau về những chiến công oanh liệt và tinh thần chiến đấu quật cường của quân và dân Việt Nam trong sự nghiệp đấu tranh bảo vệ Tổ quốc.`,
    details: [
      { label: "Năm sản xuất", value: "1950" },
      { label: "Xuất xứ", value: "Liên Xô" },
      { label: "Loại xe", value: "Xe tăng chiến đấu" },
    ],
  };

  return (
    <div className="artifact-description">
      <h3>{artifactInfo.name}</h3>
      <p>{artifactInfo.description}</p>

      <table className="artifact-details-table">
        <tbody>
          {artifactInfo.details.map((detail, index) => (
            <tr key={index}>
              <td className="detail-label">{detail.label}</td>
              <td className="detail-value">{detail.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtifactDescription;
