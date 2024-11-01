import React from "react";
import "./Footer.css";
import logo from "./assets/logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <a href="https://www.instagram.com/caiorossi.dev" target="_blank" rel="noopener noreferrer">
        <img className="logo" src={logo} alt="Logo" />
      </a>
    </div>
  );
};

export default Footer;
