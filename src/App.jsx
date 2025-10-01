"use client";

import { useState } from "react";
import Sidebar from "./components/header/Sidebar.jsx";
import Header from "./components/header/Header.jsx";
import HeaderMobile from "./components/header/HeaderMobile.jsx";
import TopBar from "./components/header/TopBar.jsx";
import LoginCadastro from "./pages/LoginCadastro.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <TopBar />

      <div
        className={`position-fixed top-0 start-0 w-100 h-100 ${
          isMobileMenuOpen ? "d-block" : "d-none"
        }`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 999,
          transition: "all 0.3s ease",
        }}
        onClick={closeMobileMenu}
      ></div>

      {/* Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      <div
        className="d-flex flex-column"
        style={{
          marginLeft: "0",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease",
        }}
      >
        <style>
          {`
            @media (min-width: 992px) {
              .main-content {
                margin-left: 280px;
              }
            }
          `}
        </style>
        <div className="main-content">
          <Header />
          <HeaderMobile
            onMenuToggle={toggleMobileMenu}
            isMenuOpen={isMobileMenuOpen}
          />

          <main className="flex-grow-1">
            <LoginCadastro />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
