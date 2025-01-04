// Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introMenuOpen, setIntroMenuOpen] = useState(false);
  const [historyMenuOpen, setHistoryMenuOpen] = useState(false);
  const [feudalMenuOpen, setFeudalMenuOpen] = useState(false);
  const [modernMenuOpen, setModernMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleIntroMenu = () => {
    setIntroMenuOpen(!introMenuOpen);
  };

  const toggleHistoryMenu = () => {
    setHistoryMenuOpen(!historyMenuOpen);
  };

  const toggleFeudalMenu = () => {
    setFeudalMenuOpen(!feudalMenuOpen);
  };

  const toggleModernMenu = () => {
    setModernMenuOpen(!modernMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".intro-menu") && !event.target.closest(".intro-trigger")) {
      setIntroMenuOpen(false);
    }
    if (!event.target.closest(".history-menu") && !event.target.closest(".history-trigger")) {
      setHistoryMenuOpen(false);
    }
    if (!event.target.closest(".feudal-menu") && !event.target.closest(".feudal-trigger")) {
      setFeudalMenuOpen(false);
    }
    if (!event.target.closest(".modern-menu") && !event.target.closest(".modern-trigger")) {
      setModernMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative z-10 bg-black text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <div className="text-xl font-bold">HISTORY</div>
        <nav className="flex space-x-6">
          <div className="relative">
            <a
              href="#"
              onClick={toggleIntroMenu}
              className="hover:text-yellow-400 cursor-pointer intro-trigger"
            >
              Giới thiệu
            </a>
            {introMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white text-black rounded shadow-lg border intro-menu">
                <a
                  href="#"
                  className="block px-4 py-2 border-b hover:bg-gray-200 last:border-none"
                >
                  Lời chào của VNMU
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 border-b hover:bg-gray-200 last:border-none"
                >
                  Hệ thống bảo tàng trên khắp thành phố Đà Nẵng
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 border-b hover:bg-gray-200 last:border-none"
                >
                  Lịch sử hình thành của các bảo tàng
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Tầm nhìn sứ mệnh
                </a>
              </div>
            )}
          </div>
          <div className="relative">
            <a
              href="#"
              onClick={toggleHistoryMenu}
              className="hover:text-yellow-400 cursor-pointer history-trigger"
            >
              GĐ Lịch Sử
            </a>
            {historyMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white text-black rounded shadow-lg border history-menu">
                <a
                  href="#"
                  onClick={toggleFeudalMenu}
                  className="block px-4 py-2 border-b hover:bg-gray-200 feudal-trigger"
                >
                  Giai Đoạn Phong Kiến
                </a>
                {feudalMenuOpen && (
                  <div className="absolute left-full top-0 mt-0 w-64 bg-white text-black rounded shadow-lg border feudal-menu">
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Nhà Ngô (939–965)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Nhà Đinh (968–980)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Nhà Tiền Lê (980–1009)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Nhà Lý (1009–1225)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Nhà Trần (1225–1400)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Nhà Hồ (1400–1407)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Thời kỳ Bắc thuộc lần 4 (1407–1427)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Nhà Hậu Lê (1428–1527)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Nhà Mạc (1527–1592)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Trịnh-Nguyễn phân tranh (1592–1789)
                    </a>
                    <a href="#" className="block px-4 py-2 border-b hover:bg-gray-200">
                      Nhà Tây Sơn (1778–1802)
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                      Nhà Nguyễn (1802–1945)
                    </a>
                  </div>
                )}
                <a
                  href="#"
                  onClick={toggleModernMenu}
                  className="block px-4 py-2 border-b hover:bg-gray-200 modern-trigger"
                >
                  Giai Đoạn Cận Đại và Hiện Đại
                </a>
                {modernMenuOpen && (
                  <div className="absolute left-full top-0 mt-0 w-64 bg-white text-black rounded shadow-lg border modern-menu">
                    <a
                      href="#"
                      className="block px-4 py-2 border-b hover:bg-gray-200"
                    >
                      Kháng chiến chống thực dân Pháp (1858–1954)
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 border-b hover:bg-gray-200"
                    >
                      Kháng chiến chống đế quốc Mỹ (1954–1975)
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 border-b hover:bg-gray-200"
                    >
                      Kháng chiến chống đế quốc Nhật (1940–1945)
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                      Kháng chiến bảo vệ biên giới phía Bắc (1979)
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          <a href="#" className="hover:text-yellow-400">
            Tin Tức & Sự Kiện
          </a>
          <a href="#" className="hover:text-yellow-400">
            Câu đố
          </a>
          <a href="#" className="hover:text-yellow-400">
            Hỗ Trợ
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-8 relative">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <a href="#" className="hover:text-yellow-400">
          Your Profile
        </a>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none hover:bg-gray-700"
          >
            ☰
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
              <button
                onClick={() => navigate("/login")}
                className="block px-4 py-2 hover:bg-gray-200 text-left w-full"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/register")}
                className="block px-4 py-2 hover:bg-gray-200 text-left w-full"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
