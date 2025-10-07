import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Alertas() {
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Notificação crítica",
      desc: "Ação imediata necessária",
      alertTitle: "Alerta de incêndio",
      description:
        "Os sensores detectaram uma combinação de alta temperatura e baixa umidade no canavial, aumentando significativamente o risco de incêndio. A situação exige atenção imediata do produtor, pois há chance de propagação rápida de fogo. Recomendamos verificar a área afetada e acionar medidas preventivas para evitar perdas e danos ambientais.",
      buttonText: "ENTENDIDO",
    },
    {
      id: 2,
      type: "moderate",
      title: "Notificação moderada",
      desc: "Verificar em breve",
      alertTitle: "Atenção: Nível de umidade baixo",
      description:
        "Os sensores indicaram uma leve diminuição na umidade. Embora não seja uma emergência, é importante monitorar e considerar medidas preventivas para evitar estresse das plantas.",
      buttonText: "OK",
    },
    {
      id: 3,
      type: "info",
      title: "Notificação informativa",
      desc: "Somente para conhecimento",
      alertTitle: "Condições normais",
      description:
        "Os sensores indicam que todos os parâmetros ambientais estão dentro da normalidade. Nenhuma ação imediata é necessária.",
      buttonText: "Certo",
    },
  ];

  const COLORS = {
    critical: { border: "#E74C3C", iconBg: "#FCECEC" },
    moderate: { border: "#F1C40F", iconBg: "#FFF8E6" },
    info: { border: "#3498DB", iconBg: "#EAF4FF" },
  };

  const S = {
    app: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
      background: "#f6f8fb",
      color: "#0f172a",
    },
    sidebar: {
      width: 220,
      background: "#dff3e6",
      padding: "28px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 18,
    },
    logoWrap: { display: "flex", alignItems: "center", gap: 12 },
    logoMark: {
      width: 44,
      height: 44,
      borderRadius: 10,
      background: "linear-gradient(180deg,#34a853 0%,#0f8a3f 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: 800,
    },
    logoText: { fontSize: 18, fontWeight: 800, color: "#0f6b3a" },
    nav: { marginTop: 12, display: "flex", flexDirection: "column", gap: 10 },
    navItem: {
      color: "#072014",
      fontSize: 15,
      cursor: "pointer",
      padding: "6px 4px",
      userSelect: "none",
    },
    main: { flex: 1, display: "flex", flexDirection: "column" },
    contentWrap: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 28,
    },
    card: {
      width: 720,
      background: "#fff",
      borderRadius: 32,
      padding: 18,
      boxShadow: "0 8px 24px rgba(17,24,39,0.06)",
      border: "1px solid rgba(15,111,58,0.08)",
    },
    list: { display: "flex", flexDirection: "column", gap: 12 },
    item: (borderColor) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 18px",
      borderRadius: 24,
      background: "#fff",
      border: `1px solid ${borderColor}22`,
      cursor: "pointer",
      transition: "transform 120ms ease, box-shadow 120ms ease",
    }),
    itemLeft: { display: "flex", alignItems: "center", gap: 16 },
    iconWrap: (border, bg) => ({
      width: 72,
      height: 72,
      borderRadius: 16,
      background: bg,
      border: `3px solid ${border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
      flexShrink: 0,
    }),
    itemTexts: { display: "flex", flexDirection: "column" },
    itemTitle: { fontSize: 16, fontWeight: 700, color: "#0f172a" },
    itemDesc: { fontSize: 13, color: "#6b7280", marginTop: 6 },
  };

  const IconSVG = {
    critical: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 20h20L12 2z" fill="#E74C3C" />
        <path d="M12 8v5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 16h.01" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    moderate: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 20h20L12 2z" fill="#F1C40F" />
        <path d="M12 8v5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 16h.01" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    info: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#3498DB" />
        <path d="M12 10h.01" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M11.2 12h1.6v3.2h-1.6z" fill="#fff" />
      </svg>
    ),
  };

  const [selectedAlert, setSelectedAlert] = useState(null);

  const AlertModal = ({ show, onClose, type, alertTitle, title, description, buttonText }) => {
    if (!show) return null;

    const colors = {
      critical: { main: "#E74C3C", border: "#0aad02" },
      moderate: { main: "#F1C40F", border: "#0aad02" },
      info: { main: "#3498DB", border: "#0aad02" },
    };

    const color = colors[type];

    return (
      <div
        className="modal d-block"
        tabIndex="-1"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: "1050",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          className="card mx-auto shadow-lg"
          style={{
            width: "430px",
            borderRadius: "12px",
            padding: "20px",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm d-flex align-items-center justify-content-center"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: color.main,
              color: "white",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              border: "none",
              fontWeight: "bold",
            }}
          >
            ✕
          </button>

          <div className="text-center mb-3">{IconSVG[type]}</div>

          <h4 className="text-center fw-bold mb-3" style={{ color: "#111827" }}>
            {title}
          </h4>

          <div
            className="text-center text-white fw-bold rounded mb-3 py-2"
            style={{ backgroundColor: color.main, fontSize: "15px" }}
          >
            {alertTitle}
          </div>

          <div
            className="border rounded p-3 mb-4"
            style={{ borderColor: color.border, color: "#111827", fontSize: "15px" }}
          >
            {description}
          </div>

          <button
            className="btn w-100 fw-bold text-white"
            style={{
              backgroundColor: color.border,
              border: "none",
              fontSize: "16px",
              borderRadius: "8px",
              padding: "10px",
            }}
            onClick={onClose}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={S.app}>
      <aside style={S.sidebar}>
        <div style={S.logoWrap}>
          <div style={S.logoMark}>TS</div>
          <div style={S.logoText}>TriStack</div>
        </div>

        <nav style={S.nav}>
          <div style={S.navItem}>Home</div>
          <div style={S.navItem}>Dashboard</div>
          <div style={{ ...S.navItem, fontWeight: 800 }}>Alertas</div>
          <div style={S.navItem}>Configurações</div>
          <div style={S.navItem}>Administração da Área</div>
          <div style={S.navItem}>Sair</div>
        </nav>
      </aside>

      <main style={S.main}>
        <section style={S.contentWrap}>
          <div style={S.card}>
            <div style={S.list}>
              {alerts.map((a) => {
                const c = COLORS[a.type];
                return (
                  <div key={a.id} style={S.item(c.border)} onClick={() => setSelectedAlert(a)}>
                    <div style={S.itemLeft}>
                      <div style={S.iconWrap(c.border, c.iconBg)}>{IconSVG[a.type]}</div>
                      <div style={S.itemTexts}>
                        <div style={S.itemTitle}>{a.title}</div>
                        <div style={S.itemDesc}>{a.desc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {selectedAlert && (
          <AlertModal
            show={true}
            onClose={() => setSelectedAlert(null)}
            type={selectedAlert.type}
            title={selectedAlert.title}
            alertTitle={selectedAlert.alertTitle}
            description={selectedAlert.description}
            buttonText={selectedAlert.buttonText}
          />
        )}
      </main>
    </div>
  );
}
