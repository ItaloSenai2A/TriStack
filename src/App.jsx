"use client";

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// 🧩 Componentes principais
import Sidebar from "./components/header/Sidebar.jsx";
import Header from "./components/header/Header.jsx";
import HeaderMobile from "./components/header/HeaderMobile.jsx";
import TopBar from "./components/header/TopBar.jsx";
import Footer from "./components/footer/Footer.jsx";

// 🧭 Páginas
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Alertas from "./pages/Alertas.jsx";
import Sair from "./pages/Sair.jsx";

// 🔒 Rota privada
const PrivateRoute = ({ children }) => {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  return usuarioLogado ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Barra superior */}
      <TopBar />

      {/* Fundo escuro que fecha o menu no mobile */}
      <div
        className={isMobileMenuOpen ? "d-block" : "d-none"}
        onClick={closeMobileMenu}
      ></div>

      {/* Menu lateral */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Conteúdo principal */}
      <div className="d-flex flex-column">
        <div className="main-content">
          <Header />
          <HeaderMobile
            onMenuToggle={toggleMobileMenu}
            isMenuOpen={isMobileMenuOpen}
          />

          <main>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />

              {/* Rotas privadas */}
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/alertas"
                element={
                  <PrivateRoute>
                    <Alertas />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sair"
                element={
                  <PrivateRoute>
                    <Sair />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>

          {/* Rodapé */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
