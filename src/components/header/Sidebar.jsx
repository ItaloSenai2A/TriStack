"use client";
import LogoTriStack from "../../assets/LogoTriStack.png";

const menuItems = [
  { icon: "bi-house", label: "Home", href: "/" },
  { icon: "bi-bar-chart", label: "Dashboard", href: "/dashboard" },
  { icon: "bi-bell", label: "Alertas", href: "/alertas" },
  { icon: "bi-gear", label: "Configurações", href: "/configuracoes" },
  { icon: "bi-shield-check", label: "Administração da Área", href: "/admin" },
  { icon: "bi-box-arrow-right", label: "Sair", href: "/logout" },
];

function Sidebar({ isOpen }) {
  return (
    <div
      className={`position-fixed top-0 ${isOpen ? "d-block" : "d-none d-lg-block"}`}
      style={{
        left: 0,
        top: 0,
        bottom: 0,
        width: "280px",
        height: "100vh",
        backgroundColor: "#D2DCC5",
        zIndex: 1000,
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        fontFamily: "'Josefin Sans', sans-serif",
        overflowY: "auto",
        margin: 0,
        padding: 0,
        border: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative", // Necessário para posicionar a borda lateral
      }}
    >
      {/* Logo centralizada */}
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{
          marginTop: "20px",
        }}
      >
        <img
          src={LogoTriStack}
          alt="Logo TriStack"
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Menu Items abaixo da logo */}
      <nav className="px-3 pt-4" style={{ width: "100%" }}>
        <ul className="nav flex-column" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="nav-item"
              style={{
                marginBottom: "20px", // Espaçamento entre os itens
              }}
            >
              <a
                href={item.href}
                className="nav-link d-flex align-items-center px-3 py-2 rounded"
                style={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: "700",
                  textDecoration: "none",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  gap: "12px",
                  fontFamily: "'Josefin Sans', sans-serif",
                  paddingLeft: "20px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#a5d6a7";
                  e.currentTarget.style.color = "#1b5e20";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#000000";
                }}
              >
                <i className={`${item.icon}`} style={{ fontSize: "18px" }}></i>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Borda fina no lado direito */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "2px", // Espessura da borda
          backgroundColor: "#246816", // Cor da borda
        }}
      ></div>
    </div>
  );
}

export default Sidebar;