import React, { useState } from "react";
import Museum from "./components/Home/Museum";
import NewsEvents from "./components/Home/NewsEvents"; 
import "./assets/css/HomePage.css";

const HomePage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="homepage">
      {/* Background Video */}
      <div className="background-video-container">
        <video className="background-video" autoPlay loop muted>
          <source src="/videos/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Header */}
      <header className="homepage-header">
        <div className="logo">VNMU</div>
        <nav className="navbar">
          <a href="#intro" className="nav-link">Giới Thiệu</a>
          <a href="#museum" className="nav-link">Bảo Tàng</a>
          <a href="#news" className="nav-link">Tin Tức và Sự Kiện</a>
          <a href="#quiz" className="nav-link">Đố vui</a>
          <a href="#support" className="nav-link">Hỗ Trợ</a>
        </nav>
        <div className="actions">
          <div className="top-actions">
            <button className="action-button">Trở Thành Thành Viên</button>
            <button className="action-button">Ủng Hộ Hệ Thống</button>
          </div>
          <button className="search-button" onClick={toggleSearchBar}>
            Tìm Kiếm
          </button>
        </div>
      </header>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm bảo tàng..."
          />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm sự kiện..."
          />
          <button className="search-submit-button">Tìm kiếm</button>
        </div>
      )}

      {/* Main Content */}
      <main className="homepage-main">
        <h1 className="homepage-title">Chào mừng bạn đến với VNMU</h1>
        <p className="homepage-subtext"></p>
        <button className="visit-button">Bắt đầu chuyến tham quan</button>
      </main>

      {/* Locations and Hours Section */}
      <section className="museum-container" id="museum">
        <Museum />
      </section>

      {/* News and Events Section */}
      <section className="news-events-container" id="news">
        <NewsEvents />
      </section>
    </div>
  );
};

export default HomePage;
