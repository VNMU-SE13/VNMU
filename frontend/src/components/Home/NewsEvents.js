import React, { useState } from "react";
import "../../assets/css/NewsEvents.css";

const NewsEvents = () => {
  const events = [
    {
      id: 1,
      title: "Tại Sao Hiện Vật Lịch Sử Là Cửa Sổ Đến Quá Khứ",
      description: "Hiện vật lịch sử không chỉ đơn thuần là những đồ vật cũ kỹ, mà chúng chứa đựng những giá trị vượt thời gian. Mỗi hiện vật đều mang một câu chuyện độc đáo, từ những cuộc chiến tranh oai hùng, những lễ hội truyền thống rực rỡ, cho đến đời sống thường nhật của con người qua các thời kỳ. Chúng là cánh cửa giúp chúng ta du hành về quá khứ, cảm nhận sự kết nối giữa hiện tại và lịch sử.",
      link: "#"
    },
    {
      id: 2,
      title: "Triển Lãm Nghệ Thuật Hiện Đại",
      description: "Triển lãm nghệ thuật hiện đại là sân chơi dành cho các nghệ sĩ trẻ tài năng, nơi họ thể hiện sự sáng tạo vô biên qua các tác phẩm đầy màu sắc và ý tưởng táo bạo. Không gian triển lãm không chỉ dừng lại ở việc trưng bày, mà còn là nơi để khán giả tương tác trực tiếp, cảm nhận sâu sắc tinh thần nghệ thuật hiện đại. Đây là cơ hội để khám phá sự độc đáo trong từng góc nhìn của nghệ thuật đương đại.",
      link: "#"
    },
    {
      id: 3,
      title: "Khám Phá Di Sản Văn Hóa",
      description: "Khám phá di sản văn hóa là cơ hội tuyệt vời để chúng ta tìm hiểu sâu hơn về giá trị truyền thống. Qua các hoạt động tương tác như làm đồ thủ công, tham gia trình diễn văn nghệ, và xem các hiện vật quý giá, bạn sẽ có một góc nhìn sâu sắc hơn về lịch sử và văn hóa của dân tộc. Đây cũng là dịp để bạn trải nghiệm một cách chân thực những nét đẹp văn hóa không thể lãng quên.",
      link: "#"
    },
    {
      id: 4,
      title: "Lịch Sử Bảo Tàng Việt Nam",
      description: "Lịch sử bảo tàng tại Việt Nam là một hành trình dài đầy biến động. Từ những bảo tàng đầu tiên được xây dựng trong thời kỳ thuộc địa, đến sự phát triển vượt bậc trong thời kỳ hiện đại, mỗi bảo tàng là một phần của lịch sử. Đây là nơi lưu giữ những hiện vật, tư liệu quý giá, và là cầu nối giữa quá khứ và hiện tại, giúp thế hệ trẻ hiểu hơn về cội nguồn văn hóa.",
      link: "#"
    },
    {
      id: 5,
      title: "Bí Mật Của Những Tác Phẩm Nghệ Thuật Cổ",
      description: "Những tác phẩm nghệ thuật cổ luôn ẩn chứa nhiều bí mật chưa được hé lộ. Từ những nét chạm trổ tinh xảo trên các bức tượng, cho đến ý nghĩa ẩn dụ trong các bức tranh, mỗi tác phẩm đều là một câu chuyện đầy cuốn hút. Qua những khám phá mới, chúng ta dần dần hiểu rõ hơn về ý nghĩa của các tác phẩm này, đồng thời cảm nhận được giá trị trường tồn của nghệ thuật cổ.",
      link: "#"
    },
    {
      id: 6,
      title: "Công Nghệ Hiện Đại Tại Bảo Tàng",
      description: "Công nghệ hiện đại đang thay đổi cách chúng ta trải nghiệm bảo tàng. Từ việc áp dụng thực tế ảo tăng cường (AR) để khám phá các hiện vật, cho đến việc sử dụng AI để phục hồi những hiện vật bị hư hại, công nghệ đang mang lại trải nghiệm tương tác đầy thú vị cho khách tham quan. Bảo tàng không còn là nơi trưng bày tĩnh lặng, mà là một không gian sống động để học hỏi và khám phá.",
      link: "#"
    }
  ];

  const [startIndex, setStartIndex] = useState(0); // Index bắt đầu hiển thị
  const itemsPerPage = 3; // Số ô vuông hiển thị mỗi lượt

  const handleNext = () => {
    if (startIndex + itemsPerPage < events.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const visibleEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="news-events-container">
      <div className="news-header">
        <h2>Tin Tức & Sự Kiện</h2>
        <p>
          Cập nhật các tin tức mới nhất về bảo tàng, sự kiện triển lãm, và những câu chuyện thú vị về các hiện vật lịch sử.
        </p>
        <button className="see-all-button">See All</button>
      </div>
      <div className="news-content">
        {/* Nút mũi tên trái */}
        <button className="scroll-button prev" onClick={handlePrev} disabled={startIndex === 0}>
          &lt;
        </button>

        {/* Slider */}
        <div className="news-slider">
          {visibleEvents.map((event) => (
            <div key={event.id} className="news-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <a href={event.link} className="read-more">Read More</a>
            </div>
          ))}
        </div>

        {/* Nút mũi tên phải */}
        <button className="scroll-button next" onClick={handleNext} disabled={startIndex + itemsPerPage >= events.length}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default NewsEvents;
