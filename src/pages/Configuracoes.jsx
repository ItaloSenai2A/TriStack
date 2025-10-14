"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const parametrosIniciais = [
  { nome: "Luz", valor: 200, limite: 250, unidade: "lux", alerta: "" },
  { nome: "Vento", valor: 25, limite: 20, unidade: "km/h", alerta: "" },
  { nome: "Solo", valor: 75, limite: 60, unidade: "%", alerta: "" },
  { nome: "Qualidade do Ar", valor: 120, limite: 100, unidade: "AQI", alerta: "" },
  { nome: "Chuva", valor: 90, limite: 80, unidade: "mm", alerta: "" },
  { nome: "Umidade", valor: 65, limite: 60, unidade: "%", alerta: "" },
  { nome: "Água", valor: 75, limite: 50, unidade: "%", alerta: "" },
  { nome: "Temperatura", valor: 35, limite: 30, unidade: "°C", alerta: "" },
];

const gerarAlerta = (nome, valor, limite) => {
  if (valor <= limite) return "";
  switch (nome) {
    case "Água":
      return valor > limite + 20 ? "⚠️ Enchente!" : "⚠️ Nível elevado!";
    case "Vento":
      return "⚠️ Tempestade!";
    case "Solo":
      return "⚠️ Solo degradado!";
    case "Temperatura":
      return "⚠️ Temperatura crítica!";
    case "Chuva":
      return "⚠️ Chuvas intensas!";
    case "Umidade":
      return "⚠️ Seca!";
    case "Qualidade do Ar":
      return "⚠️ Poluição elevada!";
    default:
      return "⚠️ Limite ultrapassado!";
  }
};

export default function LimitesCriticos({ isDarkMode }) {
  const [parametros, setParametros] = useState(parametrosIniciais);

  useEffect(() => {
    const novosParametros = parametros.map((p) => {
      const alerta = gerarAlerta(p.nome, p.valor, p.limite);
      if (alerta && alerta !== p.alerta) {
        toast.warn(`${p.nome}: ${alerta}`, { position: "top-right" });
      }
      return { ...p, alerta };
    });
    setParametros(novosParametros);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bgContainer = isDarkMode ? "#121d18" : "#f4f6f3";
  const colorText = isDarkMode ? "#fff" : "#1b3a2f";
  const bgBox = isDarkMode ? "#1b3a2f" : "#fff";

  const atualizarLimite = (index, novoLimite) => {
    const copia = [...parametros];
    copia[index].limite = Number(novoLimite);
    setParametros(copia);

    // Verifica se precisa disparar alerta imediatamente
    const alerta = gerarAlerta(copia[index].nome, copia[index].valor, copia[index].limite);
    copia[index].alerta = alerta;
    if (alerta) toast.warn(`${copia[index].nome}: ${alerta}`, { position: "top-right" });
    setParametros(copia);
  };

  // Linhas: 3, 3, 2
  const linhas = [
    parametros.slice(0, 3),
    parametros.slice(3, 6),
    parametros.slice(6, 8),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: bgContainer,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "30px",
      }}
    >
      {linhas.map((linha, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px",
            width: "100%",
            paddingLeft: "290px", // desloca para direita
          }}
        >
          {linha.map((p, i) => (
            <CardParametro
              key={p.nome}
              p={p}
              colorText={colorText}
              bgBox={bgBox}
              atualizarLimite={atualizarLimite}
              index={idx * 3 + i}
            />
          ))}
        </div>
      ))}

      <ToastContainer />
    </div>
  );
}

function CardParametro({ p, colorText, bgBox, atualizarLimite, index }) {
  const ultrapassou = p.valor > p.limite;

  return (
    <div
      style={{
        backgroundColor: bgBox,
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        border: ultrapassou ? "2px solid #FF4C4C" : "2px solid #4CAF50",
        transition: "all 0.3s ease",
        height: "220px",
        width: "280px",
      }}
    >
      <h3 style={{ color: colorText, marginBottom: "10px" }}>{p.nome}</h3>

      <div
        style={{
          width: "100%",
          height: "12px",
          borderRadius: "6px",
          backgroundColor: "#ccc",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: `${Math.min((p.valor / p.limite) * 100, 100)}%`,
            height: "100%",
            backgroundColor: ultrapassou ? "#FF4C4C" : "#4CAF50",
            transition: "width 0.4s ease",
          }}
        ></div>
      </div>

      <span style={{ color: colorText, fontWeight: "600" }}>
        Atual: {p.valor} {p.unidade} | Limite: {p.limite} {p.unidade}
      </span>

      {ultrapassou && (
        <span style={{ color: "#FF4C4C", fontWeight: "700", marginTop: "6px" }}>
          {p.alerta}
        </span>
      )}

      <input
        type="number"
        value={p.limite}
        onChange={(e) => atualizarLimite(index, e.target.value)}
        style={{
          marginTop: "12px",
          width: "90%",
          padding: "6px",
          borderRadius: "6px",
          border: "1px solid #888",
          textAlign: "center",
        }}
      />
      <span style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
        Defina limite máximo
      </span>
    </div>
  );
}
