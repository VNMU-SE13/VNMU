import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MuseumArtifactManager() {
  const [artifacts, setArtifacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    podcast: null,
    dateDiscovered: "",
    dimenson: "",
    weight: "",
    material: "",
    function: "",
    condition: "",
    origin: "",
    categoryArtifactId: "",
    images: [],
  });

  const museumId = parseInt(localStorage.getItem("museumId")); // Ensure it's a number

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifacts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Artifact`);
      setArtifacts(res.data);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu hiện vật:", err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    } else if (name === "podcast") {
      setFormData({ ...formData, podcast: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("Name", formData.name);
    data.append("Description", formData.description);
    data.append("DateDiscovered", formData.dateDiscovered);
    data.append("Dimenson", formData.dimenson);
    data.append("Weight", formData.weight);
    data.append("Material", formData.material);
    data.append("Function", formData.function);
    data.append("Condition", formData.condition);
    data.append("Origin", formData.origin);
    data.append("MuseumId", museumId);
    data.append("CategoryArtifactId", formData.categoryArtifactId);

    if (formData.podcast) {
      data.append("Podcast", formData.podcast);
    }

    formData.images.forEach((img) => {
      data.append("Image", img); // Name must be exactly 'Image'
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/Artifact`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Thêm hiện vật thành công!");
      setShowForm(false);
      fetchArtifacts();
    } catch (err) {
      console.error("Lỗi khi thêm hiện vật:", err.response || err);
      alert("Thêm thất bại: " + (err.response?.data || "Lỗi không xác định"));
    }
  };

  const handleEdit = (id) => {
    alert(`Chỉnh sửa hiện vật có ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa hiện vật này?");
    if (confirmDelete) {
      console.log("Xoá hiện vật ID:", id);
    }
  };

  const truncate = (text, maxLength = 50) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#9A3412", marginBottom: "1rem" }}>Hiện vật của bảo tàng</h2>

      <button onClick={() => setShowForm(true)} style={{ ...editBtn, marginBottom: "1rem" }}>
        ➕ Thêm hiện vật
      </button>

      {artifacts.length === 0 ? (
        <p>Chưa có hiện vật nào</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Ảnh</th>
              <th style={thStyle}>Tên hiện vật</th>
              <th style={thStyle}>Mô tả</th>
              <th style={thStyle}>Ngày phát hiện</th>
              <th style={thStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {artifacts.map((item, index) => (
              <tr key={item.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>
                  <img
                    src={item.image}
                    alt={item.artifactName}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                  />
                </td>
                <td style={tdStyle}>{item.artifactName}</td>
                <td style={tdStyle}>{truncate(item.description || "Không có mô tả")}</td>
                <td style={tdStyle}>{item.dateDiscovered}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleEdit(item.id)} style={editBtn}>✏️ Sửa</button>
                  <button onClick={() => handleDelete(item.id)} style={deleteBtn}>🗑️ Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div style={modalBackdrop}>
          <form onSubmit={handleSubmit} style={modalForm}>
            <h3 style={{ color: "#78350F" }}>Thêm hiện vật</h3>

            <input name="name" placeholder="Tên hiện vật" required onChange={handleFormChange} />
            <textarea name="description" placeholder="Mô tả" onChange={handleFormChange} />
            <input name="dateDiscovered" type="date" onChange={handleFormChange} />
            <input name="dimenson" placeholder="Kích thước" onChange={handleFormChange} />
            <input name="weight" placeholder="Cân nặng" onChange={handleFormChange} />
            <input name="material" placeholder="Chất liệu" onChange={handleFormChange} />
            <input name="function" placeholder="Chức năng" onChange={handleFormChange} />
            <input name="condition" placeholder="Tình trạng" onChange={handleFormChange} />
            <input name="origin" placeholder="Xuất xứ" onChange={handleFormChange} />
            <input name="categoryArtifactId" placeholder="Mã danh mục" type="number" onChange={handleFormChange} />

            <label>Ảnh (nhiều file)</label>
            <input name="images" type="file" multiple accept="image/*" onChange={handleFormChange} />

            <label>Podcast (file âm thanh)</label>
            <input name="podcast" type="file" accept="audio/*" onChange={handleFormChange} />

            <div style={{ marginTop: "1rem" }}>
              <button type="submit" style={editBtn}>Lưu</button>
              <button type="button" onClick={() => setShowForm(false)} style={deleteBtn}>Huỷ</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ========================= STYLE =========================

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "Segoe UI, sans-serif",
  backgroundColor: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
};

const thStyle = {
  backgroundColor: "#FEF3C7",
  color: "#78350F",
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "2px solid #FACC15",
  borderRight: "1px solid #FDE68A"
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #f4f4f4",
  borderRight: "1px solid #eee",
  verticalAlign: "middle"
};

const editBtn = {
  marginRight: "8px",
  backgroundColor: "#FCD34D",
  color: "#78350F",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  cursor: "pointer"
};

const deleteBtn = {
  backgroundColor: "#F87171",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  cursor: "pointer"
};

const modalBackdrop = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const modalForm = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "10px",
  width: "480px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};
