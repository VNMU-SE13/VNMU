import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/SouvenirProducts.css";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

const initialProducts = [
  {
    id: 1,
    name: "Tượng cô gái Việt Nam",
    image: "/image/souvenir/souvenir1.jpg",
    price: "1.000 điểm"
  },
  {
    id: 2,
    name: "Mô hình nón lá mini",
    image: "/image/souvenir/souvenir2.jpg",
    price: "2.000 điểm"
  },
  {
    id: 3,
    name: "Bộ bưu thiếp nghệ thuật",
    image: "/image/souvenir/souvenir3.jpg",
    price: "500 điểm"
  },
  {
    id: 4,
    name: "Lọ gốm sứ Bát Tràng",
    image: "/image/souvenir/souvenir4.jpg",
    price: "5.000 điểm"
  }
];

const SouvenirList = () => {
  const { language } = useContext(LanguageContext);
  const [products, setProducts] = useState(initialProducts);
  const [title, setTitle] = useState("Sản phẩm lưu niệm nổi bật");

  useEffect(() => {
    const translateProducts = async () => {
      if (language === "vi") {
        setProducts(initialProducts);
        setTitle("Sản phẩm lưu niệm nổi bật");
      } else {
        const tTitle = await translateText("Sản phẩm lưu niệm nổi bật", language);
        setTitle(tTitle);

        const translated = await Promise.all(
          initialProducts.map(async (p) => {
            const name = await translateText(p.name, language);
            const price = await translateText(p.price, language);
            return { ...p, name, price };
          })
        );

        setProducts(translated);
      }
    };

    translateProducts();
  }, [language]);

  return (
    <div className="souvenir-section">
      <h2 className="souvenir-title">{title}</h2>
      <div className="souvenir-list">
        {products.map((product) => (
          <div key={product.id} className="souvenir-item">
            <img src={product.image} alt={product.name} className="souvenir-img" />
            <h3 className="souvenir-name">{product.name}</h3>
            <p className="souvenir-price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SouvenirList;
