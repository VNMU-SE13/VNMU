import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Museum from "./components/Home/Museum"; // Import Museum component
import AllMuseum from "./components/Museum/AllMuseum"; // Import AllMuseum component
import MuseumDetail from "./components/Museum/MuseumDetail"; // Import MuseumDetail component
import SubmitForm from "./components/Home/SubmitForm";
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
        <Route path="/submit-form" element={<SubmitForm />} />
      </Routes>
    </Router>
  );
}

export default App;
