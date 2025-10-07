"use client";

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // só Routes e Route, sem BrowserRouter

import Sidebar from "./components/header/Sidebar.jsx";
import Header from "./components/header/Header.jsx";
import HeaderMobile from "./components/header/HeaderMobile.jsx";
import TopBar from "./components/header/TopBar.jsx";
import Footer from "./components/footer/Footer.jsx";

import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Alertas from "./pages/Alertas.jsx"; // 👈 importa a tela de Alertas

// Exemplo de Home
function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 Bem-vindo à Home!</h1>
      <p>Agora você está logado no sistema TriStack - Versão 2.0.</p>
    </div>
  );
}

// Exemplo de Dashboard
function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard</h1>
      <p>Área interna do sistema.</p>
    </div>
  );
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <TopBar />

      <div
        className={isMobileMenuOpen ? "d-block" : "d-none"}
        onClick={closeMobileMenu}
      ></div>

      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      <div className="d-flex flex-column">
        <div className="main-content">
          <Header />
          <HeaderMobile
            onMenuToggle={toggleMobileMenu}
            isMenuOpen={isMobileMenuOpen}
          />

          <main>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alertas" element={<Alertas />} /> {/* 👈 nova rota */}
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
