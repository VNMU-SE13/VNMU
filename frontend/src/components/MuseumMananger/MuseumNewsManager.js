import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import toDateTime from "../../utils/toDateTime";

const Wrapper = styled.div`
  padding: 1rem;
  font-family: "Segoe UI", sans-serif;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #b71c1c;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-size: 0.92rem;
  table-layout: fixed;
`;

const Thead = styled.thead`
  background: #ffebee;
`;

const Th = styled.th`
  padding: 14px 10px;
  color: #b71c1c;
  font-weight: 600;
  border: 1px solid #ef9a9a;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #f4f4f4;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3.2em;
  line-height: 1.6em;
  word-break: break-word;
`;
const Btn = styled.button`
  background: #fbc02d;
  color: #333;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  margin-right: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #f9a825;
  }
`;

const DeleteBtn = styled(Btn)`
  background: #ef5350;
  color: white;

  &:hover {
    background: #e53935;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function MuseumNewsManager({museum}) {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    image: null,
    location: "",
    hashtagDto: [],
    hashtagInput: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Event`);
      setEvents(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách sự kiện:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddHashtag = () => {
    if (formData.hashtagInput.trim()) {
      setFormData({
        ...formData,
        hashtagDto: [...formData.hashtagDto, formData.hashtagInput.trim()],
        hashtagInput: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Name", formData.name);
    data.append("Description", formData.description);
    data.append("StartDate", formData.startDate);
    data.append("EndDate", formData.endDate);
    data.append("Location", formData.location);
    data.append("MuseumId", museum.id);
    if (formData.image) {
      data.append("Image", formData.image);
    }
    formData.hashtagDto.forEach(tag => {
      data.append("hashtagDto", tag);
    });

    console.log(data.getAll('hashtagDto'))

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/Event`, data);
      alert("Thêm sự kiện thành công!");
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      console.error("Lỗi khi thêm sự kiện:", err.response || err);
      alert("Thêm thất bại");
    }
  };

  return (
    <Wrapper>
      <Title>Quản lý tin tức bảo tàng</Title>

      <Btn onClick={() => setShowForm(true)}>➕ Thêm sự kiện</Btn>

      <Table>
        <Thead>
          <tr>
            <Th>#</Th>
            <Th>Tên sự kiện</Th>
            <Th>Mô tả</Th>
            <Th>Thời gian</Th>
            <Th>Địa điểm</Th>
            <Th>Thao tác</Th>
          </tr>
        </Thead>
        <tbody>
          {events.map((event, idx) => (
            <tr key={event.id}>
              <Td>{idx + 1}</Td>
              <Td>{event.name}</Td>
              <Td>
                <Description>{event.description}</Description>
              </Td>
              <Td>
                {toDateTime(event.startDate)} - {toDateTime(event.endDate)}
              </Td>
              <Td>{event.location}</Td>
              <Td>
                <Btn onClick={() => alert(`Sửa ID: ${event.id}`)}>✏️</Btn>
                <DeleteBtn onClick={() => alert(`Xóa ID: ${event.id}`)}>🗑️</DeleteBtn>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <ModalBackdrop>
          <ModalForm onSubmit={handleSubmit}>
            <h3>Thêm sự kiện mới</h3>
            <input name="name" placeholder="Tên sự kiện" required onChange={handleChange} />
            <textarea name="description" placeholder="Mô tả" onChange={handleChange} />
            <input name="startDate" type="date" onChange={handleChange} />
            <input name="endDate" type="date" onChange={handleChange} />
            <input name="location" placeholder="Địa điểm" onChange={handleChange} />
            <label>Ảnh sự kiện:</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            <label>Hashtag:</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                name="hashtagInput"
                value={formData.hashtagInput}
                onChange={handleChange}
                placeholder="Nhập hashtag"
              />
              <Btn type="button" onClick={handleAddHashtag}>Thêm</Btn>
            </div>
            <div>
              {formData.hashtagDto.map((tag, i) => (
                <span key={i} style={{ marginRight: "6px", color: "#1976d2" }}>#{tag}</span>
              ))}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <Btn type="submit">Lưu</Btn>
              <DeleteBtn type="button" onClick={() => setShowForm(false)}>Huỷ</DeleteBtn>
            </div>
          </ModalForm>
        </ModalBackdrop>
      )}
    </Wrapper>
  );
}
