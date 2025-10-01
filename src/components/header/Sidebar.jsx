"use client"

const menuItems = [
  { icon: "bi-house", label: "Home", href: "/" },
  { icon: "bi-bar-chart", label: "Dashboard", href: "/dashboard" },
  { icon: "bi-bell", label: "Alertas", href: "/alertas" },
  { icon: "bi-gear", label: "Configurações", href: "/configuracoes" },
  { icon: "bi-shield-check", label: "Administração da Área", href: "/admin" },
  { icon: "bi-box-arrow-right", label: "Sair", href: "/logout" },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`position-fixed top-0 start-0 h-100 ${isOpen ? "d-block" : "d-none d-lg-block"}`}
      style={{
        width: "280px",
        backgroundColor: "#c8e6c9",
        zIndex: 1000,
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div className="p-4" style={{ borderBottom: "1px solid #a5d6a7" }}>
        <div className="d-flex align-items-center">
          <div className="me-3">
            <div
              className="d-flex align-items-center justify-content-center rounded"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#2e7d32",
                color: "white",
                fontSize: "24px",
              }}
            >
              🌲
            </div>
          </div>
          <div>
            <h2 className="mb-0 fw-bold" style={{ color: "#1b5e20", fontSize: "24px" }}>
              TriStack
            </h2>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-3">
        <ul className="nav flex-column" style={{ listStyle: "none", padding: 0 }}>
          {menuItems.map((item) => (
            <li key={item.label} className="nav-item mb-2">
              <a
                href={item.href}
                className="nav-link d-flex align-items-center text-decoration-none"
                style={{
                  color: "#2e7d32",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#a5d6a7"
                  e.target.style.color = "#1b5e20"
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent"
                  e.target.style.color = "#2e7d32"
                }}
              >
                <i className={`${item.icon} me-3`} style={{ fontSize: "18px" }}></i>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
