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

const EventManagement = () => {
  // Danh sách sự kiện giả lập
  const [events, setEvents] = useState([
    { id: 1, name: "Event 1", date: "2025-03-01", location: "Location 1" },
    { id: 2, name: "Event 2", date: "2025-03-15", location: "Location 2" },
  ]);

  // State quản lý form nhập
  const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "" });
  const [editingId, setEditingId] = useState(null); // ID đang chỉnh sửa

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Thêm sự kiện
  const handleAddEvent = () => {
    if (newEvent.name && newEvent.date && newEvent.location) {
      setEvents([...events, { id: events.length + 1, ...newEvent }]);
      setNewEvent({ name: "", date: "", location: "" }); // Reset form
    }
  };

  // Xóa sự kiện
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Bắt đầu chỉnh sửa sự kiện
  const handleEditEvent = (event) => {
    setNewEvent(event);
    setEditingId(event.id);
  };

  // Cập nhật sự kiện
  const handleUpdateEvent = () => {
    setEvents(events.map((event) => (event.id === editingId ? { ...event, ...newEvent } : event)));
    setEditingId(null);
    setNewEvent({ name: "", date: "", location: "" });
  };

  return (
    <>
      {/* Form thêm & chỉnh sửa sự kiện */}
      <FormContainer>
        <Input name="name" value={newEvent.name} onChange={handleChange} placeholder="Tên sự kiện" />
        <Input name="date" value={newEvent.date} onChange={handleChange} placeholder="Ngày" />
        <Input name="location" value={newEvent.location} onChange={handleChange} placeholder="Địa điểm" />
        {editingId ? (
          <Button onClick={handleUpdateEvent}>Cập nhật</Button>
        ) : (
          <Button onClick={handleAddEvent}>Thêm</Button>
        )}
      </FormContainer>

      {/* Bảng quản lý sự kiện */}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sự kiện</th>
            <th>Ngày</th>
            <th>Địa điểm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>
                <Button onClick={() => handleEditEvent(event)}><Edit size={16} /></Button>
                <Button onClick={() => handleDeleteEvent(event.id)}><Trash size={16} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default EventManagement;