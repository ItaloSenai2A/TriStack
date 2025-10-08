import React, { useState } from "react";

const Footer = () => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type) => {
    if (type === "contato") {
      setModalContent({
        title: "Contato",
        text: (
          <>
            <p>
              📧 <strong>Email:</strong> suporte@tristack.com
            </p>
            <p>
              📞 <strong>Telefone:</strong> (14) 99999-9999
            </p>
            <p>
              🕒 <strong>Horário de atendimento:</strong> 08h às 18h (Seg a Sex)
            </p>
          </>
        ),
      });
    } else if (type === "sobre") {
      setModalContent({
        title: "Sobre Nós 🧑🏻‍🌾",
        text: (
          <>
            <p>
              O Mapa Vivo do Campo Inteligente é um projeto da equipe TriStack, criada em Jaú – SP, com o objetivo de unir tecnologia, sustentabilidade e inovação no agronegócio. Através da integração entre sensores IoT e uma plataforma digital, buscamos apoiar produtores na gestão eficiente de recursos e na prevenção de impactos ambientais. A TriStack acredita que o futuro do campo está na inteligência e na colaboração entre pessoas e tecnologia.
            </p>
          </>
        ),
      });
    }
  };

  const closeModal = () => setModalContent(null);

  return (
    <>
      <footer
        style={{
          width: "100%",
          padding: "15px 0",
          backgroundColor: "#000",
          color: "#fff",
          fontSize: "13px",
          fontFamily: "'Josefin Sans', sans-serif",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "220px",
          alignItems: "center",
          textAlign: "center",
        }}
        className="footer"
      >
        <div style={{ marginBottom: "5px" }}>
          © 2025 TriStack. Todos os direitos reservados.
        </div>
        <div>
          <button
            onClick={() => openModal("sobre")}
            style={{ ...linkStyle, color: "#fff" }}
          >
            Sobre Nós
          </button>{" "}
          |{" "}
          <button
            onClick={() => openModal("contato")}
            style={{ ...linkStyle, color: "#fff" }}
          >
            Contato
          </button>
        </div>
      </footer>

      {/* Modal */}
      {modalContent && (
        <div style={overlayStyle} onClick={closeModal}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: "15px", color: "#00b56a" }}>
              {modalContent.title}
            </h3>
            <div
              style={{
                fontSize: "14px",
                marginBottom: "20px",
                lineHeight: "1.6",
                color: "#000",
              }}
            >
              {modalContent.text}
            </div>
            <button style={closeBtnStyle} onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const linkStyle = {
  textDecoration: "none",
  margin: "0 8px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
  fontFamily: "'Josefin Sans', sans-serif",
  transition: "opacity 0.2s ease",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
  padding: "15px",
};

const modalStyle = {
  backgroundColor: "#fff",
  color: "#000",
  padding: "30px 25px",
  borderRadius: "14px",
  width: "100%",
  maxWidth: "480px",
  textAlign: "center",
  boxShadow: "0 0 25px rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(0,0,0,0.1)",
};

const closeBtnStyle = {
  backgroundColor: "#00b56a",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "14px",
  fontFamily: "'Josefin Sans', sans-serif",
  fontWeight: "600",
  transition: "background 0.2s ease",
};

export default Footer;
