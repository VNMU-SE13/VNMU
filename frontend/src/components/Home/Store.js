import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/QuizAndStore.css";
import SouvenirProducts from "./SouvenirProducts";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("Cửa hàng lưu niệm");
  const [desc, setDesc] = useState(
    "Khám phá hàng trăm sản phẩm độc đáo lấy cảm hứng từ nghệ thuật, từ trang sức, sách đến đồ trang trí nhà cửa."
  );
  const [btnText, setBtnText] = useState("Mua ngay");

  useEffect(() => {
    const translateStore = async () => {
      if (language === "vi") {
        setTitle("Cửa hàng lưu niệm");
        setDesc(
          "Khám phá hàng trăm sản phẩm độc đáo lấy cảm hứng từ nghệ thuật, từ trang sức, sách đến đồ trang trí nhà cửa."
        );
        setBtnText("Mua ngay");
      } else {
        const t1 = await translateText("Cửa hàng lưu niệm", language);
        const t2 = await translateText(
          "Khám phá hàng trăm sản phẩm độc đáo lấy cảm hứng từ nghệ thuật, từ trang sức, sách đến đồ trang trí nhà cửa.",
          language
        );
        const t3 = await translateText("Mua ngay", language);
        setTitle(t1);
        setDesc(t2);
        setBtnText(t3);
      }
    };

    translateStore();
  }, [language]);

  const handleShopClick = () => {
    navigate("/souvenir");
  };

  return (
    <div className="store-section">
      <div className="store-header reverse-layout">
        <div className="store-image">
          <img
            src="/image/Luuniem.png"
            alt="Store Illustration"
            className="store-img"
          />
        </div>
        <div className="store-content">
          <h2>{title}</h2>
          <p>{desc}</p>
          <button className="store-shop-button" onClick={handleShopClick}>
            {btnText}
          </button>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <SouvenirProducts />
    </div>
  );
};

export default Store;
