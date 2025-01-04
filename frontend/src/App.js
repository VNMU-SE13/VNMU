import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Login/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Trang chủ */}
        <Route path="/login" element={<LoginForm />} /> {/* Trang Đăng Nhập */}
        <Route path="/register" element={<RegisterForm />} /> {/* Trang Đăng Ký */}
      </Routes>
    </Router>
  );
}

export default App;
