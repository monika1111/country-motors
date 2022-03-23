import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./header.scss";
import "../../assets/fonts/icomoon/style.css";


import useSelectedMenuItem from "../../hook/useSelectedMenuItem";
import MobileMenu from "../mobileMenu/MobileMenu";
import DropDown from "../uiKit/dropDown";
import { LanguageOptions } from "../../constants";
import Logo from "../../assets/images/logo.png";
import { Menu } from "../../constants";

const setLanguage = window.localStorage.getItem("language");

const defaultLanguage = setLanguage ? setLanguage : LanguageOptions[0].value;

const Header = () => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const { t, i18n } = useTranslation("common");

  const selectedMenu = useSelectedMenuItem();

  const onSelectLanguage = useCallback((val: string) => {
    setLanguage(val);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.localStorage.setItem("language", val);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return (
    <header>
      <div className="top-header">
        <p className="offer">{t("Find the best auction cars deals!")}</p>
        <div className="header-info">
          <p className="days-h">
            <i className="icon-clock" />
            <span className="hours-info">{t("Mon - Sat : 09am to 06pm")}</span>
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
              {t(item.name)}
            </Link>
          ))}
        </nav>
        <div className="right-part">
          <Link
            to={"/calculator"}
            className={`calc-link ${
              selectedMenu === "calculator" ? "selected" : ""
            }`}
          >
            <i className="icon-calculator" />
          </Link>
          <DropDown
            options={LanguageOptions}
            handleSelect={(val: string) => onSelectLanguage(val)}
            value={language}
          />
        </div>
      </div>
      {openMobileMenu && (
        <MobileMenu closeMobileMenu={() => setOpenMobileMenu(false)} />
      )}
    </header>
  );
};

export default Header;
