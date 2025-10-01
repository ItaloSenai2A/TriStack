import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentando login com:", formData);

    // Exemplo: salvar no localStorage
    localStorage.setItem("usuario", formData.email);

    // Aqui você pode redirecionar para o dashboard, por exemplo:
    // window.location.href = "/dashboard";
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
        <h3 className="fw-bold mb-3">Entrar</h3>

        <form onSubmit={handleSubmit}>
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
          <a href="/cadastro" style={{ textDecoration: "none", fontWeight: "600" }}>
            Fazer Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
