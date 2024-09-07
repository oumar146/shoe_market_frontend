import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const handleLogout = async (navigate) => {
  localStorage.removeItem("token");
  navigate("/login");
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        Shop<span>Market</span>
      </div>
      <nav>
        <ul className="nav-links">
          <li>Accueil</li>
          <li>À propos</li>
          <li>Contact</li>
          <li
            onClick={() => {
              navigate("/sales");
            }}
          >
            Mes ventes
          </li>
          <li
            onClick={() => {
              handleLogout(navigate);
            }}
          >
            <span>Déconnexion</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
