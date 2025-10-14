import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function MeuPerfil({ isDarkMode }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [cardAnimado, setCardAnimado] = useState(false);

  // Perfil
  const [nomeUsuario, setNomeUsuario] = useState(() => localStorage.getItem("nomeUsuario") || "Usuário");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [fotoPerfil, setFotoPerfil] = useState(() => localStorage.getItem("fotoPerfil") || null);

  useEffect(() => setCardAnimado(true), []);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

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

  // Cores do tema
  const bgContainer = isDarkMode ? "#1b3a2f" : "#f4f6f3";
  const bgCard = isDarkMode ? "#ffffff" : "#fff";
  const borderCard = isDarkMode ? "#205c31" : "#4CAF50";
  const colorText = isDarkMode ? "#000000" : "#2e7d32";

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
        {/* Perfil principal */}
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
          <p style={{ fontSize: "14px", color: "#777" }}>{email || "Sem e-mail cadastrado"}</p>
        </div>

        <button
          style={{
            ...botaoEditar,
            backgroundColor: isDarkMode ? "#14482b" : "#4CB917",
            color: "#fff",
          }}
          onClick={abrirModal}
        >
          Editar Perfil
        </button>
      </div>

      {/* Modal de edição */}
      {modalAberto && (
        <div style={{ ...overlay }} onClick={fecharModal}>
          <div
            style={{
              ...modal,
              backgroundColor: bgCard,
              border: `1px solid ${borderCard}`,
              color: colorText,
              transform: "translateX(-50%) translateY(-20px)",
              opacity: 0,
              animation: "modalOpen 0.4s forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button style={fecharBtn} onClick={fecharModal}>
              <X size={20} color="#fff" />
            </button>

            <h3 style={{ ...tituloModal, color: colorText }}>Editar Perfil</h3>
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
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes modalOpen {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

/* --- Estilos --- */
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "20px",
};
const card = {
  borderRadius: "25px",
  width: "340px",
  padding: "25px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "180px",
  marginTop: "40px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};
const perfil = { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", marginTop: "10px" };
const avatar = {
  borderRadius: "50%",
  width: "90px",
  height: "90px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
  fontSize: "30px",
  overflow: "hidden",
};
const nome = { fontSize: "20px", fontWeight: "600", margin: 0 };
const botaoEditar = {
  border: "none",
  borderRadius: "10px",
  padding: "10px 16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.2s",
};
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  backgroundColor: "rgba(0,0,0,0.7)",
};
const modal = {
  borderRadius: "20px",
  padding: "30px 25px",
  width: "360px",
  maxWidth: "90%",
  position: "absolute",
  left: "50%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  fontFamily: "Arial, sans-serif",
};
const fecharBtn = { position: "absolute", top: "15px", right: "15px", background: "none", border: "none", cursor: "pointer" };
const tituloModal = { fontSize: "20px", fontWeight: "700", marginBottom: "5px", textAlign: "center" };
const inputEstilo = { padding: "8px", borderRadius: "8px", width: "100%", marginTop: "4px" };
const botaoSalvar = { marginTop: "10px", padding: "10px 18px", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px" };
