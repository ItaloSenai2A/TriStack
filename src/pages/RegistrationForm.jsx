"use client"

import { useState } from "react"

function RegistrationForm() {
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
    console.log("Form submitted:", formData)
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-4">
      <div className="registration-card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <p className="text-muted mb-2">Seja bem vindo!</p>
          <h2 className="fw-bold">Cadastrar</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
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
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
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
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telefone" className="form-label">
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
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="senha" className="form-label">
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
              required
            />
          </div>

          <button type="submit" className="btn btn-tristack w-100 mb-3">
            Entrar
          </button>

          <div className="text-center">
            <button type="button" className="btn btn-link text-decoration-none">
              Já possui conta? Fazer Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
