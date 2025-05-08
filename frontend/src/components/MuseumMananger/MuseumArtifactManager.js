import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import FullPageLoading from '../common/FullPageLoading'
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  background-color: #fff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const Section = styled.div`
  border-top: 1px solid #e5e7eb;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f3f4f6;
  border-radius: 12px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FileGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FileInput = styled.input`
  margin-top: 0.5rem;
  font-size: 0.95rem;
  padding: 0.4rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #fff;
  width: 100%;

  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;


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
  const [categories, setCategories] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryArtifact`)
        setCategories(res.data)
      }
      catch(err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


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
    data.append("Image", formData.image);
  
    if (formData.podcast) {
      data.append("Podcast", formData.podcast);
    }
  
    formData.images.forEach((img) => {
      data.append("images", img);
    });
  
    try {
      setLoading(true);
      let res;
  
      if (editId) {
        res = await axios.put(`${process.env.REACT_APP_API_URL}/Artifact/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setEditId(null);
        setEditArtifact(null);
      } else {
        res = await axios.post(`${process.env.REACT_APP_API_URL}/Artifact`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setShowForm(false);
      }
  
      const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/Artifact/GetAllByMuseumId?museumId=${museum.id}`);
      setArtifacts(res2.data);
      toast.success("Thao tác thành công!");
    } catch (err) {
      console.error("Lỗi khi thêm hiện vật:", err.response || err);
      toast.error("Thất bại: " + (err.response?.data || "Lỗi không xác định"));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setEditArtifact(artifacts.filter(artifact => artifact.id === id)[0])
    setShowForm(false)
    setEditId(id)
  };
 
  const handleDelete =  async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc muốn xóa hiện vật này? Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy"
    });
    if (result.isConfirmed) {
      try {
        setLoading(true)
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/Artifact/${id}`)
        if (res.status === 200) {
          setArtifacts(prev => prev.filter(artifact => artifact.id !== id))
          toast.success("Xóa hiện vật thành công");
        }
        else {
          toast.error("Lỗi không xác định: "+res.status);
        }
      }
      catch(err) {
        toast.error("Thất bại: " + (err.response?.data || "Lỗi không xác định"));
      }
      finally {
        setLoading(false)
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

  if(loading || !artifacts) return <FullPageLoading isLoading={true}/>
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

            <FormGrid>
              <FormGroup>
                <Label htmlFor="name">Tên hiện vật</Label>
                <Input id="name" name="name" required onChange={handleFormChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="dateDiscovered">Ngày phát hiện</Label>
                <Input id="dateDiscovered" name="dateDiscovered" onChange={handleFormChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="dimenson">Kích thước</Label>
                <Input id="dimenson" name="dimenson" onChange={handleFormChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="weight">Cân nặng</Label>
                <Input id="weight" name="weight" onChange={handleFormChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="material">Chất liệu</Label>
                <Input id="material" name="material" onChange={handleFormChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="function">Chức năng</Label>
                <Input id="function" name="function" onChange={handleFormChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="condition">Tình trạng</Label>
                <Input id="condition" name="condition" onChange={handleFormChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="origin">Xuất xứ</Label>
                <Input id="origin" name="origin" onChange={handleFormChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="categoryArtifactId">Mã danh mục</Label>
                <Input id="categoryArtifactId" name="categoryArtifactId" type="number" onChange={handleFormChange} />
              </FormGroup>
            </FormGrid>


            <FormGroup style={{ gridColumn: "1 / -1" }}>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea id="description" name="description" onChange={handleFormChange} />
            </FormGroup>

            <Section>
              <SectionTitle>🖼️ Hình ảnh hiện vật</SectionTitle>

              <FileGroup>
                <Label htmlFor="image">Ảnh chính</Label>
                <FileInput
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFormChange}
                />
              </FileGroup>

              <FileGroup>
                <Label htmlFor="images">Ảnh chi tiết (nhiều file)</Label>
                <FileInput
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFormChange}
                />
              </FileGroup>

              <FileGroup>
                <Label htmlFor="podcast">Hình ảnh 3D</Label>
                <FileInput
                  id="podcast"
                  name="podcast"
                  type="file"
                  accept="image/*"
                  onChange={handleFormChange}
                />
              </FileGroup>
            </Section>




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


