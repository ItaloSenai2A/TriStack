"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoTriStack from "../../assets/LogoTriStack.png";
import LogoWhite from "../../assets/LogoWhite.png";

const menuItems = [
  { icon: "bi-house", label: "Home", href: "/home" },
  { icon: "bi-bar-chart", label: "Dashboard", href: "/dashboard" },
  { icon: "bi-bell", label: "Alertas", href: "/alertas" },
  { icon: "bi-gear", label: "Configurações", href: "/configuracoes" },
  { icon: "bi-shield-check", label: "Administração da Área", href: "/administracao" },
  { icon: "bi-box-arrow-right", label: "Sair", href: "/sair" },
];

function Sidebar({ isOpen, onClose, isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`position-fixed top-0 ${isOpen ? "d-block" : "d-none d-lg-block"}`}
      style={{
        left: 0,
        top: 0,
        bottom: 0,
        width: "280px",
        height: "100vh",
        backgroundColor: isDarkMode ? "#14482b" : "#D2DCC5",
        zIndex: 1000,
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        fontFamily: "'Josefin Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 0",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Logo e toggle */}
      <div className="d-flex flex-column align-items-center">
        <img
          src={isDarkMode ? LogoWhite : LogoTriStack}
          alt="Logo TriStack"
          width={180}
          height={180}
          style={{ cursor: "pointer", objectFit: "contain", transition: "transform 0.2s ease" }}
          onClick={() => navigate("/home")}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        {/* Toggle dark/light moderno */}
        <div
          onClick={toggleDarkMode}
          style={{
            marginTop: "12px",
            width: "50px",
            height: "25px",
            borderRadius: "25px",
            backgroundColor: isDarkMode ? "#0f2a1e" : "#ffeaa7",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: isDarkMode ? "calc(100% - 22px)" : "2px",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              transition: "left 0.3s ease",
            }}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="px-3" style={{ width: "100%", flex: 1 }}>
        <ul className="nav flex-column" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.label} className="nav-item" style={{ marginBottom: "18px" }}>
              <Link
                to={item.href}
                className="nav-link d-flex align-items-center px-3 py-2 rounded"
                style={{
                  color: isDarkMode ? "#e0e0e0" : "#000",
                  fontSize: "16px",
                  fontWeight: "700",
                  textDecoration: "none",
                  gap: "12px",
                  fontFamily: "'Josefin Sans', sans-serif",
                  paddingLeft: "20px",
                  transition: "color 0.3s ease, background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? "#0d3a24" : "#a5d6a7";
                  e.currentTarget.style.color = isDarkMode ? "#a3d9a5" : "#1b5e20";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = isDarkMode ? "#e0e0e0" : "#000";
                }}
                onClick={onClose}
              >
                <i className={`${item.icon}`} style={{ fontSize: "20px" }}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "2px",
          backgroundColor: isDarkMode ? "#a3d9a5" : "#246816",
        }}
      ></div>
    </div>
  );
}

export default Sidebar;
