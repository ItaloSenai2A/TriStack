import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Sair = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar dados de sessão/localStorage se necessário
    console.log("Usuário saiu");
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "360px",
          border: "1px solid #4CB917",
          borderRadius: "15px",
        }}
      >
        <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
          Até logo!
        </p>
        <h3 className="fw-bold mb-3">Sair</h3>

        <button
          className="btn w-100"
          style={{ backgroundColor: "#4CB917", color: "#fff", fontWeight: "500" }}
          onClick={handleLogout}
        >
          Sair
        </button>

        <p className="mt-3 text-center" style={{ fontSize: "14px" }}>
          Voltar para{" "}
          <Link to="/home" style={{ textDecoration: "none", fontWeight: "600" }}>
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sair;
