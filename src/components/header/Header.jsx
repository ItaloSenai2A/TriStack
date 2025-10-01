function Header() {
  return (
    <header
      className="d-none d-md-block p-3"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "2px solid #4caf50",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <h1
            className="h4 mb-0"
            style={{
              color: "#2e7d32",
              fontWeight: "600",
              fontSize: "24px",
            }}
          >
            Bem-vindo ao TriStack
          </h1>
          <div className="d-flex align-items-center">
            <span
              style={{
                color: "#4caf50",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Sistema de Gestão
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
