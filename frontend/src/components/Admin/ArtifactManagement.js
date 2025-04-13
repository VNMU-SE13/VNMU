import React, { useState } from 'react';
import styled from 'styled-components';
import { Edit, Trash } from 'lucide-react';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ArtifactManagement = () => {
  // Danh sách hiện vật giả lập
  const [artifacts, setArtifacts] = useState([
    { id: 1, name: "Artifact 1", description: "Description 1", category: "Category 1" },
    { id: 2, name: "Artifact 2", description: "Description 2", category: "Category 2" },
  ]);

  // State quản lý form nhập
  const [newArtifact, setNewArtifact] = useState({ name: "", description: "", category: "" });
  const [editingId, setEditingId] = useState(null); // ID đang chỉnh sửa

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setNewArtifact({ ...newArtifact, [e.target.name]: e.target.value });
  };

  // Thêm hiện vật
  const handleAddArtifact = () => {
    if (newArtifact.name && newArtifact.description && newArtifact.category) {
      setArtifacts([...artifacts, { id: artifacts.length + 1, ...newArtifact }]);
      setNewArtifact({ name: "", description: "", category: "" }); // Reset form
    }
  };

  // Xóa hiện vật
  const handleDeleteArtifact = (id) => {
    setArtifacts(artifacts.filter((artifact) => artifact.id !== id));
  };

  // Bắt đầu chỉnh sửa hiện vật
  const handleEditArtifact = (artifact) => {
    setNewArtifact(artifact);
    setEditingId(artifact.id);
  };

  // Cập nhật hiện vật
  const handleUpdateArtifact = () => {
    setArtifacts(artifacts.map((artifact) => (artifact.id === editingId ? { ...artifact, ...newArtifact } : artifact)));
    setEditingId(null);
    setNewArtifact({ name: "", description: "", category: "" });
  };

  return (
    <>
      {/* Form thêm & chỉnh sửa hiện vật */}
      <FormContainer>
        <Input name="name" value={newArtifact.name} onChange={handleChange} placeholder="Tên hiện vật" />
        <Input name="description" value={newArtifact.description} onChange={handleChange} placeholder="Mô tả" />
        <Input name="category" value={newArtifact.category} onChange={handleChange} placeholder="Danh mục" />
        {editingId ? (
          <Button onClick={handleUpdateArtifact}>Cập nhật</Button>
        ) : (
          <Button onClick={handleAddArtifact}>Thêm</Button>
        )}
      </FormContainer>

      {/* Bảng quản lý hiện vật */}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên hiện vật</th>
            <th>Mô tả</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {artifacts.map((artifact) => (
            <tr key={artifact.id}>
              <td>{artifact.id}</td>
              <td>{artifact.name}</td>
              <td>{artifact.description}</td>
              <td>{artifact.category}</td>
              <td>
                <Button onClick={() => handleEditArtifact(artifact)}><Edit size={16} /></Button>
                <Button onClick={() => handleDeleteArtifact(artifact.id)}><Trash size={16} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ArtifactManagement;