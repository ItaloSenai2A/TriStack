import React, { useState, useEffect } from "react";
import { ChevronRight, X } from "lucide-react";

export default function Configuracoes({ isDarkMode }) {
  const [modalAberto, setModalAberto] = useState(null);
  const [cardAnimado, setCardAnimado] = useState(false);

  // Preferências de Alertas
  const [umidade, setUmidade] = useState(true);
  const [temperatura, setTemperatura] = useState(false);

  // Limites Críticos
  const [limiteUmidade, setLimiteUmidade] = useState(50);
  const [limiteTemperatura, setLimiteTemperatura] = useState(25);

  // Perfil
  const [nomeUsuario, setNomeUsuario] = useState(() => localStorage.getItem("nomeUsuario") || "Usuário");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [fotoPerfil, setFotoPerfil] = useState(() => localStorage.getItem("fotoPerfil") || null);

  useEffect(() => setCardAnimado(true), []);

  const abrirModal = (tipo) => setModalAberto(tipo);
  const fecharModal = () => setModalAberto(null);

  const salvarPreferencias = () => {
    alert(`Preferências salvas!\nUmidade: ${umidade}\nTemperatura: ${temperatura}`);
    fecharModal();
  };

  const salvarLimites = () => {
    alert(`Limites salvos!\nUmidade mínima: ${limiteUmidade}%\nTemperatura máxima: ${limiteTemperatura}°C`);
    fecharModal();
  };

  const salvarPerfil = () => {
    localStorage.setItem("nomeUsuario", nomeUsuario);
    localStorage.setItem("email", email);
    localStorage.setItem("fotoPerfil", fotoPerfil || "");
    alert(`Perfil atualizado!\nNome: ${nomeUsuario}\nEmail: ${email}`);
    fecharModal();
  };

  const selecionarFoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setFotoPerfil(ev.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /* --- Estilos adaptados --- */
  const bgContainer = isDarkMode ? "#1b3a2f" : "#f4f6f3";
  const bgCard = isDarkMode ? "#ffffff" : "#fff";
  const borderCard = isDarkMode ? "#205c31" : "#4CAF50";
  const colorText = isDarkMode ? "#000000" : "#2e7d32";
  const bgBotao = isDarkMode ? "#d1e7c8" : "#f5f5f5";
  const colorSubTexto = isDarkMode ? "#000000" : "#555";

  return (
    <div style={{ ...container, backgroundColor: bgContainer }}>
      <div
        style={{
          ...card,
          backgroundColor: bgCard,
          border: `1px solid ${borderCard}`,
          color: colorText,
          transform: cardAnimado ? "translateY(0)" : "translateY(50px)",
          opacity: cardAnimado ? 1 : 0,
          transition: "all 0.6s ease",
        }}
      >
        <div style={perfil}>
          <div
            style={{
              ...avatar,
              backgroundColor: isDarkMode ? "#1b3a2f" : "#e8f5e9",
              border: `1px solid ${borderCard}`,
            }}
          >
            <img
              src={fotoPerfil || "/src/assets/perfilanonimo.webp"}
              alt="Perfil"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <h2 style={{ ...nome, color: colorText }}>{nomeUsuario}</h2>
        </div>

        <div style={opcoes}>
          <div
            style={{ ...botaoEstilo, backgroundColor: bgBotao, border: `1px solid ${borderCard}` }}
            onClick={() => abrirModal("preferencias")}
          >
            <span>Preferências de Alertas</span>
            <ChevronRight size={18} color="#fff" />
          </div>

          <div
            style={{ ...botaoEstilo, backgroundColor: bgBotao, border: `1px solid ${borderCard}` }}
            onClick={() => abrirModal("limites")}
          >
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <span style={{ color: colorText }}>Limites Críticos</span>
              <div style={{ ...barraFundo, border: `1px solid ${borderCard}` }}>
                <div style={{ ...barraProgresso, width: `${limiteUmidade}%`, backgroundColor: "#4CAF50" }}></div>
              </div>
              <span style={{ ...subTexto, color: colorSubTexto }}>{`Umidade mínima: ${limiteUmidade}%`}</span>
              <div style={{ ...barraFundo, border: `1px solid ${borderCard}` }}>
                <div style={{ ...barraProgresso, width: `${limiteTemperatura}%`, backgroundColor: "#FF5722" }}></div>
              </div>
              <span style={{ ...subTexto, color: colorSubTexto }}>{`Temperatura máxima: ${limiteTemperatura}°C`}</span>
            </div>
            <ChevronRight size={18} color="#fff" />
          </div>

          <div
            style={{ ...botaoEstilo, backgroundColor: bgBotao, border: `1px solid ${borderCard}` }}
            onClick={() => abrirModal("perfil")}
          >
            <span>Meu Perfil</span>
            <ChevronRight size={18} color="#fff" />
          </div>
        </div>
      </div>

      {modalAberto && (
        <div style={{ ...overlay }} onClick={fecharModal}>
          <div
            style={{
              ...modal,
              backgroundColor: bgCard, // mesma cor do card
              border: `1px solid ${borderCard}`,
              color: colorText,
              transform: "translateX(calc(-50% + 90px)) translateY(-20px)",
              opacity: 0,
              animation: "modalOpen 0.4s forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button style={fecharBtn} onClick={fecharModal}>
              <X size={20} color="#fff" />
            </button>

            {/* Preferências */}
            {modalAberto === "preferencias" && (
              <>
                <h3 style={{ ...tituloModal, color: colorText }}>Preferências de Alertas</h3>
                <p style={{ ...textoModal, color: colorSubTexto }}>
                  Configure as notificações que deseja receber sobre o estado das plantações e alertas climáticos.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}>
                  <div style={{ ...toggleContainer, border: `1px solid ${borderCard}` }} onClick={() => setUmidade(!umidade)}>
                    <span style={{ ...toggleLabel, color: colorText }}>Receber alertas de umidade</span>
                    <div style={toggleSwitch(umidade)}>
                      <div style={toggleThumb(umidade)}></div>
                    </div>
                  </div>
                  <div style={{ ...toggleContainer, border: `1px solid ${borderCard}` }} onClick={() => setTemperatura(!temperatura)}>
                    <span style={{ ...toggleLabel, color: colorText }}>Receber alertas de temperatura</span>
                    <div style={toggleSwitch(temperatura)}>
                      <div style={toggleThumb(temperatura)}></div>
                    </div>
                  </div>
                  <button
                    style={{ ...botaoSalvar, backgroundColor: "#608759", color: "#fff", border: "1px solid #fff" }}
                    onClick={salvarPreferencias}
                  >
                    Salvar
                  </button>
                </div>
              </>
            )}

            {/* Limites */}
            {modalAberto === "limites" && (
              <>
                <h3 style={{ ...tituloModal, color: colorText }}>Limites Críticos</h3>
                <p style={{ ...textoModal, color: colorSubTexto }}>Ajuste os valores máximos e mínimos para sensores de umidade e temperatura.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}>
                  <label style={{ color: colorText }}>
                    Umidade mínima (%):
                    <input
                      type="number"
                      value={limiteUmidade}
                      onChange={(e) => setLimiteUmidade(Number(e.target.value))}
                      style={{ ...inputEstilo, backgroundColor: bgCard, color: colorText, border: `1px solid ${borderCard}` }}
                    />
                  </label>
                  <label style={{ color: colorText }}>
                    Temperatura máxima (°C):
                    <input
                      type="number"
                      value={limiteTemperatura}
                      onChange={(e) => setLimiteTemperatura(Number(e.target.value))}
                      style={{ ...inputEstilo, backgroundColor: bgCard, color: colorText, border: `1px solid ${borderCard}` }}
                    />
                  </label>
                  <button
                    style={{ ...botaoSalvar, backgroundColor: "#608759", color: "#fff", border: "1px solid #fff" }}
                    onClick={salvarLimites}
                  >
                    Salvar
                  </button>
                </div>
              </>
            )}

            {/* Perfil */}
            {modalAberto === "perfil" && (
              <>
                <h3 style={{ ...tituloModal, color: colorText }}>Meu Perfil</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}>
                  <label style={{ color: colorText }}>
                    Nome:
                    <input
                      type="text"
                      value={nomeUsuario}
                      onChange={(e) => setNomeUsuario(e.target.value)}
                      style={{ ...inputEstilo, backgroundColor: bgCard, color: colorText, border: `1px solid ${borderCard}` }}
                    />
                  </label>
                  <label style={{ color: colorText }}>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ ...inputEstilo, backgroundColor: bgCard, color: colorText, border: `1px solid ${borderCard}` }}
                    />
                  </label>
                  <label style={{ color: colorText }}>
                    Foto de Perfil:
                    <input type="file" accept="image/*" onChange={selecionarFoto} style={{ marginTop: "4px" }} />
                  </label>
                  <button
                    style={{ ...botaoSalvar, backgroundColor: "#608759", color: "#fff", border: "1px solid #fff" }}
                    onClick={salvarPerfil}
                  >
                    Salvar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes modalOpen {
            from { opacity: 0; transform: translateX(calc(-50% + 90px)) translateY(-20px); }
            to { opacity: 1; transform: translateX(calc(-50% + 90px)) translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

/* --- Estilos básicos --- */
const container = { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "20px" };
const card = { borderRadius: "25px", width: "340px", padding: "25px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "180px", marginTop:"30px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" };
const perfil = { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", marginTop: "10px" };
const avatar = { borderRadius: "50%", width: "70px", height: "70px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px", fontSize: "30px", overflow: "hidden" };
const nome = { fontSize: "18px", fontWeight: "600", margin: 0 };
const opcoes = { display: "flex", flexDirection: "column", gap: "12px", width: "100%" };
const botaoEstilo = { borderRadius: "10px", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "0.2s" };
const overlay = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, backgroundColor: "rgba(0,0,0,0.7)" };
const modal = { borderRadius: "20px", padding: "30px 25px", width: "360px", maxWidth: "90%", position: "absolute", left: "50%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", fontFamily: "Arial, sans-serif" };
const fecharBtn = { position: "absolute", top: "15px", right: "15px", background: "none", border: "none", cursor: "pointer" };
const tituloModal = { fontSize: "20px", fontWeight: "700", marginBottom: "5px", textAlign: "center" };
const textoModal = { fontSize: "15px", lineHeight: "1.6", textAlign: "center" };
const botaoSalvar = { marginTop: "10px", padding: "10px 18px", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px" };
const toggleContainer = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 15px", borderRadius: "12px", cursor: "pointer", transition: "0.3s" };
const toggleLabel = { fontSize: "14px" };
const toggleSwitch = (ativo) => ({ width: "40px", height: "20px", borderRadius: "12px", backgroundColor: ativo ? "#4CAF50" : "#ccc", position: "relative", transition: "0.3s", border: `1px solid #fff` });
const toggleThumb = (ativo) => ({ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#fff", position: "absolute", top: "1px", left: ativo ? "20px" : "2px", transition: "0.3s" });
const inputEstilo = { padding: "8px", borderRadius: "8px", width: "100%", marginTop: "4px" };
const barraFundo = { width: "100%", height: "8px", backgroundColor: "#e0e0e0", borderRadius: "8px", marginTop: "6px", overflow: "hidden" };
const barraProgresso = { height: "100%", borderRadius: "8px 0 0 8px", transition: "width 0.4s ease" };
const subTexto = { fontSize: "12px", marginTop: "4px" };
