import React from "react";
import "./NewsEvents.css";

const NewsEvents = () => {
  const events = [
    {
      id: 1,
      title: "Tại Sao Hiện Vật Lịch Sử Là Cửa Sổ Đến Quá Khứ",
      description:
        "Hiện vật lịch sử không chỉ là những đồ vật cổ xưa, mà còn là cánh cửa dẫn chúng ta khám phá những câu chuyện và giá trị văn hóa vượt thời gian. Hãy tìm hiểu cách các hiện vật kể lại lịch sử của nhân loại.",
      link: "#",
    },
    {
      id: 2,
      title: "Triển Lãm Nghệ Thuật Hiện Đại",
      description:
        "Cùng khám phá triển lãm nghệ thuật với những tác phẩm đỉnh cao từ các nghệ sĩ trẻ. Một chuyến hành trình đầy màu sắc và cảm hứng.",
      link: "#",
    },
    {
      id: 3,
      title: "Khám Phá Di Sản Văn Hóa",
      description:
        "Chương trình khám phá di sản văn hóa qua các hoạt động tương tác và trải nghiệm thực tế tại bảo tàng.",
      link: "#",
    },
  ];

  return (
    <div className="news-events-container">
      <div className="news-header">
        <h2>Tin Tức & Sự Kiện</h2>
        <p>
          Cập nhật các tin tức mới nhất về bảo tàng, sự kiện triển lãm, và những câu chuyện thú vị về các hiện vật lịch sử.
        </p>
        <button className="see-all-button">See All</button>
      </div>
      <div className="news-slider">
        {events.map((event) => (
          <div key={event.id} className="news-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <a href={event.link} className="read-more">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsEvents;
