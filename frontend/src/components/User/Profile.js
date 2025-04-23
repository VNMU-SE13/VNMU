import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import Swal from "sweetalert2";

const ProfileWrapper = styled.div`
  max-width: 700px;
  margin: 4rem auto;
  padding: 2.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", sans-serif;
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 999px;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #f59e0b;
  cursor: pointer;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 0.25rem 0 1rem 0;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
  margin-top: 1rem;
  display: block;
  color: #374151;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  color: #1f2937;
`;

const Email = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const Points = styled.div`
  font-size: 1rem;
  color: #374151;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const ProfileButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ color }) => color || "#f59e0b"};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ color }) =>
      color === "#ef4444" ? "#dc2626" : "#d97706"};
    transform: scale(1.05);
  }
`;

const UserProfile = ({ user: propUser, onLogout }) => {
  const navigate = useNavigate();
  const { translated } = useContext(LanguageContext);

  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(
    propUser || (storedUser ? JSON.parse(storedUser) : null)
  );

  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const fileInputRef = useRef();

  useEffect(() => {
    if (!user) {
      console.warn("⚠️ Chưa có user trong localStorage!");
    } else {
      console.log("✅ Đã lấy user từ localStorage:", user);
    }
  }, [user]);

  if (!user) return <div style={{ textAlign: "center" }}>Chưa đăng nhập</div>;

  const handleSave = () => {
    const updatedUser = {
      ...user,
      phone,
      address,
      avatar,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    Swal.fire("Đã lưu!", "Thông tin cá nhân đã được cập nhật.", "success");
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // Base64
    };
    reader.readAsDataURL(file);
  };

  return (
    <ProfileWrapper>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src={avatar || "/image/default-avatar.png"}
          alt="Avatar"
          onClick={handleAvatarClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleAvatarChange}
        />
        <UserName>{user.userName}</UserName>
        <Email>{user.email}</Email>
        <Points>🎯 Điểm tích lũy: {user.point || 0}</Points>
      </div>

      <div>
        <Label>📷 URL ảnh đại diện (nếu có sẵn)</Label>
        <Input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Nhập link ảnh đại diện"
        />

        <Label>📞 Số điện thoại</Label>
        <Input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
        />

        <Label>🏠 Địa chỉ</Label>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ"
        />
      </div>

      <ButtonGroup>
        <ProfileButton onClick={handleSave}>💾 Lưu thay đổi</ProfileButton>
        <ProfileButton onClick={() => navigate("/edit-profile")}>
          ✏️ Chỉnh sửa hồ sơ
        </ProfileButton>
        <ProfileButton color="#ef4444" onClick={onLogout}>
          🚪 Đăng xuất
        </ProfileButton>
      </ButtonGroup>
    </ProfileWrapper>
  );
};

export default UserProfile;
