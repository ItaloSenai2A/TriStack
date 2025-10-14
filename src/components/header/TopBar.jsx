import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

function TopBar({ isDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      const { nome } = JSON.parse(usuarioLogado);
      setUsuario(nome);
    } else setUsuario("");
  }, [location]);

  const pageTitles = {
    "/": "Login",
    "/login": "Login",
    "/cadastro": "Cadastro",
    "/home": "Home",
    "/dashboard": "Dashboard",
    "/alertas": "Alertas",
    "/configuracoes": "Configurações",
    "/meuperfil": "Meu Perfil",
    "/administracao": "Administração da Área",
    "/sair": "Sair",
  };

  const titulo = pageTitles[location.pathname] || "TriStack";

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const toggleNotificacoes = () => setNotificacoesAbertas(!notificacoesAbertas);
  const fecharTudo = () => {
    setMenuAberto(false);
    setNotificacoesAbertas(false);
  };

  const irPara = (rota) => {
    navigate(rota);
    fecharTudo();
  };

  const alertas = [
    { tipo: "Notificação crítica", descricao: "Ação imediata necessária", cor: "#ff4d4d" },
    { tipo: "Notificação moderada", descricao: "Verificar em breve", cor: "#ffc107" },
    { tipo: "Notificação informativa", descricao: "Sem urgência", cor: "#4CB917" },
  ];

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 position-relative"
      style={{
        backgroundColor: isDarkMode ? "#14482b" : "#f5f5f5",
        borderBottom: `4px solid ${isDarkMode ? "#fff" : "#4CB917"}`,
        color: isDarkMode ? "#fff" : "#246816",
        fontFamily: "'Josefin Sans', sans-serif",
      }}
    >
      <h4
        className="fw-bold mb-0"
        style={{
          fontSize: "25px",
          marginLeft: "270px",
        }}
      >
        {titulo}
      </h4>

      {usuario && (
        <div className="position-relative ms-auto d-flex align-items-center gap-3">
          {/* ÍCONE DE NOTIFICAÇÃO */}
          <div
            style={{
              position: "relative",
              cursor: "pointer",
            }}
            onClick={toggleNotificacoes}
          >
            <FaBell
              size={22}
              color={isDarkMode ? "#fff" : "#4CB917"}
              style={{
                transition: "transform 0.2s ease",
                transform: notificacoesAbertas ? "rotate(15deg)" : "rotate(0)",
              }}
            />
            {alertas.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>

          {/* MENU DE NOTIFICAÇÕES */}
          <div
            className="card shadow position-absolute end-100 me-4"
            style={{
              width: "260px",
              borderRadius: "10px",
              zIndex: "999",
              backgroundColor: isDarkMode ? "#246816" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
              top: notificacoesAbertas ? "60px" : "40px", // desce suavemente
              opacity: notificacoesAbertas ? 1 : 0,
              transform: notificacoesAbertas
                ? "translateY(0)"
                : "translateY(-10px)",
              transition: "all 0.3s ease",
              pointerEvents: notificacoesAbertas ? "auto" : "none",
            }}
          >
            <ul className="list-unstyled mb-0">
              {alertas.map((alerta, index) => (
                <li
                  key={index}
                  className="p-2 px-3 border-bottom"
                  style={{
                    cursor: "pointer",
                    fontWeight: "500",
                    borderColor: isDarkMode ? "#14482b" : "#ddd",
                  }}
                  onClick={() => irPara("/alertas")}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: alerta.cor,
                      marginRight: "8px",
                    }}
                  ></span>
                  {alerta.tipo} <br />
                  <small style={{ fontSize: "13px", opacity: 0.8 }}>
                    {alerta.descricao}
                  </small>
                </li>
              ))}
              <li
                className="p-2 text-center fw-semibold"
                style={{
                  cursor: "pointer",
                  color: isDarkMode ? "#d1ffd1" : "#4CB917",
                }}
                onClick={() => irPara("/alertas")}
              >
                Ver todos os alertas
              </li>
            </ul>
          </div>

          {/* ÍCONE DE USUÁRIO */}
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
                fill={isDarkMode ? "#fff" : "#fff"}
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
              style={{ fontSize: "16px", color: isDarkMode ? "#fff" : "#4CB917" }}
            >
              {usuario}
            </span>
          </div>

          {/* MENU DO USUÁRIO */}
          {menuAberto && (
            <div
              className="card shadow position-absolute end-0 mt-2"
              style={{
                width: "180px",
                borderRadius: "10px",
                zIndex: "999",
                backgroundColor: isDarkMode ? "#246816" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
              }}
            >
              <ul className="list-unstyled mb-0">
                <li
                  className="p-2 px-3"
                  style={{ cursor: "pointer", fontWeight: "500" }}
                  onClick={() => irPara("/meuperfil")}
                >
                  👤 Meu Perfil
                </li>
                <li
                  className="p-2 px-3"
                  style={{ cursor: "pointer", fontWeight: "500" }}
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
