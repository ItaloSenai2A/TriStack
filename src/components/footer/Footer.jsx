"use client";

import React from "react";

function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "10px 0",
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "12px",
        fontFamily: "'Josefin Sans', sans-serif",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",

        // 👇 o segredo: espaço pro footer não ficar coberto pela sidebar
        paddingLeft: "220px",
      }}
      className="footer"
    >
      <div style={{ marginBottom: "5px" }}>
        © 2025 TriStack. Todos os direitos reservados.
      </div>
      <div>
        <a href="/sobre" style={linkStyle}>
          Sobre Nós
        </a>{" "}
        |{" "}
        <a href="/contato" style={linkStyle}>
          Contato
        </a>
      </div>

      {/* Responsividade: remove padding no mobile */}
      <style>
        {`
          @media (max-width: 992px) {
            .footer {
              padding-left: 0 !important;
            }
          }
        `}
      </style>
    </footer>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "0 5px",
};

export default Footer;
