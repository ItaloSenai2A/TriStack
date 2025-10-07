import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
a
function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      const { nome } = JSON.parse(usuarioLogado);
      setUsuario(nome);
    } else {
      setUsuario("");
    }
  }, [location]);

  const pageTitles = {
    "/": "Login",
    "/login": "Login",
    "/cadastro": "Cadastro",
    "/home": "Home",
    "/dashboard": "Dashboard",
    "/alertas": "Alertas",
    "/configuracoes": "Configurações",
    "/administracao": "Administração da Área",
    "/sair": "Sair",
  };

  const titulo = pageTitles[location.pathname] || "TriStack";

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  const irPara = (rota) => {
    navigate(rota);
    fecharMenu();
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 position-relative"
      style={{
        backgroundColor: "#f5f5f5",
        borderBottom: "4px solid #4CB917",
        fontFamily: "'Josefin Sans', sans-serif",
      }}
    >
      {/* 🟩 Nome da página alinhado à esquerda, logo após o sidebar */}
      <h4
        className="fw-bold mb-0"
        style={{
          fontSize: "25px",
          color: "#246816",
          marginLeft: "270px", // ajusta conforme a largura do sidebar
          textAlign: "left",
        }}
      >
        {titulo}
      </h4>

      {/* Ícone e nome do usuário à direita */}
      {usuario && (
        <div className="position-relative ms-auto">
          <div
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={toggleMenu}
          >
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
            <span
              className="fw-semibold"
              style={{ fontSize: "16px", color: "#4CB917" }}
            >
              {usuario}
            </span>
          </div>

          {/* 🔽 Dropdown Menu */}
          {menuAberto && (
            <div
              className="card shadow position-absolute end-0 mt-2"
              style={{
                width: "180px",
                borderRadius: "10px",
                zIndex: "999",
                backgroundColor: "#fff",
              }}
            >
              <ul className="list-unstyled mb-0">
                <li
                  className="p-2 px-3"
                  style={{
                    cursor: "pointer",
                    color: "#4CB917",
                    fontWeight: "500",
                  }}
                  onClick={() => irPara("/configuracoes")}
                >
                  ⚙️ Configurações
                </li>
                <li
                  className="p-2 px-3"
                  style={{
                    cursor: "pointer",
                    color: "#4CB917",
                    fontWeight: "500",
                  }}
                  onClick={() => irPara("/sair")}
                >
                  🚪 Sair
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TopBar;
