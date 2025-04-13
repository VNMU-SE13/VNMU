import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled, { keyframes } from "styled-components";
import ImageResize from "quill-image-resize-module-react";
import { useNavigate } from "react-router-dom";
import BlogHeader from "./BlogHeader";
import Swal from 'sweetalert2';
import axios from "axios";

Quill.register("modules/imageResize", ImageResize);
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  max-width: 480px;
  margin: 4rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #fff;
  font-family: "Segoe UI", sans-serif;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.4s ease;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  color: #333;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
  }
`;


const Counter = styled.div`
  font-size: 0.85rem;
  text-align: right;
  color: #bbb;
  margin-bottom: 2rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
`;

const Button = styled.button`
  background-color: ${({ color }) => color || "#f15c22"};
  color: white;
  padding: 0.6rem 1.25rem;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.15s ease;

  &:hover {
    background-color: ${({ color }) => color || "#e04d12"};
    transform: scale(1.04);
  }
`;


const EditorContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  animation: ${fadeIn} 0.4s ease;
`;

const EditorTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #333;
`;

const EditorBox = styled.div`
  .ql-editor {
    min-height: 300px;

    img {
      display: block;
      margin: 0 auto;
    }
  }

  .ql-container {
    border: none;
  }
`;

const PostButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f28c38;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #e0782e;
    transform: scale(1.05);
  }
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogBox = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease;
`;

const DialogMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #333;
`;

const OkButton = styled.button`
  background: #f15c22;
  color: white;
  padding: 0.4rem 0.75rem;
  border: none;
  border-radius: 999px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  float: right;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e04d12;
  }
`;

const HashtagGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const HashtagInput = styled.input`
  width: 100%; /* Thêm dòng này để full width */
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const CategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const CategorySelect = styled.select`
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;
  width: 100%;
  background-color: white;
  color: #333;

  &:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
  }
`;

const AddHashtagButton = styled.button`
  align-self: flex-start;
  background-color: #f59e0b;
  color: white;
  font-weight: 600;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #d97706;
  }
`;

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ align: [] }],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"]
  ],
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"]
  }
};

const ImageGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;


const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  display: inline-block;
  padding: 0.6rem 1.25rem;
  background-color: #f59e0b;
  color: white;
  font-weight: 600;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: #d97706;
  }
`;

const PreviewImage = styled.img`
  margin-top: 1rem;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  object-fit: cover;
`;




const WriteDescription = () => {

  // variable
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [hashtags, setHashtags] = useState([""]);
  const [listCategories, setListCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false)

  // useEffect
  useEffect(() => {
    try{
      const fetchData = async () => {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryBlog`)
        setListCategories(res.data)
        setLoading(false)
      }

      fetchData()
    }
    catch(err) {
      console.log(err)
    }
  }, [])

  // handle convert type object image to string binary 

  

  // handle post blog
  const handlePost = async () => {
    if (!content || content.trim() === '' || content === '<p><br></p>') {
      return Swal.fire({
        icon: 'warning',
        title: 'Chưa có nội dung!',
        text: 'Vui lòng nhập nội dung bài viết.',
        confirmButtonColor: '#f15c22',
      });
    }
  
    if (!selectedCategory) {
      return Swal.fire({
        icon: 'warning',
        title: 'Chưa chọn giai đoạn!',
        text: 'Vui lòng chọn một giai đoạn lịch sử.',
        confirmButtonColor: '#f15c22',
      });
    }
  
    const validHashtags = hashtags.map(tag => tag.trim()).filter(tag => tag !== "");
  
    if (validHashtags.length === 0) {
      return Swal.fire({
        icon: 'warning',
        title: 'Thiếu hashtag!',
        text: 'Vui lòng nhập ít nhất một hashtag.',
        confirmButtonColor: '#f15c22',
      });
    }
  
    if (!selectedImage) {
      return Swal.fire({
        icon: 'warning',
        title: 'Chưa chọn ảnh!',
        text: 'Vui lòng tải lên 1 ảnh bất kỳ!',
        confirmButtonColor: '#f15c22',
      });
    }
  
    try {
      setLoading(true);
  
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Content", content);
      formData.append("CategoryBlogId", selectedCategory);
      formData.append("Image", selectedImage); // Gửi file ảnh
  
      validHashtags.forEach((tag) => {
        formData.append("hastagDto", tag); // multiple entries of same key
      });
  
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/Blog`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Bài viết đã được gửi!',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Có lỗi xảy ra!',
          showConfirmButton: false,
          timer: 2000,
        });
      }
  
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi khi gửi bài viết!',
        text: err.response?.data || 'Vui lòng thử lại sau.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  // handle add hashtag
  const handleAddHashtag = () => {
    setHashtags([...hashtags, ""]);
  };

  const handleChangeHashtag = (index, value) => {
    const newHashtags = [...hashtags];
    newHashtags[index] = value;
    setHashtags(newHashtags);
  };

  // handle change title
  const handleNextClicked = () => {
    if (title.length > 0) {
      setShowEditor(true);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu tiêu đề',
        text: 'Vui lòng nhập tiêu đề trước khi tiếp tục.',
        confirmButtonColor: '#f15c22',
        confirmButtonText: 'OK',
      });
    }
  };

  // handle change image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB
  
    if (!allowedTypes.includes(file.type)) {
      return Swal.fire({
        icon: "error",
        title: "Định dạng ảnh không hợp lệ",
        text: "Chỉ chấp nhận ảnh định dạng JPG, PNG hoặc WEBP.",
        confirmButtonColor: "#f15c22",
      });
    }
  
    if (file.size > maxSize) {
      return Swal.fire({
        icon: "error",
        title: "Ảnh quá lớn!",
        text: "Vui lòng chọn ảnh nhỏ hơn 2MB.",
        confirmButtonColor: "#f15c22",
      });
    }
  
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  
  

  if (loading) return <p>Loading...</p>
  else
  return (
    <>
      <BlogHeader />
      {!showEditor ? (
        <Wrapper>
          <Title>Chọn một tên cho blog của bạn</Title>
          <Subtitle>Đây là tiêu đề sẽ xuất hiện ở phía trên cùng của blog.</Subtitle>
          <Input
            type="text"
            placeholder="Tiêu đề"
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Counter>{title.length} / 100</Counter>
          <ButtonRow>
            {/* <Button color="#f15c22">BỎ QUA</Button> */}
            <Button onClick={() => navigate(-1)}>HUỶ</Button>
            <Button color="#f15c22" onClick={() => handleNextClicked()}>TIẾP THEO</Button>
          </ButtonRow>
        </Wrapper>
        
      ) : (
        <>
          <EditorContainer>
            <EditorTitle>Viết mô tả nội dung</EditorTitle>
            <EditorBox>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Bắt đầu viết nội dung..."
                modules={modules}
              />
            </EditorBox>
            <CategoryGroup>
              <label style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Chọn giai đoạn:</label>
              <CategorySelect
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Chọn một giai đoạn --</option>
                {listCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </CategorySelect>
            </CategoryGroup>

            <HashtagGroup>
              <label style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Hashtag:</label>
              {hashtags.map((tag, index) => (
                <HashtagInput
                  key={index}
                  type="text"
                  placeholder={`Hashtag #${index + 1}`}
                  value={tag}
                  onChange={(e) => handleChangeHashtag(index, e.target.value)}
                />
              ))}
              <AddHashtagButton onClick={handleAddHashtag}>+ Thêm hashtag</AddHashtagButton>
            </HashtagGroup>
            <ImageGroup>
              <label style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Tải ảnh Blog:</label>
              <ImageLabel htmlFor="imageUpload">+ Chọn ảnh</ImageLabel>
              <ImageInput
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && <PreviewImage src={imagePreview} alt="Xem trước ảnh" />}
            </ImageGroup>
          </EditorContainer>
      
          <PostButton onClick={handlePost}>Đăng bài viết</PostButton>
        </>
      )}
    </>
  );
};

export default WriteDescription;
