function TopBar() {
  return (
    <div
      className="py-1"
      style={{
        backgroundColor: "#2e7d32",
        color: "white",
      }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <small
            style={{
              fontSize: "12px",
              fontWeight: "500",
              letterSpacing: "0.5px",
            }}
          >
            Sistema TriStack - Versão 2.0
          </small>
        </div>
      </div>
    </div>
  )
}

export default TopBar
