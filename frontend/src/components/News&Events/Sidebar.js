import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FaNewspaper, FaCalendarAlt } from "react-icons/fa";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";

// Styled Components như cũ...

const SidebarWrapper = styled.div`
  width: 250px;
  background: #343a40;
  color: white;
  padding: 20px;
  border-radius: 8px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  height: fit-content;

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: auto;
    padding: 15px;
  }
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  background: ${({ active }) => (active ? "#dc3545" : "transparent")};
  &:hover {
    background: #dc3545;
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const SubMenu = styled.div`
  margin-left: 20px;
  display: ${({ open }) => (open ? "block" : "none")};

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
  }
`;

const SubMenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  background: ${({ active }) => (active ? "#495057" : "transparent")};

  &:hover {
    background: #495057;
  }
`;

// Gốc tiếng Việt
const menuItems = {
  "Tin Tức": ["Tin tức mới nhất", "Tin tức đặc sắc", "Công nghệ", "Bảo tồn"],
  "Sự Kiện": ["Sự kiện sắp diễn ra", "Sự kiện nổi bật"],
};

export default function Sidebar({ selectedMenu, setSelectedMenu }) {
  const { language } = useContext(LanguageContext);
  const [openMenu, setOpenMenu] = useState("Tin Tức");
  const [translatedMenu, setTranslatedMenu] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  useEffect(() => {
    const translateMenuItems = async () => {
      const result = {};
      for (const [mainKey, subItems] of Object.entries(menuItems)) {
        const translatedKey = await translateText(mainKey, language);
        const translatedSubs = await Promise.all(
          subItems.map((item) => translateText(item, language))
        );
        result[translatedKey] = translatedSubs;
      }
      setTranslatedMenu(result);
    };

    translateMenuItems();
  }, [language]);

  return (
    <SidebarWrapper>
      {/* Tin Tức */}
      <SidebarItem active={openMenu === "Tin Tức"} onClick={() => toggleMenu("Tin Tức")}>
        <span>
          <FaNewspaper style={{ marginRight: 10 }} />
          {translatedMenu["Tin Tức"] ? Object.keys(translatedMenu)[0] : "Tin Tức"}
        </span>
      </SidebarItem>
      <SubMenu open={openMenu === "Tin Tức"}>
        {translatedMenu["Tin Tức"] &&
          translatedMenu[Object.keys(translatedMenu)[0]].map((subMenu, index) => (
            <SubMenuItem
              key={index}
              active={selectedMenu === menuItems["Tin Tức"][index]}
              onClick={() => setSelectedMenu(menuItems["Tin Tức"][index])}
            >
              {subMenu}
            </SubMenuItem>
          ))}
      </SubMenu>

      {/* Sự Kiện */}
      <SidebarItem active={openMenu === "Sự Kiện"} onClick={() => toggleMenu("Sự Kiện")}>
        <span>
          <FaCalendarAlt style={{ marginRight: 10 }} />
          {translatedMenu["Sự Kiện"] ? Object.keys(translatedMenu)[1] : "Sự Kiện"}
        </span>
      </SidebarItem>
      <SubMenu open={openMenu === "Sự Kiện"}>
        {translatedMenu["Sự Kiện"] &&
          translatedMenu[Object.keys(translatedMenu)[1]].map((subMenu, index) => (
            <SubMenuItem
              key={index}
              active={selectedMenu === menuItems["Sự Kiện"][index]}
              onClick={() => setSelectedMenu(menuItems["Sự Kiện"][index])}
            >
              {subMenu}
            </SubMenuItem>
          ))}
      </SubMenu>
    </SidebarWrapper>
  );
}
