import React, { useState, useContext, useEffect } from "react";
import Header from "../Home/Header";
import "../../assets/css/SubmitForm.css";
import styled from "styled-components";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

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
  const { language } = useContext(LanguageContext);

  const [formData, setFormData] = useState({
    formType: "",
    museumName: "",
    address: "",
    files: [],
    complaintContent: "",
  });

  const [showModal, setShowModal] = useState(false);

  const [labels, setLabels] = useState({
    title: "Đơn liên hệ",
    selectType: "Chọn loại đơn",
    typePlaceholder: "-- Chọn loại đơn --",
    complaint: "Đơn khiếu nại",
    approval: "Đơn duyệt trở thành Bảo tàng",
    museumName: "Tên bảo tàng",
    address: "Địa chỉ",
    fileLabel: "Chọn tệp",
    fileButton: "Tải tệp lên",
    textareaLabel: "Nội dung",
    textareaPlaceholder: "Ghi rõ 'Tên hiện vật' và 'Bảo tàng chứa hiện vật' trong phần nội dung khiếu nại",
    note: 'Chú ý: Ghi rõ "Tên hiện vật" và "Bảo tàng chứa hiện vật" trong phần nội dung khiếu nại.',
    submit: "Xác nhận",
    modalTitle: "Đã gửi đơn thành công!",
    modalMessage: "Vui lòng chờ thông báo từ hệ thống.",
    close: "Đóng",
    fileCountSuffix: "tệp đã được tải lên",
  });

  useEffect(() => {
    const translateAll = async () => {
      if (language === "vi") {
        setLabels({
          title: "Đơn liên hệ",
          selectType: "Chọn loại đơn",
          typePlaceholder: "-- Chọn loại đơn --",
          complaint: "Đơn khiếu nại",
          approval: "Đơn duyệt trở thành Bảo tàng",
          museumName: "Tên bảo tàng",
          address: "Địa chỉ",
          fileLabel: "Chọn tệp",
          fileButton: "Tải tệp lên",
          textareaLabel: "Nội dung",
          textareaPlaceholder: "Ghi rõ 'Tên hiện vật' và 'Bảo tàng chứa hiện vật' trong phần nội dung khiếu nại",
          note: 'Chú ý: Ghi rõ "Tên hiện vật" và "Bảo tàng chứa hiện vật" trong phần nội dung khiếu nại.',
          submit: "Xác nhận",
          modalTitle: "Đã gửi đơn thành công!",
          modalMessage: "Vui lòng chờ thông báo từ hệ thống.",
          close: "Đóng",
          fileCountSuffix: "tệp đã được tải lên",
        });
      } else {
        const entries = Object.entries(labels);
        const result = {};

        for (const [key, value] of entries) {
          result[key] = await translateText(value, language);
        }

        setLabels(result);
      }
    };

    translateAll();
  }, [language]);

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
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
      <Header />

      <div className="submit-form">
        <h1>{labels.title}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{labels.selectType}</label>
            <select name="formType" value={formData.formType} onChange={handleChange}>
              <option value="">{labels.typePlaceholder}</option>
              <option value="complaint">{labels.complaint}</option>
              <option value="approval">{labels.approval}</option>
            </select>
          </div>

          {isApprovalForm && (
            <>
              <div className="form-group">
                <label>{labels.museumName}</label>
                <input
                  type="text"
                  name="museumName"
                  value={formData.museumName}
                  onChange={handleChange}
                  placeholder={labels.museumName}
                />
              </div>

              <div className="form-group">
                <label>{labels.address}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={labels.address}
                />
              </div>

              <div className="form-group">
                <label>{labels.fileLabel}</label>
                <div className="custom-file-input">
                  <label htmlFor="file-upload" className="custom-file-label">
                    {labels.fileButton}
                  </label>
                  <input id="file-upload" type="file" multiple onChange={handleFileChange} />
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
                  <p className="file-count">{`${formData.files.length} ${labels.fileCountSuffix}`}</p>
                )}
              </div>
            </>
          )}

          {isComplaintForm && (
            <>
              <div className="form-group">
                <label>{labels.textareaLabel}</label>
                <textarea
                  name="complaintContent"
                  rows="5"
                  value={formData.complaintContent}
                  onChange={handleChange}
                  placeholder={labels.textareaPlaceholder}
                ></textarea>
              </div>
              <p className="note">{labels.note}</p>
            </>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={!(isApprovalComplete || isComplaintComplete)}
          >
            {labels.submit}
          </button>
        </form>
      </div>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>{labels.modalTitle}</h2>
            <p>{labels.modalMessage}</p>
            <ModalButton onClick={closeModal}>{labels.close}</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default SubmitForm;
