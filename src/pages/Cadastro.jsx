import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // import do useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

const Cadastro = () => {
  const navigate = useNavigate(); // hook de navegação

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

    // aqui você pode salvar no localStorage ou chamar API
    // depois redireciona pra Home
    navigate("/home");
  };

  return (
    <div
      className="d-flex justify-content-end align-items-center"
      style={{ minHeight: "100vh", paddingRight: "325px" }}
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
              backgroundColor: "#4CB917",
              color: "#fff",
              fontWeight: "500",
            }}
          >
            Entrar
          </button>
        </form>

        <p className="mt-3 text-center" style={{ fontSize: "14px" }}>
          Já possui conta?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", fontWeight: "600" }}
          >
            Fazer Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
