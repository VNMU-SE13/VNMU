import React, { useState } from "react";
import Header from "../Home/Header"; // Import Header
import "../../assets/css/SubmitForm.css";

const SubmitForm = () => {
  const [formData, setFormData] = useState({
    formType: "",
    museumName: "",
    address: "",
    files: [], // Lưu danh sách tệp
    complaintContent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Chuyển từ FileList sang mảng
    setFormData({ ...formData, files: [...formData.files, ...files] }); // Thêm tệp mới vào danh sách
  };

  const handleFileRemove = (index) => {
    const updatedFiles = formData.files.filter((_, i) => i !== index); // Xóa tệp tại vị trí chỉ định
    setFormData({ ...formData, files: updatedFiles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu form:", formData);
    alert("Đơn đã được gửi thành công!");
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
          {/* Chọn loại đơn */}
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

          {/* Form Đơn duyệt trở thành bảo tàng */}
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

          {/* Form Đơn khiếu nại */}
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

          {/* Nút xác nhận */}
          <button
            type="submit"
            className="submit-button"
            disabled={!(isApprovalComplete || isComplaintComplete)}
          >
            Xác nhận
          </button>
        </form>
      </div>

    </div>
  );
};

export default SubmitForm;
