import React, { useState } from "react";
import { Link } from "react-router-dom";

import DropDown from "../uiKit/dropDown";
import { LanguageOptions } from "../../constants";
import Logo from "../../assets/images/logo.png";
import { Menu } from "../../constants";

import "./header.scss";
import "../../assets/fonts/icomoon/style.css";
import useSelectedMenuItem from "../../hook/useSelectedMenuItem";
import MobileMenu from "../mobileMenu/MobileMenu";

const Header = () => {
  const [language, setLanguage] = useState(LanguageOptions[0].value);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const selectedMenu = useSelectedMenuItem();

  return (
    <header>
      <div className="top-header">
        <p className="offer">Find the best auction cars deals!</p>
        <div className="header-info">
          <p className="days-h">
            <i className="icon-clock" />
            <span className="hours-info">Mon - Sat : 09am to 06pm</span>
          </p>
          <p className="phone-h">
            <i className="icon-phone" />
            <span className="phone-numbers">+374 43 14-44-49</span>
            <i className="icon-phone" />
            <span className="phone-numbers">+374 96 44-10-44</span>
          </p>
        </div>
        <img src={Logo} alt="logo.jpg" />
      </div>
      <div className="bottom-header">
        <p className="bottom-header-p">
          <i
            className="icon-menu"
            onClick={() => setOpenMobileMenu((prevState) => !prevState)}
          />
        </p>
        <nav>
          {Menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={selectedMenu === item.to ? "selected" : ""}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <DropDown
          options={LanguageOptions}
          handleSelect={setLanguage}
          value={language}
        />
      </div>
      {openMobileMenu && (
        <MobileMenu closeMobileMenu={() => setOpenMobileMenu(false)} />
      )}
    </header>
  );
};

export default Header;
