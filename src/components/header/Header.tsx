import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import DropDown from "../uiKit/dropDown";
import { LanguageOptions } from "../../constants";
import Logo from "../../assets/images/logo.jpg";

import "./header.scss";
import "../../assets/fonts/icomoon/style.css";

const Menu = [
  {
    to: "dashboard",
    name: "Home",
  },
  {
    to: "cars",
    name: "Cars",
  },
  {
    to: "aboutUs",
    name: "About Us",
  },
  {
    to: "contactUs",
    name: "Contact Us",
  },
];

const Header = () => {
  const [language, setLanguage] = useState(LanguageOptions[0].value);

  const location = useLocation();

  const selectedMenu = useMemo(() => {
    const selectedMenuItem = Menu.find((item) =>
      location.pathname.includes(item.to)
    );

    return selectedMenuItem ? selectedMenuItem.to : Menu[0].to;
  }, [location.pathname]);

  return (
    <header>
      <div className="top-header">
        <p className="offer">Find the best new car deals!</p>
        <p>
          <i className="icon-clock" />
          <span className="hours-info">Mon - Sat : 09am to 06pm</span>
          <i className="icon-phone" />
          <span className="phone-numbers">+374 43 14-44-49</span>
          <i className="icon-phone" />
          <span className="phone-numbers">+374 96 44-10-44</span>
        </p>
      </div>
      <div className="bottom-header">
        <img src={Logo} alt="logo.jpg" />
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
    </header>
  );
};

export default Header;
