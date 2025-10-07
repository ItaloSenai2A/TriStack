import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Sair = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔒 Remove dados do login
    localStorage.removeItem("usuarioLogado");

    console.log("Usuário saiu");
    navigate("/login"); // 🔁 Redireciona para login
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      {/* Card centralizado */}
      <div
        className="card shadow-lg p-4"
        style={{
          width: "360px",
          border: "1px solid #4CB917",
          borderRadius: "15px",
          textAlign: "center",
          backgroundColor: "#fff",
          transform: "translateX(20px)",
        }}
      >
        {/* Título */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Sair
        </h1>

        <p className="text-muted mb-3" style={{ fontSize: "16px" }}>
          Até logo!
        </p>

        <button
          className="btn w-100 mb-3"
          style={{
            backgroundColor: "#4CB917",
            color: "#fff",
            fontWeight: "500",
            fontSize: "16px",
            padding: "10px 0",
          }}
          onClick={handleLogout}
        >
          Sair
        </button>

        <p style={{ fontSize: "14px" }}>
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
