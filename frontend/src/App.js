import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Museum from "./components/Home/Museum"; // Trang bảo tàng
import AllMuseum from "./components/Museum/AllMuseum"; // Danh sách bảo tàng
import MuseumDetail from "./components/Museum/MuseumDetail"; // Chi tiết bảo tàng
import ArtifactDetail from "./components/Museum/ArtifactDetail"; // Chi tiết hiện vật
import SubmitForm from "./components/Home/SubmitForm";
import HomePageAdmin from "./components/Admin/HomePageAdmin";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Trang chủ */}
        <Route path="/login" element={<Login />} /> {/* Trang Đăng Nhập */}
        <Route path="/register" element={<Register />} /> {/* Trang Đăng Ký */}
        <Route path="/museum" element={<Museum />} /> {/* Trang Bảo Tàng */}
        <Route path="/all-museums" element={<AllMuseum />} /> {/* Trang All Museum */}
        <Route path="/museums/:id" element={<MuseumDetail />} /> {/* Trang Chi Tiết Bảo Tàng */}
        <Route path="/artifact/:id" element={<ArtifactDetail />} /> {/* Trang Chi Tiết Hiện Vật */}
        <Route path="/submit-form" element={<SubmitForm />} />
        <Route path="/admin" element={<HomePageAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
