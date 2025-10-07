import React, { useState, useEffect } from "react";
import { ChevronRight, X } from "lucide-react";

export default function Configuracoes() {
  const [modalAberto, setModalAberto] = useState(null);
  const [cardAnimado, setCardAnimado] = useState(false);

  // Preferências de Alertas
  const [umidade, setUmidade] = useState(true);
  const [temperatura, setTemperatura] = useState(false);

  // Limites Críticos
  const [limiteUmidade, setLimiteUmidade] = useState(50);
  const [limiteTemperatura, setLimiteTemperatura] = useState(25);

  // Perfil - pega do localStorage ou usa valor padrão
  const [nomeUsuario, setNomeUsuario] = useState(() => localStorage.getItem("nomeUsuario") || "Usuário");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [fotoPerfil, setFotoPerfil] = useState(() => localStorage.getItem("fotoPerfil") || null);

  useEffect(() => {
    setCardAnimado(true);
  }, []);

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
    localStorage.setItem("fotoPerfil", fotoPerfil || ""); // salva foto se houver
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

  return (
    <div style={container}>
      <div
        style={{
          ...card,
          transform: cardAnimado ? "translateY(0)" : "translateY(50px)",
          opacity: cardAnimado ? 1 : 0,
          transition: "all 0.6s ease",
        }}
      >
        <div style={perfil}>
          <div style={avatar}>
            <img
              src={fotoPerfil || "/src/assets/perfilanonimo.webp"} // imagem padrão anônima
              alt="Perfil"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <h2 style={nome}>{nomeUsuario}</h2>
        </div>

        <div style={opcoes}>
          <div style={botaoEstilo} onClick={() => abrirModal("preferencias")}>
            <span>Preferências de Alertas</span>
            <ChevronRight size={18} color="#4CAF50" />
          </div>

          <div style={botaoEstilo} onClick={() => abrirModal("limites")}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <span>Limites Críticos</span>
              <div style={barraFundo}>
                <div style={{ ...barraProgresso, width: `${limiteUmidade}%`, backgroundColor: "#4CAF50" }}></div>
              </div>
              <span style={subTexto}>{`Umidade mínima: ${limiteUmidade}%`}</span>
              <div style={barraFundo}>
                <div style={{ ...barraProgresso, width: `${limiteTemperatura}%`, backgroundColor: "#FF5722" }}></div>
              </div>
              <span style={subTexto}>{`Temperatura máxima: ${limiteTemperatura}°C`}</span>
            </div>
            <ChevronRight size={18} color="#4CAF50" />
          </div>

          <div style={botaoEstilo} onClick={() => abrirModal("perfil")}>
            <span>Meu Perfil</span>
            <ChevronRight size={18} color="#4CAF50" />
          </div>
        </div>
      </div>

      {modalAberto && (
        <div style={overlay} onClick={fecharModal}>
          <div
            style={{
              ...modal,
              transform: "translateX(calc(-50% + 90px)) translateY(-20px)",
              opacity: 0,
              animation: "modalOpen 0.4s forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button style={fecharBtn} onClick={fecharModal}>
              <X size={20} color="#4CAF50" />
            </button>

            {modalAberto === "preferencias" && (
              <>
                <h3 style={tituloModal}>Preferências de Alertas</h3>
                <p style={textoModal}>
                  Configure as notificações que deseja receber sobre o estado das plantações e alertas climáticos.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}>
                  <div style={toggleContainer} onClick={() => setUmidade(!umidade)}>
                    <span style={toggleLabel}>Receber alertas de umidade</span>
                    <div style={toggleSwitch(umidade)}>
                      <div style={toggleThumb(umidade)}></div>
                    </div>
                  </div>
                  <div style={toggleContainer} onClick={() => setTemperatura(!temperatura)}>
                    <span style={toggleLabel}>Receber alertas de temperatura</span>
                    <div style={toggleSwitch(temperatura)}>
                      <div style={toggleThumb(temperatura)}></div>
                    </div>
                  </div>
                  <button style={botaoSalvar} onClick={salvarPreferencias}>Salvar</button>
                </div>
              </>
            )}

            {modalAberto === "limites" && (
              <>
                <h3 style={tituloModal}>Limites Críticos</h3>
                <p style={textoModal}>Ajuste os valores máximos e mínimos para sensores de umidade e temperatura.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}>
                  <label>
                    Umidade mínima (%):
                    <input
                      type="number"
                      value={limiteUmidade}
                      onChange={(e) => setLimiteUmidade(Number(e.target.value))}
                      style={inputEstilo}
                    />
                  </label>
                  <label>
                    Temperatura máxima (°C):
                    <input
                      type="number"
                      value={limiteTemperatura}
                      onChange={(e) => setLimiteTemperatura(Number(e.target.value))}
                      style={inputEstilo}
                    />
                  </label>
                  <button style={botaoSalvar} onClick={salvarLimites}>Salvar</button>
                </div>
              </>
            )}

            {modalAberto === "perfil" && (
              <>
                <h3 style={tituloModal}>Meu Perfil</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}>
                  <label>
                    Nome:
                    <input
                      type="text"
                      value={nomeUsuario}
                      onChange={(e) => setNomeUsuario(e.target.value)}
                      style={inputEstilo}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputEstilo}
                    />
                  </label>
                  <label>
                    Foto de Perfil:
                    <input type="file" accept="image/*" onChange={selecionarFoto} style={{ marginTop: "4px" }} />
                  </label>
                  <button style={botaoSalvar} onClick={salvarPerfil}>Salvar</button>
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

/* --- Estilos --- */
const container = { backgroundColor: "#f4f6f3", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "20px" };
const card = { backgroundColor: "#fff", border: "1px solid #4CAF50", borderRadius: "25px", width: "340px", padding: "25px", position: "relative", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "180px", marginTop:"30px" };
const perfil = { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", marginTop: "10px" };
const avatar = { backgroundColor: "#e8f5e9", borderRadius: "50%", width: "70px", height: "70px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px", border: "1px solid #4CAF50", fontSize: "30px", overflow: "hidden" };
const nome = { fontSize: "18px", fontWeight: "600", color: "#2e7d32", margin: 0 };
const opcoes = { display: "flex", flexDirection: "column", gap: "12px", width: "100%" };
const botaoEstilo = { backgroundColor: "#f5f5f5", borderRadius: "10px", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "0.2s" };
const overlay = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modal = { backgroundColor: "#fdfdfd", borderRadius: "20px", padding: "30px 25px", width: "360px", maxWidth: "90%", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", position: "absolute", left: "50%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", fontFamily: "Arial, sans-serif", border: "1px solid #4CAF50" };
const fecharBtn = { position: "absolute", top: "15px", right: "15px", background: "none", border: "none", cursor: "pointer" };
const tituloModal = { color: "#2e7d32", fontSize: "20px", fontWeight: "700", marginBottom: "5px", textAlign: "center" };
const textoModal = { color: "#555", fontSize: "15px", lineHeight: "1.6", textAlign: "center" };
const botaoSalvar = { marginTop: "10px", padding: "10px 18px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px" };
const toggleContainer = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 15px", backgroundColor: "#f5f5f5", borderRadius: "12px", cursor: "pointer", transition: "0.3s" };
const toggleLabel = { fontSize: "14px", color: "#333" };
const toggleSwitch = (ativo) => ({ width: "40px", height: "20px", borderRadius: "12px", backgroundColor: ativo ? "#4CAF50" : "#ccc", position: "relative", transition: "0.3s" });
const toggleThumb = (ativo) => ({ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#fff", position: "absolute", top: "1px", left: ativo ? "20px" : "2px", transition: "0.3s" });
const inputEstilo = { padding: "8px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", marginTop: "4px" };
const barraFundo = { width: "100%", height: "8px", backgroundColor: "#e0e0e0", borderRadius: "8px", marginTop: "6px", overflow: "hidden" };
const barraProgresso = { height: "100%", borderRadius: "8px 0 0 8px", transition: "width 0.4s ease" };
const subTexto = { fontSize: "12px", color: "#555", marginTop: "4px" };
