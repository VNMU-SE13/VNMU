import React from "react";

const feudalPeriod = [
  { title: "Nhà Ngô", image: "image/image5.png", description: "939 - 965" },
  { title: "Nhà Đinh", image: "image/image6.jpg", description: "968 - 980" },
  { title: "Nhà Tiền Lê", image: "image/image7.png", description: "980 - 1009" },
  { title: "Nhà Lý", image: "image/image8.jpeg", description: "1009 - 1225" },
];

const modernPeriod = [
  { title: "Kháng chiến chống thực dân Pháp", image: "image/image9.jpg", description: "1858 - 1954" },
  { title: "Kháng chiến chống đế quốc Mỹ", image: "image/image10.jpeg", description: "1954 - 1975" },
  { title: "Kháng chiến chống đế quốc Nhật", image: "image/image11.jpg", description: "1940 - 1945" },
];

// Nhận `currentPeriod` từ props
const ContentList = ({ currentPeriod }) => {
  const data = currentPeriod === "feudal" ? feudalPeriod : modernPeriod;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {data.map((item, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded text-center">
          <img
            src={item.image}
            alt={item.title}
            className="w-[200px] h-[300px] object-cover mx-auto rounded mb-4"
          />
          <h2 className="text-white text-lg mb-2">{item.title}</h2>
          <p className="text-sm text-gray-400">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
