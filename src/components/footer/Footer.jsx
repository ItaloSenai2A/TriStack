"use client"

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1b5e20",
        color: "white",
        padding: "20px 0",
        marginTop: "auto",
      }}
    >
      <div className="container-fluid">
        <div className="text-center">
          <p
            className="mb-2"
            style={{
              fontSize: "14px",
              fontWeight: "500",
              margin: "0 0 8px 0",
            }}
          >
            © 2025 TriStack. Todos os direitos reservados.
          </p>
          <p
            className="mb-0"
            style={{
              fontSize: "13px",
              margin: 0,
            }}
          >
            <a
              href="/sobre"
              className="text-decoration-none me-2"
              style={{
                color: "#a5d6a7",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.color = "#c8e6c9")}
              onMouseOut={(e) => (e.target.style.color = "#a5d6a7")}
            >
              Sobre Nós
            </a>
            |
            <a
              href="/contato"
              className="text-decoration-none ms-2"
              style={{
                color: "#a5d6a7",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.color = "#c8e6c9")}
              onMouseOut={(e) => (e.target.style.color = "#a5d6a7")}
            >
              Contato
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
