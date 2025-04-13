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
import News from "./components/News&Events/News"
import NewsDetail from "./components/News&Events/NewsDetail";
import HashtagPage from './components/News&Events/HashtagPage';
import QuizHome from './components/Quizz/QuizHome';
import QuizStart from './components/Quizz/QuizStart';
import BlogHome from'./components/Blog/BlogHome';
import WriteDescription from './components/Blog/WriteDescription';
import MyBlog from './components/Blog/MyBlog';
import BlogPage from './components/Blog/BlogPage';
import Error from './components/Loading&Error/Error';
import Loading from './components/Loading&Error/Loading';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Trang chủ */}
        <Route path="/login" element={<Login />} /> {/* Trang Đăng Nhập */}
        <Route path="/register" element={<Register />} /> {/* Trang Đăng Ký */}
        <Route path="/museum" element={<Museum />} /> {/* Trang Bảo Tàng */}
        <Route path="/all-museums" element={<AllMuseum />} /> {/* Trang All Museum */}
        <Route path="/museums/:slug" element={<MuseumDetail />} /> {/* Trang Chi Tiết Bảo Tàng */}
        <Route path="/artifact/:id" element={<ArtifactDetail />} /> {/* Trang Chi Tiết Hiện Vật */}
        <Route path="/submit-form" element={<SubmitForm />} />
        <Route path="/admin" element={<HomePageAdmin />} />
        <Route path="/news" element={<News/>}/>
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/tags/:tagName" element={<HashtagPage />} />
        <Route path="/quiz" element={<QuizHome />} />
        <Route path="/quiz/start" element={<QuizStart />} />
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/listblog" element={<BlogPage />} />
        <Route path="/writedescription" element={<WriteDescription />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/error" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </Router>
  );
}

export default App;
