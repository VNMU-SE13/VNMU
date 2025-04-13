// filepath: /D:/ĐATN/VNMU/frontend/src/components/Admin/UserManagementTable.js
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

const UserManagement = () => {
  // Danh sách tài khoản giả lập
  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "admin@example.com", role: "Admin" },
    { id: 2, username: "user1", email: "user1@example.com", role: "User" },
  ]);

  // State quản lý form nhập
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "" });
  const [editingId, setEditingId] = useState(null); // ID đang chỉnh sửa

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Thêm tài khoản
  const handleAddUser = () => {
    if (newUser.username && newUser.email) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ username: "", email: "", role: "User" }); // Reset form
    }
  };

  // Xóa tài khoản
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Bắt đầu chỉnh sửa tài khoản
  const handleEditUser = (user) => {
    setNewUser(user);
    setEditingId(user.id);
  };

  // Cập nhật tài khoản
  const handleUpdateUser = () => {
    setUsers(users.map((user) => (user.id === editingId ? { ...user, ...newUser } : user)));
    setEditingId(null);
    setNewUser({ username: "", email: "", role: "" });
  };

  return (
    <>
      {/* Form thêm & chỉnh sửa tài khoản */}
      <FormContainer>
        <Input name="username" value={newUser.username} onChange={handleChange} placeholder="Tên tài khoản" />
        <Input name="email" value={newUser.email} onChange={handleChange} placeholder="Email" />
        <Input name="role" value={newUser.role} onChange={handleChange} placeholder="Vai trò" />
        {editingId ? (
          <Button onClick={handleUpdateUser}>Cập nhật</Button>
        ) : (
          <Button onClick={handleAddUser}>Thêm</Button>
        )}
      </FormContainer>

      {/* Bảng quản lý tài khoản */}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên tài khoản</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button onClick={() => handleEditUser(user)}><Edit size={16} /></Button>
                <Button onClick={() => handleDeleteUser(user.id)}><Trash size={16} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserManagement;