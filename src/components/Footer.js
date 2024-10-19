import React from "react";
import "./Footer.css";
import logo from "./assets/logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <img className="logo" src={logo} alt="Logo" />
    </div>
  );
};

export default Footer;
