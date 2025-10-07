"use client";

import React from "react";
import { Link } from "react-router-dom";
import LogoTriStack from "../../assets/LogoTriStack.png";

const menuItems = [
  { icon: "bi-house", label: "Home", href: "/home" },
  { icon: "bi-bar-chart", label: "Dashboard", href: "/dashboard" },
  { icon: "bi-bell", label: "Alertas", href: "/alertas" },
  { icon: "bi-gear", label: "Configurações", href: "/configuracoes" },
  { icon: "bi-shield-check", label: "Administração da Área", href: "/admin" },
  { icon: "bi-box-arrow-right", label: "Sair", href: "/sair" }, // ✅ Corrigido
];

function Sidebar({ isOpen }) {
  return (
    <div
      className={`position-fixed top-0 ${isOpen ? "d-block" : "d-none d-lg-block"}`}
      style={{
        left: 0,
        top: 0,
        bottom: 0,
        width: "280px",
        height: "100vh",
        backgroundColor: "#D2DCC5",
        zIndex: 1000,
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        fontFamily: "'Josefin Sans', sans-serif",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 0",
      }}
    >
      {/* Logo no topo */}
      <div className="d-flex flex-column align-items-center">
        <img
          src={LogoTriStack}
          alt="Logo TriStack"
          width={180}
          height={180}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Menu central */}
      <nav className="px-3" style={{ width: "100%", flex: 1 }}>
        <ul
          className="nav flex-column"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {menuItems.map((item) => (
            <li key={item.label} className="nav-item" style={{ marginBottom: "20px" }}>
              <Link
                to={item.href}
                className="nav-link d-flex align-items-center px-3 py-2 rounded"
                style={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: "700",
                  textDecoration: "none",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  gap: "12px",
                  fontFamily: "'Josefin Sans', sans-serif",
                  paddingLeft: "20px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#a5d6a7";
                  e.currentTarget.style.color = "#1b5e20";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#000000";
                }}
              >
                <i className={`${item.icon}`} style={{ fontSize: "18px" }}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Borda direita */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "2px",
          backgroundColor: "#246816",
        }}
      ></div>
    </div>
  );
}

export default Sidebar;
