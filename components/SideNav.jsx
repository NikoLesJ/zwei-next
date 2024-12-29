"use client"
import React, { useState } from "react";
import "./sideNav.css";
import {
  MenuOutlined,
  RoofingOutlined,
  QuestionAnswerOutlined,
  AutoGraphOutlined,
  SettingsSuggestOutlined,
  LogoutOutlined,
  WarehouseOutlined,
  DisplaySettingsOutlined
} from "@mui/icons-material";
import Link from "next/link";
import Header from "./Header";

const SideNav = ( { content }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Состояние для раскрытия меню
  const [activeLink, setActiveLink] = useState(null); // Состояние для активной ссылки

  const menuItems = [
    { icon: <RoofingOutlined />, name: "Home", link: "/" },
    { icon: <WarehouseOutlined />, name: "Sklad", link: "/sklad" },
    { icon: <QuestionAnswerOutlined />, name: "Blog", link: "/blog" },
    { icon: <AutoGraphOutlined />, name: "About", link: "/about" },
    { icon: <DisplaySettingsOutlined />, name: "Attributes", link: "/attributes" },
    { icon: <SettingsSuggestOutlined />, name: "Settings", link: "#" }
  ]

  // Обработчик клика на переключатель меню
  const handleToggleMenu = () => {
    setIsExpanded((prev) => !prev);
  };

  // Обработчик клика на ссылку
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  // Извлечение имени активного пункта меню
  const activeMenuName = activeLink !== null ? menuItems[activeLink]?.name : "Home";

  return (
    <>
    <div 
      className={`body-p ${isExpanded ? "body-pd" : ""}`}
      id="body-pd"
    >

      <div className={`l-navbar ${isExpanded ? "expander" : ""}`} id="navbar">
        <nav className="nav">
          <div>
            <div className="nav__brand">
              <MenuOutlined
                className="nav__toggle"
                id="nav-toggle"
                onClick={handleToggleMenu}
              />
              <a href="/" className="nav__logo">
                ZWEI.
              </a>
            </div>
            <div className="nav__list">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  className={`nav__link ${activeLink === index ? "active" : ""}`}
                  onClick={() => handleLinkClick(index)}
                  href={item.link}
                >
                  {item.icon}
                  <span className="nav__name">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <a href="#" className="nav__link">
            <LogoutOutlined className="nav__icon" />
            <span className="nav__name">Log Out</span>
          </a>
        </nav>
      </div>
      <div className="h-[100vh] bg-gray-100">
        <Header activeMenuName={activeMenuName} />
        <main>
          {content}
        </main>
      </div>
    </div>
    </>
  );
};

export default SideNav;
