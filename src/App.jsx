"use client";

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Componentes
import Sidebar from "./components/header/Sidebar.jsx";
import TopBar from "./components/header/TopBar.jsx";
import Footer from "./components/footer/Footer.jsx";

// Páginas
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Alertas from "./pages/Alertas.jsx";
import Sair from "./pages/Sair.jsx";
import Configuracoes from "./pages/Configuracoes.jsx";
import Administracao from "./pages/Administracao.jsx";
import MeuPerfil from "./pages/MeuPerfil.jsx"; // ✅ import da nova página

// Rota privada
const PrivateRoute = ({ children }) => {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  return usuarioLogado ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Atualiza cores do body globalmente
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#1b3a2f" : "#fff";
    document.body.style.color = isDarkMode ? "#fff" : "#000";
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <TopBar isDarkMode={isDarkMode} />
      <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main style={{ padding: "20px", minHeight: "calc(100vh - 120px)" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
          <Route path="/cadastro" element={<Cadastro isDarkMode={isDarkMode} />} />

          {/* 🔒 Rotas protegidas */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route
            path="/alertas"
            element={
              <PrivateRoute>
                <Alertas isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <Configuracoes isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route
            path="/administracao"
            element={
              <PrivateRoute>
                <Administracao isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route
            path="/meuperfil"
            element={
              <PrivateRoute>
                <MeuPerfil isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route
            path="/sair"
            element={
              <PrivateRoute>
                <Sair isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
