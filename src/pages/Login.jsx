import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [error, setError] = useState(""); // mensagem de erro

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulação de login: verifica se existe o usuário cadastrado no localStorage
    const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuariosCadastrados.find(
      (u) => u.email === formData.email && u.senha === formData.senha
    );

    if (usuarioValido) {
      // salva usuário logado e redireciona
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
      navigate("/home");
    } else {
      setError("Email ou senha inválidos!");
    }
  };

  return (
    <div
      className="d-flex justify-content-end align-items-center"
      style={{ minHeight: "100vh" , paddingRight: "450px" }}
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
          Seja bem-vindo!
        </p>
        <h3 className="fw-bold mb-3">Entrar</h3>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

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
            style={{ backgroundColor: "#4CB917", color: "#fff", fontWeight: "500" }}
          >
            Entrar
          </button>
        </form>

        <p className="mt-3 text-center" style={{ fontSize: "14px" }}>
          Não possui conta?{" "}
          <Link to="/cadastro" style={{ textDecoration: "none", fontWeight: "600" }}>
            Cadastrar-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
