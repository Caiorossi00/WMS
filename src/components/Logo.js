import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Logo.css";

function Logo() {
  const location = useLocation();
  const isHistoricoPage = location.pathname === "/historico";

  return (
    <div className="logo-container">
      <img 
        src="https://i.ibb.co/RDKngZ1/Travel-Agency-Perfect-for-Travel-Agent-Brand-Logo.png" 
        alt="Logo" 
        className="logo-header"
      />
      <Link to={isHistoricoPage ? "/" : "/historico"}>
        <button className="navigation-button">
          {isHistoricoPage ? (
            <i className="fa-solid fa-house fa-icons"></i>
          ) : (
            <i className="fa-solid fa-database fa-icons"></i>
          )}
        </button>
      </Link>
    </div>
  );
}

export default Logo;
