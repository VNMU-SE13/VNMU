import React, { useState } from "react";
import Header from "../Home/Header"; // Import Header
import "../../assets/css/SubmitForm.css"; // Import CSS
import styled from "styled-components";

// Styled Components cho Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const ModalButton = styled.button`
  background-color: #c8102e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #a00c1d;
  }
`;

const SubmitForm = () => {
  const [formData, setFormData] = useState({
    formType: "",
    museumName: "",
    address: "",
    files: [],
    complaintContent: "",
  });

  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, files: [...formData.files, ...files] });
  };

  const handleFileRemove = (index) => {
    const updatedFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: updatedFiles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu form:", formData);
    setShowModal(true); // Hiển thị modal sau khi gửi đơn
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form sau khi đóng modal
    setFormData({
      formType: "",
      museumName: "",
      address: "",
      files: [],
      complaintContent: "",
    });
  };

  const isApprovalForm = formData.formType === "approval";
  const isComplaintForm = formData.formType === "complaint";
  const isApprovalComplete =
    isApprovalForm &&
    formData.museumName.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.files.length > 0;
  const isComplaintComplete =
    isComplaintForm && formData.complaintContent.trim() !== "";

  return (
    <div className="submit-container">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <div className="submit-form">
        <h1>Đơn liên hệ</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Chọn loại đơn</label>
            <select
              name="formType"
              value={formData.formType}
              onChange={handleChange}
            >
              <option value="">-- Chọn loại đơn --</option>
              <option value="complaint">Đơn khiếu nại</option>
              <option value="approval">Đơn duyệt trở thành Bảo tàng</option>
            </select>
          </div>

          {isApprovalForm && (
            <>
              <div className="form-group">
                <label>Tên bảo tàng</label>
                <input
                  type="text"
                  name="museumName"
                  value={formData.museumName}
                  onChange={handleChange}
                  placeholder="Nhập tên bảo tàng"
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div className="form-group">
                <label>Chọn tệp</label>
                <div className="custom-file-input">
                  <label htmlFor="file-upload" className="custom-file-label">
                    Tải tệp lên
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
                <ul className="file-list">
                  {formData.files.map((file, index) => (
                    <li key={index} className="file-item">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        className="file-remove-button"
                        onClick={() => handleFileRemove(index)}
                      >
                        -
                      </button>
                    </li>
                  ))}
                </ul>
                {formData.files.length > 0 && (
                  <p className="file-count">{`${formData.files.length} tệp đã được tải lên`}</p>
                )}
              </div>
            </>
          )}

          {isComplaintForm && (
            <>
              <div className="form-group">
                <label>Nội dung</label>
                <textarea
                  name="complaintContent"
                  rows="5"
                  value={formData.complaintContent}
                  onChange={handleChange}
                  placeholder="Ghi rõ 'Tên hiện vật' và 'Bảo tàng chứa hiện vật' trong phần nội dung khiếu nại"
                ></textarea>
              </div>
              <p className="note">
                Chú ý: Ghi rõ "Tên hiện vật" và "Bảo tàng chứa hiện vật" trong phần
                nội dung khiếu nại.
              </p>
            </>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={!(isApprovalComplete || isComplaintComplete)}
          >
            Xác nhận
          </button>
        </form>
      </div>

      {/* Modal hiển thị thông báo gửi thành công */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Đã gửi đơn thành công!</h2>
            <p>Vui lòng chờ thông báo từ hệ thống.</p>
            <ModalButton onClick={closeModal}>Đóng</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default SubmitForm;
