import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados cadastrados:", formData);
    // Aqui você pode integrar com sua API ou salvar no localStorage
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
          border: "1px solid #4CAF50",
          borderRadius: "15px",
        }}
      >
        <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
          Seja bem vindo!
        </p>
        <h3 className="fw-bold mb-3">Cadastrar</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="nome"
              className="form-control"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="tel"
              name="telefone"
              className="form-control"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="senha"
              className="form-control"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontWeight: "500",
            }}
          >
            Entrar
          </button>
        </form>

        <p className="mt-3 text-center" style={{ fontSize: "14px" }}>
          Já possui conta?{" "}
          <a href="/login" style={{ textDecoration: "none", fontWeight: "600" }}>
            Fazer Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
