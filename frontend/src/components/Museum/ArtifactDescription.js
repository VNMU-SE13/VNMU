import React from "react";
import "../../assets/css/ArtifactDescription.css"; // Add CSS file for styling

const ArtifactDescription = () => {
  const artifactInfo = {
    name: "Xe tăng T-54",
    description: `Xe tăng T-54 là một trong những dòng xe tăng chiến đấu chủ lực nổi bật của Liên Xô, được phát triển từ cuối Thế chiến thứ hai và trở thành nền tảng cho nhiều biến thể sau này. Xe được thiết kế với giáp dày, hỏa lực mạnh cùng khả năng cơ động cao, phù hợp với nhiều điều kiện chiến đấu khác nhau.\n\nĐặc điểm chính:\n- Vũ khí chính: Pháo 100mm D-10T có độ chính xác cao, sức xuyên giáp mạnh, phù hợp để đối đầu với các loại xe tăng địch.\n- Hỏa lực phụ trợ: Súng máy đồng trục 7,62mm và súng máy phòng không 12,7mm giúp tăng khả năng chống bộ binh và máy bay tầm thấp.\n- Giáp bảo vệ: Giáp thép dày, thiết kế vát nghiêng giúp tăng khả năng chống đạn xuyên giáp.\n- Động cơ: Động cơ diesel mạnh mẽ, công suất khoảng 520 mã lực, giúp xe đạt tốc độ tối đa lên đến 50 km/h trên địa hình bằng phẳng.\n- Khả năng cơ động: Hệ thống treo tốt, di chuyển linh hoạt trên nhiều địa hình khác nhau, từ đường trường, rừng núi đến đầm lầy.`,
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
