import React, { useEffect, useState } from "react";
import axios from "axios";


export default function MuseumArtifactManager({museum}) {
  const [artifacts, setArtifacts] = useState(museum.artifacts);
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
    image: null,
    images: []
  });
  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editArtifact, setEditArtifact] = useState()

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    } else if (name === "podcast" || name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if(editId) {
      if (name==="name") setEditArtifact(prev => {return {...prev, artifactName: value}})
      else setEditArtifact(prev => {return {...prev, [name]: value}})
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("Name", editId ? editArtifact.artifactName : formData.name);
    data.append("Description", editId ? editArtifact.description : formData.description);
    data.append("DateDiscovered", editId ? editArtifact.dateDiscovered : formData.dateDiscovered);
    data.append("Dimenson", editId ? editArtifact.dimenson : formData.dimenson);
    data.append("Weight", editId ? editArtifact.weight : formData.weight);
    data.append("Material", editId ? editArtifact.material : formData.material);
    data.append("Function", editId ? editArtifact.function : formData.function);
    data.append("Condition", editId ? editArtifact.condition : formData.condition);
    data.append("Origin", editId ? editArtifact.origin : formData.origin);
    data.append("MuseumId", museum.id);
    data.append("CategoryArtifactId", editId ? editArtifact.categoryArtifactId : formData.categoryArtifactId);
    data.append("Image", formData.image)

    if (formData.podcast) {
      data.append("Podcast", formData.podcast);
    }

    formData.images.forEach((img) => {
      data.append("images", img); 
    });

    console.log(data.get("Image"))
                                       
    try {
      let res
      if (editId) {
        res = await axios.put(`${process.env.REACT_APP_API_URL}/Artifact/${editId}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` ,"Content-Type": "multipart/form-data" }
        });
        setEditId(null)
        setEditArtifact(null)
      }
      else {
        res = await axios.post(`${process.env.REACT_APP_API_URL}/Artifact`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` ,"Content-Type": "multipart/form-data" }
        });
        setShowForm(false);
      }
      const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/Artifact/GetAllByMuseumId?museumId=${museum.id}`)
      setArtifacts(res2.data)
      alert("Thành công!");
    } catch (err) {
      console.error("Lỗi khi thêm hiện vật:", err.response || err);
      alert("Thêm thất bại: " + (err.response?.data || "Lỗi không xác định"));
    }
  };

  const handleEdit = (id) => {
    setEditArtifact(artifacts.filter(artifact => artifact.id === id)[0])
    setShowForm(false)
    setEditId(id)
  };
 
  const handleDelete =  async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa hiện vật này?");
    if (confirmDelete) {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/Artifact/${id}`)
        if (res.status === 200) {
          setArtifacts(prev => prev.filter(artifact => artifact.id !== id))
          alert("Xóa hiện vật thành công!")
        }
        else {
          alert("Xóa thất bại")
        }
      }
      catch(err) {
        console.log(err)
      }
    }
  };

  const resetFormData = () => {
    setFormData({
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
      image: null,
      images: []
    })
  }

  const handleCancelEdit = () => {
    setEditArtifact(null)
    setEditId(null)
    resetFormData()
  }

  const truncate = (text, maxLength = 50) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if(loading || !artifacts) return <p>Loading...</p>
  else
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <h2 style={{ color: "#9A3412", marginBottom: "1rem", fontSize: "1.5rem" }}>Hiện vật của bảo tàng</h2>

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
            <h3 style={{ color: "#78350F", marginBottom: "0.5rem" }}>🗿 Thêm hiện vật</h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}>
              <input name="name" placeholder="Tên hiện vật" style={inputStyle} required onChange={handleFormChange} />
              <input name="dateDiscovered" style={inputStyle} onChange={handleFormChange} />
              <input name="dimenson" placeholder="Kích thước" style={inputStyle} onChange={handleFormChange} />
              <input name="weight" placeholder="Cân nặng" style={inputStyle} onChange={handleFormChange} />
              <input name="material" placeholder="Chất liệu" style={inputStyle} onChange={handleFormChange} />
              <input name="function" placeholder="Chức năng" style={inputStyle} onChange={handleFormChange} />
              <input name="condition" placeholder="Tình trạng" style={inputStyle} onChange={handleFormChange} />
              <input name="origin" placeholder="Xuất xứ" style={inputStyle} onChange={handleFormChange} />
              <input name="categoryArtifactId" placeholder="Mã danh mục" type="number" style={inputStyle} onChange={handleFormChange} />
            </div>

            <textarea name="description" placeholder="Mô tả" rows="3" style={{ ...inputStyle, width: "100%" }} onChange={handleFormChange} />

            <div style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "1.5rem",
              marginTop: "1rem",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.05)"
            }}>
              <h4 style={{ color: "#1f2937", marginBottom: "1rem" }}>🖼️ Hình ảnh hiện vật</h4>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Ảnh chính</label><br />
                <input
                  name="image"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFormChange}
                  style={fileInputStyle}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Ảnh chi tiết (nhiều file)</label><br />
                <input
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFormChange}
                  style={fileInputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Hình ảnh 3D</label><br />
                <input
                  name="podcast"
                  type="file"
                  accept="image/*"
                  onChange={handleFormChange}
                  style={fileInputStyle}
                />
              </div>
            </div>


            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button type="submit" style={editBtn}>💾 Lưu</button>
              <button type="button" onClick={() => {setShowForm(false); resetFormData() }} style={deleteBtn}>❌ Huỷ</button>
            </div>
          </form>

        </div>
      )}

      {/* form update */}
      {editId && (
        <div style={modalBackdrop}>
          <form onSubmit={handleSubmit} style={modalForm}>
            <h3 style={{ color: "#78350F", marginBottom: "0.5rem" }}>🗿 Thêm hiện vật</h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}>
              <input name="name" placeholder="Tên hiện vật" style={inputStyle} value={editArtifact.artifactName} required onChange={handleFormChange} />
              <input name="dateDiscovered" style={inputStyle} value={editArtifact.dateDiscovered} onChange={handleFormChange} />
              <input name="dimenson" placeholder="Kích thước" style={inputStyle} value={editArtifact.dimenson} onChange={handleFormChange} />
              <input name="weight" placeholder="Cân nặng" style={inputStyle} value={editArtifact.weight} onChange={handleFormChange} />
              <input name="material" placeholder="Chất liệu" style={inputStyle} value={editArtifact.material} onChange={handleFormChange} />
              <input name="function" placeholder="Chức năng" style={inputStyle} value={editArtifact.function} onChange={handleFormChange} />
              <input name="condition" placeholder="Tình trạng" style={inputStyle} value={editArtifact.condition} onChange={handleFormChange} />
              <input name="origin" placeholder="Xuất xứ" style={inputStyle} value={editArtifact.origin} onChange={handleFormChange} />
              <input name="categoryArtifactId" placeholder="Mã danh mục" type="number" value={editArtifact.categoryArtifactId} style={inputStyle} onChange={handleFormChange} />
            </div>

            <textarea name="description" placeholder="Mô tả" rows="3" value={editArtifact.description} style={{ ...inputStyle, width: "100%" }} onChange={handleFormChange} />

            <div style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "1.5rem",
              marginTop: "1rem",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.05)"
            }}>
              <h4 style={{ color: "#1f2937", marginBottom: "1rem" }}>🖼️ Hình ảnh hiện vật</h4>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Ảnh chính</label><br />
                <input
                  name="image"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFormChange}
                  style={fileInputStyle}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Ảnh chi tiết (nhiều file)</label><br />
                <input
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFormChange}
                  style={fileInputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Hình ảnh 3D</label><br />
                <input
                  name="podcast"
                  type="file"
                  accept="image/*"
                  onChange={handleFormChange}
                  style={fileInputStyle}
                />
              </div>
            </div>


            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button type="submit" style={editBtn}>💾 Lưu</button>
              <button type="button" onClick={() => handleCancelEdit()} style={deleteBtn}>❌ Huỷ</button>
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
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  overflow: "hidden",
  backgroundColor: "#fff",
};

const thStyle = {
  backgroundColor: "#f97316",
  color: "#fff",
  textAlign: "left",
  padding: "12px 16px",
  fontWeight: "600",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
  verticalAlign: "top",
};

const editBtn = {
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  marginRight: "8px",
  cursor: "pointer",
  fontWeight: "500",
};

const deleteBtn = {
  backgroundColor: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  cursor: "pointer",
  fontWeight: "500",
};

const modalBackdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalForm = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  width: "90%",
  maxWidth: "700px",
  maxHeight: "90vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};


const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  outline: "none",
  fontSize: "14px",
};

const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: "0.5rem",
  color: "#374151",
};

const fileInputStyle = {
  padding: "0.5rem",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  width: "100%",
  cursor: "pointer",
};


