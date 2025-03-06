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

const BlogManagement = () => {
  // Danh sách blog giả lập
  const [blogs, setBlogs] = useState([
    { id: 1, title: "Blog 1", content: "Content 1", author: "Author 1" },
    { id: 2, title: "Blog 2", content: "Content 2", author: "Author 2" },
  ]);

  // State quản lý form nhập
  const [newBlog, setNewBlog] = useState({ title: "", content: "", author: "" });
  const [editingId, setEditingId] = useState(null); // ID đang chỉnh sửa

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  // Thêm blog
  const handleAddBlog = () => {
    if (newBlog.title && newBlog.content && newBlog.author) {
      setBlogs([...blogs, { id: blogs.length + 1, ...newBlog }]);
      setNewBlog({ title: "", content: "", author: "" }); // Reset form
    }
  };

  // Xóa blog
  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  // Bắt đầu chỉnh sửa blog
  const handleEditBlog = (blog) => {
    setNewBlog(blog);
    setEditingId(blog.id);
  };

  // Cập nhật blog
  const handleUpdateBlog = () => {
    setBlogs(blogs.map((blog) => (blog.id === editingId ? { ...blog, ...newBlog } : blog)));
    setEditingId(null);
    setNewBlog({ title: "", content: "", author: "" });
  };

  return (
    <>
      {/* Form thêm & chỉnh sửa blog */}
      <FormContainer>
        <Input name="title" value={newBlog.title} onChange={handleChange} placeholder="Tiêu đề" />
        <Input name="content" value={newBlog.content} onChange={handleChange} placeholder="Nội dung" />
        <Input name="author" value={newBlog.author} onChange={handleChange} placeholder="Tác giả" />
        {editingId ? (
          <Button onClick={handleUpdateBlog}>Cập nhật</Button>
        ) : (
          <Button onClick={handleAddBlog}>Thêm</Button>
        )}
      </FormContainer>

      {/* Bảng quản lý blog */}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Tác giả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.content}</td>
              <td>{blog.author}</td>
              <td>
                <Button onClick={() => handleEditBlog(blog)}><Edit size={16} /></Button>
                <Button onClick={() => handleDeleteBlog(blog.id)}><Trash size={16} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default BlogManagement;