import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import Swal from "sweetalert2";
import axios from 'axios'

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
const VIPAvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #f59e0b,
    #e11d48,
    #6366f1,
    #10b981,
    #f59e0b
  );
  padding: 4px;
  animation: spin 4s linear infinite;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.6);

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const VIPAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 16px 6px rgba(255, 215, 0, 0.6);
  }
`;

const UserProfile = ({ user: propUser, onLogout }) => {
  const navigate = useNavigate();
  const { translated } = useContext(LanguageContext);

  const [userInfo, setUserInfo] = useState();
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState()

  const [isVip, setIsVip] = useState(localStorage.getItem('isPremium')); /////Luôn là vip

  const fileInputRef = useRef();

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/User/Profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },

      })
      console.log("✅ Dữ liệu trả về từ /User/Profile:", res.data);
      setUserInfo(res.data)
      setPhone(res.data.phoneNumber)
      setAddress(res.data.address)
      setAvatar(res.data.image)
      setLoading(false)
      // setIsVip(res.data.isVip); // nếu backend có trả về isVip

    }

    fetchData()

  }, []);

  const handleSave = async () => {
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.");
      return;
    } else {
      setPhoneError(""); // Xóa lỗi nếu hợp lệ
    }

    const formData = new FormData();
    formData.append("phoneNumber", phone);
    formData.append("address", address);
    formData.append("image", image ? image : avatar);

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/User/UpdateUserInfo?phoneNumber=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      Swal.fire("Đã lưu!", "Thông tin cá nhân đã được cập nhật.", "success");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      Swal.fire("Lỗi", "Không thể cập nhật thông tin. Vui lòng thử lại.", "error");
    }
  };


  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    setImage(e.target.files[0])
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // Base64
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <p>Loading...</p>
  else
    return (
      <ProfileWrapper>
        <div style={{ textAlign: "center" }}>
          {isVip ? (
            <VIPAvatarWrapper onClick={handleAvatarClick}>
              <VIPAvatar src={avatar} alt="VIP Avatar" />
            </VIPAvatarWrapper>
          ) : (
            <Avatar
              src={avatar}
              alt="Avatar"
              onClick={handleAvatarClick}
            />
          )}

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <UserName style={{ color: isVip ? "#f59e0b" : "#1f2937", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
            {userInfo.usernmae}
            {isVip && (
              <span style={{
                fontSize: "1.5rem",
                animation: "crownGlow 1.5s infinite alternate"
              }}>
                👑
              </span>
            )}
          </UserName>
          <Email>{userInfo.email}</Email>
        </div>

        <div>
          <Label>📷 URL ảnh đại diện (nếu có sẵn)</Label>

          <Label>📞 Số điện thoại</Label>

          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại"
          />
          {phoneError && <p style={{ color: "red", marginTop: "-10px", fontSize: "14px" }}>{phoneError}</p>}


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
          <ProfileButton color="#ef4444" onClick={() => navigate("/")}>
            🚪 Quay lại
          </ProfileButton>
        </ButtonGroup>
      </ProfileWrapper>
    );
};

export default UserProfile;
