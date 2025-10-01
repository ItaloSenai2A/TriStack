import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const dadosAmbientais = [
    { label: "Temperatura", valor: "32°C" },
    { label: "Umidade do Solo", valor: "50%" },
    { label: "Qualidade do Ar", valor: "50%" },
    { label: "Luz", valor: "50%" },
    { label: "Água", valor: "50%" },
    { label: "Vento", valor: "50 km/h" },
  ];

  return (
    <div className="container-fluid p-4" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
      {/* Cabeçalho */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Visão Geral</h2>
      </div>

      {/* Cards de dados ambientais */}
      <div className="row mb-5">
        {dadosAmbientais.map((item, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2 mb-3">
            <div
              className="card text-center shadow-sm"
              style={{
                border: "1px solid #4CAF50",
                borderRadius: "12px",
                backgroundColor: "#f1f8e9",
              }}
            >
              <div className="card-body p-3">
                <h6 className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                  {item.label}
                </h6>
                <p className="mb-0" style={{ fontSize: "16px", fontWeight: "700" }}>
                  {item.valor}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa do território */}
      <h4 className="fw-bold mb-3">Mapa do território</h4>
      <div
        className="position-relative"
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "#e0f2f1",
          borderRadius: "12px",
          border: "1px solid #4CAF50",
        }}
      >
        {/* Marcadores simulados */}
        {[
          { top: "20%", left: "30%", color: "red", label: "Et BHa" },
          { top: "40%", left: "50%", color: "orange", label: "Et BHo" },
          { top: "60%", left: "70%", color: "green", label: "Et BHr" },
        ].map((marker, idx) => (
          <div
            key={idx}
            className="position-absolute d-flex flex-column align-items-center"
            style={{ top: marker.top, left: marker.left, transform: "translate(-50%, -50%)" }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: marker.color,
                border: "2px solid #fff",
              }}
            ></div>
            <small className="mt-1 fw-semibold">{marker.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
