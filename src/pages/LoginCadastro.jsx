"use client"

import { useState } from "react"

function LoginCadastro() {
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      console.log("Login submitted:", { email: formData.email, senha: formData.senha })
    } else {
      console.log("Cadastro submitted:", formData)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    // Reset form when switching modes
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      senha: "",
    })
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 p-4"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          border: "2px solid #4caf50",
          borderRadius: "15px",
        }}
      >
        <div className="text-center mb-4">
          <p className="mb-2" style={{ color: "#6c757d", fontSize: "14px" }}>
            Seja bem vindo!
          </p>
          <h2 className="fw-bold" style={{ color: "#2e7d32", fontSize: "28px" }}>
            {isLogin ? "Login" : "Cadastrar"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="nome" className="form-label" style={{ color: "#424242", fontWeight: "500" }}>
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleInputChange}
                style={{
                  borderColor: "#4caf50",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "14px",
                }}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: "#424242", fontWeight: "500" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                borderColor: "#4caf50",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "14px",
              }}
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="telefone" className="form-label" style={{ color: "#424242", fontWeight: "500" }}>
                Telefone
              </label>
              <input
                type="tel"
                className="form-control"
                id="telefone"
                name="telefone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                style={{
                  borderColor: "#4caf50",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "14px",
                }}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="senha" className="form-label" style={{ color: "#424242", fontWeight: "500" }}>
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="senha"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleInputChange}
              style={{
                borderColor: "#4caf50",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "14px",
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              backgroundColor: "#2e7d32",
              borderColor: "#2e7d32",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1b5e20")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2e7d32")}
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={toggleMode}
              style={{
                color: "#2e7d32",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {isLogin ? "Não possui conta? Fazer Cadastro" : "Já possui conta? Fazer Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginCadastro
