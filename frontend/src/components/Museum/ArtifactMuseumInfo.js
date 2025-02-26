import React from "react";
import "../../assets/css/ArtifactMuseumInfo.css";

const ArtifactMuseumInfo = () => {
  // Dữ liệu cứng của bảo tàng
  const museumInfo = {
    avatar: "/image/BT-QK5.jpg", 
    name: "Bảo tàng Quân khu 5",
    status: "Online 1 Giờ Trước",
    favoriteButtonText: "Yêu Thích",
    chatButtonText: "Chat Ngay",
    shopButtonText: "Xem Bảo tàng",
    rating: "5k",
    productCount: 534,

    joinTime: "20 tháng trước",
    followerCount: "20,3k",
  };

  return (
    <div className="artifact-museum-info">
      <div className="museum-info">
        <img src={museumInfo.avatar} alt={museumInfo.name} className="museum-avatar" />
        <div className="museum-details">
          <h3 className="museum-name">{museumInfo.name}</h3>
          <p className="museum-status">{museumInfo.status}</p>
        </div>
      </div>

      <div className="museum-actions">
        <button className="btn favorite-btn">{museumInfo.favoriteButtonText}</button>
        <button className="btn chat-btn">{museumInfo.chatButtonText}</button>
        <button className="btn shop-btn">{museumInfo.shopButtonText}</button>
      </div>

      <div className="museum-stats">
        <div className="stat-item">
        Đánh Giá <strong>{museumInfo.rating}</strong> 
        </div>
        <div className="stat-item">
        Hiện vật <strong>{museumInfo.productCount}</strong> 
        </div>

      </div>

      <div className="museum-followers">
        <div className="followers-item">
         Tham Gia  <strong>{museumInfo.joinTime}</strong> 
        </div>
        <div className="followers-item">
        Người Theo Dõi <strong>{museumInfo.followerCount}</strong> 
        </div>
      </div>
    </div>
  );
};

export default ArtifactMuseumInfo;
