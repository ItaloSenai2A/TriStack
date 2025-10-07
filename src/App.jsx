import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Sidebar from "./components/header/Sidebar.jsx";
import Header from "./components/header/Header.jsx";
import HeaderMobile from "./components/header/HeaderMobile.jsx";
import TopBar from "./components/header/TopBar.jsx";
import Footer from "./components/footer/Footer.jsx";

import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Configuracoes from "./pages/Configuracoes.jsx";
import Administracao from "./pages/Administracao.jsx";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <TopBar />

      {/* Overlay menu mobile */}
      <div
        className={isMobileMenuOpen ? "d-block" : "d-none"}
        onClick={closeMobileMenu}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
      ></div>

      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
        <Link to="/home" onClick={closeMobileMenu} style={linkStyle}>Home</Link>
        <Link to="/dashboard" onClick={closeMobileMenu} style={linkStyle}>Dashboard</Link>
        <Link to="/configuracoes" onClick={closeMobileMenu} style={linkStyle}>Configurações</Link>
        <Link to="/administracao" onClick={closeMobileMenu} style={linkStyle}>Administração</Link>
      </Sidebar>

      <div className="d-flex flex-column">
        <Header />
        <HeaderMobile onMenuToggle={toggleMobileMenu} isMenuOpen={isMobileMenuOpen} />

        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/administracao" element={<Administracao />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

const linkStyle = { display: "block", padding: "10px", color: "#000", textDecoration: "none" };

export default App;
