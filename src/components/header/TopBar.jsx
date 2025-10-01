import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function TopBar() {
  const location = useLocation();
  const [usuario, setUsuario] = useState("Ana Almeida");

  useEffect(() => {
    const email = localStorage.getItem("usuario");
    if (email) {
      const nome = email.split("@")[0];
      setUsuario(nome);
    }
  }, []);

  // Adicione todas as rotas que você tiver
  const pageTitles = {
    "/": "Login",
    "/login": "Login",
    "/cadastro": "Cadastro",
    "/home": "Visão Geral",
    "/dashboard": "Dashboard",
  };

  // Usa pathname exatamente como está na rota
  const titulo = pageTitles[location.pathname] || "TriStack";

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3"
      style={{
        backgroundColor: "#f5f5f5",
        borderBottom: "4px solid #4CB917",
        fontFamily: "'Josefin Sans', sans-serif",
      }}
    >
      <h4 className="fw-bold mb-0" style={{ fontSize: "22px", color: "#4CB917" }}>
        {titulo}
      </h4>

      <div className="d-flex align-items-center gap-2">
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#4CB917",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#fff"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path
              fillRule="evenodd"
              d="M14 14s-1-4-6-4-6 4-6 4 0 1 1 1h10c1 0 1-1 1-1z"
            />
          </svg>
        </div>
        <span className="fw-semibold" style={{ fontSize: "16px", color: "#4CB917" }}>
          {usuario}
        </span>
      </div>
    </div>
  );
}

export default TopBar;
