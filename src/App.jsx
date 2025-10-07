"use client";

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import Sair from "./pages/Sair.jsx"; // ✅ Nova tela de saída

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Alterna menu lateral no mobile
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
              {/* Rotas do sistema */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alertas" element={<Alertas />} />
              <Route path="/sair" element={<Sair />} /> {/* ✅ Nova rota adicionada */}
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
