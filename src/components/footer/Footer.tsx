import React from "react";
import { useTranslation } from "react-i18next";

import Facebook from "../../assets/images/socialIIcons/facebook.svg";
import Instagram from "../../assets/images/socialIIcons/instagram.svg";
import Viber from "../../assets/images/socialIIcons/viber.svg";
import WhatsApp from "../../assets/images/socialIIcons/whatsapp.svg";

import "./Footer.scss";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <div className="footer-holder">
      <div className="footer-top">
        <div className="footer-item about-us">
          <p className="header">{t("Contact Us")}</p>
          <p>{t("Armenia, Yerevan, Bayron 3")}</p>
          <p className="phone-h">
            <i className="icon-phone" />
            <span className="phone-numbers first">+374 43 14-44-49</span>
            <i className="icon-phone" />
            <span className="phone-numbers">+374 96 44-10-44</span>
          </p>
          <p className="days-h">
            <i className="icon-clock" />
            <span className="hours-info">{t("Mon - Sat : 09am to 06pm")}</span>
          </p>
          <p>country.motorservice@mail.ru</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://www.facebook.com/CMSARMENIA/">
            <img src={Facebook} alt="facebook" />
          </a>
          <a href="https://instagram.com/c.m.s_armenia?utm_medium=copy_link">
            <img src={Instagram} alt="instagram" />
          </a>
          <a href="">
            <img src={WhatsApp} alt="whatsapp" />
          </a>
          <a href="">
            <img src={Viber} className="icon-viber" alt="viber" />
          </a>
        </div>
        <p className="copy-right">© 2010 - 2021 Country Motor</p>
      </div>
    </div>
  );
};

export default Footer;
