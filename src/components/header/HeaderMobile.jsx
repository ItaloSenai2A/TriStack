"use client"

function HeaderMobile({ onMenuToggle, isMenuOpen }) {
  return (
    <header
      className="d-md-none p-3"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "2px solid #4caf50",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
          style={{
            border: "2px solid #4caf50",
            color: "#4caf50",
            backgroundColor: "transparent",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "18px",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#4caf50"
            e.target.style.color = "white"
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent"
            e.target.style.color = "#4caf50"
          }}
        >
          <i className={`bi ${isMenuOpen ? "bi-x" : "bi-list"}`}></i>
        </button>
        <h1
          className="h5 mb-0"
          style={{
            color: "#2e7d32",
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
          TriStack
        </h1>
        <div style={{ width: "40px" }}></div> {/* Spacer for centering */}
      </div>
    </header>
  )
}

export default HeaderMobile
