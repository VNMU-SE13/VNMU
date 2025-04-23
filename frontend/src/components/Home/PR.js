import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaTicketAlt, FaLandmark, FaPaintBrush } from "react-icons/fa";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import { motion } from "framer-motion";

const PRSection = styled.div`
  padding: 2.5rem;
  background: #fff0f5;
  border-radius: 16px;
  margin: 2rem auto;
  max-width: 1200px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  color: #b22222;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-align: center;
`;

const Slogan = styled.p`
  font-size: 1rem;
  color: #d2691e;
  margin-bottom: 2rem;
  text-align: center;
  font-style: italic;
`;

const PromoList = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const PromoItem = styled(motion.div)`
  background: #fff;
  border-left: 6px solid #b22222;
  border-radius: 12px;
  padding: 1.5rem;
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    background: #fffafa;
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 2rem;
  color: #b22222;
  margin-bottom: 1rem;
`;

const PromoTitle = styled.h3`
  font-size: 1.2rem;
  color: #222;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const PromoDesc = styled.p`
  font-size: 1rem;
  color: #555;
`;

export default function PR() {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [translatedPromotions, setTranslatedPromotions] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("Ưu đãi nổi bật");
  const [slogan, setSlogan] = useState("Nhanh tay khám phá, nhận ngay cơ hội!");

  const promotions = [
    {
      title: "Miễn phí vé - Bảo tàng Đà Nẵng",
      desc: "Từ 15–21/4 nhân dịp kỷ niệm Ngày Văn hóa các Dân tộc Việt Nam.",
      icon: <FaTicketAlt />,
      link: "/museums/bao-tang-a-nang",
    },
    {
      title: "Sự kiện: Khám phá Bảo tàng Điêu khắc Chăm",
      desc: "Tham quan miễn phí và workshop trải nghiệm nghệ thuật Chăm ngày 20/4.",
      icon: <FaLandmark />,
      link: "/museums/bao-tang-ieu-khac-cham",
    },
    {
      title: "Triển lãm mới: Bảo tàng Mỹ thuật Đà Nẵng",
      desc: "Triển lãm tranh 'Sắc màu miền Trung' khai mạc ngày 25/4.",
      icon: <FaPaintBrush />,
      link: "/museums/bao-tang-my-thuat-a-nang",
    },
  ];

  useEffect(() => {
    const translatePromotions = async () => {
      if (language === "vi") {
        setTranslatedPromotions(promotions);
        setSectionTitle("Ưu đãi nổi bật");
        setSlogan("Nhanh tay khám phá, nhận ngay cơ hội!");
      } else {
        const tSectionTitle = await translateText("Ưu đãi nổi bật", language);
        const tSlogan = await translateText("Nhanh tay khám phá, nhận ngay cơ hội!", language);
        setSectionTitle(tSectionTitle);
        setSlogan(tSlogan);

        const translated = await Promise.all(
          promotions.map(async (promo) => {
            const tTitle = await translateText(promo.title, language);
            const tDesc = await translateText(promo.desc, language);
            return { ...promo, title: tTitle, desc: tDesc };
          })
        );
        setTranslatedPromotions(translated);
      }
    };

    translatePromotions();
  }, [language]);

  return (
    <PRSection>
      <Title>{sectionTitle}</Title>
      <Slogan>{slogan}</Slogan>
      <PromoList>
        {translatedPromotions.map((promo, idx) => (
          <PromoItem
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(promo.link)}
          >
            <IconWrapper
              whileHover={{ rotate: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {promo.icon}
            </IconWrapper>
            <PromoTitle>{promo.title}</PromoTitle>
            <PromoDesc>{promo.desc}</PromoDesc>
          </PromoItem>
        ))}
      </PromoList>
    </PRSection>
  );
}
