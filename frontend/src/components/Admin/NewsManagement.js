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

const NewsManagement = () => {
  // Danh sách tin tức giả lập
  const [news, setNews] = useState([
    { id: 1, title: "News 1", content: "Content 1", author: "Author 1" },
    { id: 2, title: "News 2", content: "Content 2", author: "Author 2" },
  ]);

  // State quản lý form nhập
  const [newNews, setNewNews] = useState({ title: "", content: "", author: "" });
  const [editingId, setEditingId] = useState(null); // ID đang chỉnh sửa

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setNewNews({ ...newNews, [e.target.name]: e.target.value });
  };

  // Thêm tin tức
  const handleAddNews = () => {
    if (newNews.title && newNews.content && newNews.author) {
      setNews([...news, { id: news.length + 1, ...newNews }]);
      setNewNews({ title: "", content: "", author: "" }); // Reset form
    }
  };

  // Xóa tin tức
  const handleDeleteNews = (id) => {
    setNews(news.filter((newsItem) => newsItem.id !== id));
  };

  // Bắt đầu chỉnh sửa tin tức
  const handleEditNews = (newsItem) => {
    setNewNews(newsItem);
    setEditingId(newsItem.id);
  };

  // Cập nhật tin tức
  const handleUpdateNews = () => {
    setNews(news.map((newsItem) => (newsItem.id === editingId ? { ...newsItem, ...newNews } : newsItem)));
    setEditingId(null);
    setNewNews({ title: "", content: "", author: "" });
  };

  return (
    <>
      {/* Form thêm & chỉnh sửa tin tức */}
      <FormContainer>
        <Input name="title" value={newNews.title} onChange={handleChange} placeholder="Tiêu đề" />
        <Input name="content" value={newNews.content} onChange={handleChange} placeholder="Nội dung" />
        <Input name="author" value={newNews.author} onChange={handleChange} placeholder="Tác giả" />
        {editingId ? (
          <Button onClick={handleUpdateNews}>Cập nhật</Button>
        ) : (
          <Button onClick={handleAddNews}>Thêm</Button>
        )}
      </FormContainer>

      {/* Bảng quản lý tin tức */}
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
          {news.map((newsItem) => (
            <tr key={newsItem.id}>
              <td>{newsItem.id}</td>
              <td>{newsItem.title}</td>
              <td>{newsItem.content}</td>
              <td>{newsItem.author}</td>
              <td>
                <Button onClick={() => handleEditNews(newsItem)}><Edit size={16} /></Button>
                <Button onClick={() => handleDeleteNews(newsItem.id)}><Trash size={16} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default NewsManagement;