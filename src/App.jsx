import React, { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
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
import Configuracoes from "./pages/Configuracoes.jsx";
import Administracao from "./pages/Administracao.jsx";

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
    <div>
      {/* Barra superior */}
      <TopBar />

      {/* Overlay para fechar menu mobile */}
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

      {/* Menu lateral */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
        <Link to="/home" onClick={closeMobileMenu} style={linkStyle}>Home</Link>
        <Link to="/dashboard" onClick={closeMobileMenu} style={linkStyle}>Dashboard</Link>
        <Link to="/configuracoes" onClick={closeMobileMenu} style={linkStyle}>Configurações</Link>
        <Link to="/administracao" onClick={closeMobileMenu} style={linkStyle}>Administração</Link>
      </Sidebar>

      <div className="d-flex flex-column">
        <Header />
        <HeaderMobile onMenuToggle={toggleMobileMenu} isMenuOpen={isMobileMenuOpen} />

        {/* Conteúdo principal */}
        <main style={{ padding: "20px" }}>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            {/* Rotas privadas */}
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/alertas" element={<PrivateRoute><Alertas /></PrivateRoute>} />
            <Route path="/sair" element={<PrivateRoute><Sair /></PrivateRoute>} />
            <Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
            <Route path="/administracao" element={<PrivateRoute><Administracao /></PrivateRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

const linkStyle = {
  display: "block",
  padding: "10px",
  color: "#000",
  textDecoration: "none",
};

export default App;
