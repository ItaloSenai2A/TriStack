import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Sair = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    console.log("Usuário saiu");
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#0f2b1a" : "#f5f5f5", // fundo geral
        transition: "0.3s",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "360px",
          border: `2px solid ${isDarkMode ? "#4CB917" : "#4CB917"}`,
          borderRadius: "15px",
          textAlign: "center",
          backgroundColor: "#fff", // card sempre branco
          transition: "0.3s",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#000", // texto preto
          }}
        >
          Sair
        </h1>

        <p className="mb-3" style={{ fontSize: "16px", color: "#333" }}>
          Até logo!
        </p>

        <button
          className="btn w-100 mb-3"
          style={{
            backgroundColor: "#7ED957", // verde claro
            color: "#000",
            fontWeight: "500",
            fontSize: "16px",
            padding: "10px 0",
            border: "none",
            borderRadius: "10px",
          }}
          onClick={handleLogout}
        >
          Sair
        </button>

        <p style={{ fontSize: "14px", color: "#000" }}>
          Voltar para{" "}
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              fontWeight: "600",
              color: "#4CB917",
            }}
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sair;
