import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const fadeInUp = keyframes`from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); }`;
const fadeInDown = keyframes`from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); }`;

const MuseumContent = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
`;

const MuseumTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  animation: ${fadeInDown} 1s ease-in-out;
`;

const MuseumInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const MuseumTextWithMap = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const TextColumn = styled.div`
  flex: 1;
  min-width: 250px;
`;

const MapBox = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 300px;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10px;
  }
`;

const MuseumImage = styled.div`
  flex: 1;
  max-width: 400px;
  display: flex;
  justify-content: center;
  animation: ${fadeInUp} 1.5s ease-in-out;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 6px;
  color: #c8102e;
  text-align: left;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const Text = styled.p`
  font-size: 16px;
  color: #444;
  margin-bottom: 15px;
  line-height: 1.8;
  text-align: justify;
  animation: ${fadeInUp} 1.5s ease-in-out;
`;

const MyMuseum = () => {
  const [museum, setMuseum] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({});

  useEffect(() => {
    const fetchMyMuseum = async () => {
      try {
        const museumId = localStorage.getItem("museumId");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Museum/2`);
        setMuseum(res.data);
      } catch (err) {
        console.error("Lỗi khi fetch thông tin bảo tàng:", err);
      }
    };
    fetchMyMuseum();
  }, []);

  const handleEditField = (field) => {
    setEdited((prev) => ({ ...prev, [field]: museum[field] }));
  };

  const handleFieldChange = (field, value) => {
    setEdited((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEdited({});
  };

  const handleSave = async () => {
    try {
      const updatedMuseum = { ...museum, ...edited };
      await axios.put(`${process.env.REACT_APP_API_URL}/Museum/1`, updatedMuseum);
      setMuseum(updatedMuseum);
      setIsEditing(false);
      setEdited({});
      alert("Cập nhật thành công!");
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Cập nhật thất bại.");
    }
  };

  if (!museum) return <p>Đang tải dữ liệu bảo tàng...</p>;

  return (
    <MuseumContent>
      <MuseumTitle>{museum.name}</MuseumTitle>

      <MuseumInfo>
        <MuseumTextWithMap>
          <TextColumn>
            <SectionTitle>
              Giờ mở cửa: 8h {isEditing && !edited.closed && (
                <span onClick={() => handleEditField("closed")} style={{ cursor: "pointer", color: "#888" }}>🖊</span>
              )}
            </SectionTitle>
            {!isEditing || !edited.closed ? (
              <Text><strong>Đóng cửa: </strong> 17h</Text>
            ) : (
              <>
                <label>Đóng cửa:</label>{" "}
                <input
                  value={edited.closed}
                  onChange={(e) => handleFieldChange("closed", e.target.value)}
                  style={{ padding: "4px", width: "100%" }}
                />
              </>
            )}

            <SectionTitle>
              Địa chỉ {isEditing && !edited.location && (
                <span onClick={() => handleEditField("location")} style={{ cursor: "pointer", color: "#888" }}>🖊</span>
              )}
            </SectionTitle>
            {!isEditing || !edited.location ? (
              <Text>{museum.location}</Text>
            ) : (
              <input
                value={edited.location}
                onChange={(e) => handleFieldChange("location", e.target.value)}
                style={{ padding: "4px", width: "100%" }}
              />
            )}

            <SectionTitle>
              Mô tả chi tiết {isEditing && !edited.description && (
                <span onClick={() => handleEditField("description")} style={{ cursor: "pointer", color: "#888" }}>🖊</span>
              )}
            </SectionTitle>
            {!isEditing || !edited.description ? (
              <Text>{museum.description}</Text>
            ) : (
              <textarea
                value={edited.description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                style={{ padding: "6px", width: "100%", height: "100px" }}
              />
            )}
          </TextColumn>

          <MuseumImage>
            <img src={museum.image} alt={museum.name} />
          </MuseumImage>
        </MuseumTextWithMap>
      </MuseumInfo>

      <MapBox>
        <iframe
          title="Google Map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(museum.location)}&output=embed`}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </MapBox>

      {!isEditing ? (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button onClick={() => setIsEditing(true)} style={editButtonStyle}>✏️ Chỉnh sửa</button>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button onClick={handleSave} style={saveButtonStyle}>💾 Lưu</button>
          <button onClick={handleCancel} style={cancelButtonStyle}>❌ Đóng</button>
        </div>
      )}
    </MuseumContent>
  );
};

const editButtonStyle = {
  background: "#facc15",
  border: "none",
  padding: "10px 20px",
  fontSize: "1rem",
  borderRadius: "8px",
  cursor: "pointer"
};

const saveButtonStyle = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "10px 20px",
  fontSize: "1rem",
  borderRadius: "8px",
  marginRight: "1rem",
  cursor: "pointer"
};

const cancelButtonStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 20px",
  fontSize: "1rem",
  borderRadius: "8px",
  cursor: "pointer"
};

export default MyMuseum;
