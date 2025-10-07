import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Home = () => {
  // Dados ambientais fictícios
  const dadosAmbientais = [
    { label: "Temperatura", valor: "28°C" },
    { label: "Umidade do Solo", valor: "80%" },
    { label: "Qualidade do Ar", valor: "65%" },
    { label: "Luz", valor: "70%" },
    { label: "Água", valor: "85%" },
    { label: "Vento", valor: "10 km/h" },
  ];

  // Alertas fictícios na Amazônia
  const alertas = [
    { lat: -3.4653, lng: -62.2159, tipo: "Queimada", descricao: "Fogo detectado próximo ao rio" },
    { lat: -2.1631, lng: -55.1266, tipo: "Enchente", descricao: "Inundação em área ribeirinha" },
    { lat: -4.9440, lng: -60.0000, tipo: "Praga", descricao: "Infestação de pragas em floresta" },
  ];

  return (
    <div
      className="d-flex flex-column align-items-center p-4"
      style={{
        fontFamily: "'Josefin Sans', sans-serif",
        marginLeft: "290px", // espaço da sidebar
        overflow: "hidden",
      }}
    >
      {/* Cabeçalho */}
      <div className="d-flex justify-content-center align-items-center mb-4" style={{ width: "100%", maxWidth: "1200px" }}>
        <h2 className="fw-bold text-center">Visão Geral</h2>
      </div>

      {/* Cards de dados ambientais */}
      <div className="row mb-5 justify-content-center" style={{ width: "100%", maxWidth: "1200px" }}>
        {dadosAmbientais.map((item, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2 mb-3 d-flex justify-content-center">
            <div
              className="card text-center shadow-sm"
              style={{
                border: "1px solid #4CAF50",
                borderRadius: "12px",
                backgroundColor: "#f1f8e9",
                width: "100%",
              }}
            >
              <div className="card-body p-2">
                <h6 className="fw-bold mb-1" style={{ fontSize: "13px" }}>
                  {item.label}
                </h6>
                <p className="mb-0" style={{ fontSize: "14px", fontWeight: "700" }}>
                  {item.valor}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa da Floresta Amazônica */}
      <h4 className="fw-bold mb-3 text-center" style={{ width: "100%", maxWidth: "1200px" }}>
        Mapa do Território - Alertas Ambientais
      </h4>
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "400px",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "50px",
        }}
      >
        <MapContainer center={[-3.4653, -62.2159]} zoom={5} style={{ width: "100%", height: "100%" }}>
          {/* Fundo satélite */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, and the GIS User Community"
          />

          {/* Alertas na Amazônia */}
          {alertas.map((alerta, idx) => (
            <Circle
              key={idx}
              center={[alerta.lat, alerta.lng]}
              radius={20000} // raio de 20 km
              pathOptions={{
                color: alerta.tipo === "Queimada" ? "red" : alerta.tipo === "Enchente" ? "blue" : "orange",
                fillOpacity: 0.3,
              }}
            >
              <Popup>
                <strong>{alerta.tipo}</strong>
                <br />
                {alerta.descricao}
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
