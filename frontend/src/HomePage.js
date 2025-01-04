import React, { useState } from "react";
import Header from "./components/Home/Header";
import CategoryBar from "./components/Home/CategoryBar";
import ContentList from "./components/Home/ContentList";
import ImageSlider from "./components/Home/ImageSlider";

const HomePage = () => {
  const [currentPeriod, setCurrentPeriod] = useState("feudal"); // Quản lý trạng thái giai đoạn hiển thị

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <ImageSlider />
      <CategoryBar setCurrentPeriod={setCurrentPeriod} currentPeriod={currentPeriod} />
      <main className="px-6 py-4">
        <ContentList currentPeriod={currentPeriod} />
      </main>
    </div>
  );
};

export default HomePage;
