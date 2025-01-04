import React from "react";

const CategoryBar = ({ setCurrentPeriod, currentPeriod }) => {
  return (
    <div className="flex flex-col items-center py-4 px-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Lịch Sử Trường Hà</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentPeriod("feudal")}
          className={`px-4 py-2 rounded ${
            currentPeriod === "feudal" ? "bg-yellow-500 text-black" : "bg-gray-800 text-white"
          } hover:bg-yellow-600`}
        >
          Giai Đoạn Phong Kiến
        </button>
        <button
          onClick={() => setCurrentPeriod("modern")}
          className={`px-4 py-2 rounded ${
            currentPeriod === "modern" ? "bg-yellow-500 text-black" : "bg-gray-800 text-white"
          } hover:bg-gray-700`}
        >
          Giai Đoạn Cận Đại và Hiện Đại
        </button>
      </div>
    </div>
  );
};

export default CategoryBar;
