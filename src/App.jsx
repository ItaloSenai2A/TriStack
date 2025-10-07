"use client";

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Sidebar from "./components/header/Sidebar.jsx";
import Header from "./components/header/Header.jsx";
import HeaderMobile from "./components/header/HeaderMobile.jsx";
import TopBar from "./components/header/TopBar.jsx";
import Footer from "./components/footer/Footer.jsx";

import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // ✅ Dashboard real
import Home from "./pages/Home.jsx"; // ✅ Home real

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
              <Route path="/home" element={<Home />} /> {/* ✅ Home real */}
              <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Dashboard real */}
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
