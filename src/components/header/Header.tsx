import React from "react";

import "./header.scss";

const Header = () => {
  return (
    <header>
      <ul className="top-header">
        <li>Save up to 40% Hurry limited offer!</li>
        <li>
          <span className="hours-info">
              Mon - Fri : 09am to 06pm</span>
          <span className="phone-numbers">+1 800 789 0000</span>
        </li>
      </ul>
      <ul className="bottom-header">menu</ul>
    </header>
  );
};

export default Header;
