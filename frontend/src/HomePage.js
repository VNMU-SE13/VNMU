import React, { useState } from "react";
import Header from "./components/Home/Header"; 
import Museum from "./components/Home/Museum";
import NewsEvents from "./components/Home/NewsEvents";
import "./assets/css/HomePage.css";
import QuizAndStore from "./components/Home/QuizAndStore";
import Footer from "./components/Home/Footer";

const HomePage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearchModal = () => {
    setIsSearchOpen(false);
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
      <Header toggleSearchBar={toggleSearchBar} />

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeSearchModal}>✖</button>
            <h2>Tìm Kiếm</h2>
            <div className="search-input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm bảo tàng..."
              />
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm hiện vật..."
              />
              <button className="search-submit-button">Tìm kiếm</button>
            </div>
          </div>
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

      {/* Quiz and Store Section */}
      <section className="quiz-store-container" id="quiz">
        <QuizAndStore />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
