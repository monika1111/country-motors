import React from "react";

import AboutUsBG from "../../assets/images/about-us-bg.jpg";

import "./ContactUs.scss";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-us-bg">
        <img src={AboutUsBG} alt="contactUs.jpg" />
      </div>
      <div className="contact-us-form-holder">
        <ul className="contact-us-form">
          <li className="full-grid-column contact-us-title">
            <h2>Contact Us</h2>
          </li>
          <li>
            <label> Your Name *</label>
            <input type="text" name="name" />
          </li>
          <li>
            <label> Your Email *</label>
            <input type="text" name="email" />
          </li>
          <li className="full-grid-column">
            <label>Subject</label>
            <input type="text" name="subject" />
          </li>
          <li className="full-grid-column">
            <label>Message</label>
            <textarea />
          </li>
          <li className="submit">
            <input type="submit" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
