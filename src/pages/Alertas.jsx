import React, { useState } from "react";

export default function Alertas() {
  const alerts = [
    {
      id: 1,
      title: "Notificação crítica",
      desc: "Ação imediata necessária",
      type: "critical",
      modalText:
        "Os sensores detectaram uma combinação de alta temperatura e baixa umidade no canavial, aumentando significativamente o risco de incêndio. A situação exige atenção imediata do produtor, pois há chance de propagação rápida de fogo. Recomendamos verificar a área afetada e acionar medidas preventivas para evitar perdas e danos ambientais.",
    },
    {
      id: 2,
      title: "Notificação moderada",
      desc: "Verificar em breve",
      type: "moderate",
      modalText:
        "Os sensores identificaram variação significativa na umidade e temperatura. Ainda não há risco imediato, mas recomenda-se monitorar a área e avaliar a necessidade de ajustes preventivos, como irrigação localizada ou verificação de equipamentos.",
    },
    {
      id: 3,
      title: "Notificação informativa",
      desc: "Somente para conhecimento",
      type: "info",
      modalText:
        "Foram registradas pequenas alterações nas condições do campo, dentro da faixa de normalidade. Não há risco atual, mas os dados são importantes para o acompanhamento e histórico da produção.",
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
      margin: 0,
      color: "#0f172a",
    },
    sidebar: {
      width: 220,
      background: "#dff3e6",
      padding: "28px 20px",
      boxSizing: "border-box",
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
      boxShadow: "0 2px 6px rgba(15,23,42,0.08)",
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
    header: {
      padding: "14px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      background: "#e9f6ef",
      color: "#0f6b3a",
      borderBottom: "1px solid rgba(15,111,58,0.06)",
      position: "relative",
    },
    headerCenter: {
      fontSize: 28,
      fontWeight: 900,
      color: "#0f6b3a",
      textTransform: "capitalize",
      letterSpacing: "0.2px",
      marginLeft: 60,
    },
    profile: {
      position: "absolute",
      right: 28,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: "#0f6b3a",
      fontWeight: 600,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "#dff3e6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#0f6b3a",
      fontWeight: 700,
    },
    contentWrap: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // centraliza verticalmente
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
    arrow: { marginLeft: 14, color: "#111827", opacity: 0.9 },

    footer: {
      marginTop: "auto",
      background: "#000",
      color: "#fff",
      padding: "14px 28px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: 13,
      gap: 6,
    },
    footerLinks: { display: "flex", gap: 12, color: "#f3f4f6" },

    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      background: "#fff",
      borderRadius: 24,
      padding: 24,
      width: "500px",
      maxWidth: "90%",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      position: "relative",
      textAlign: "center",
    },
    closeButton: {
      position: "absolute",
      top: 12,
      right: 12,
      background: "#E74C3C",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: 28,
      height: 28,
      cursor: "pointer",
      fontWeight: 700,
    },
  };

  const Icon = {
    critical: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2L2 20h20L12 2z" fill="#E74C3C" />
        <path d="M12 8v5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16h.01" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    moderate: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2L2 20h20L12 2z" fill="#F1C40F" />
        <path d="M12 8v5" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16h.01" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    info: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#3498DB" />
        <path d="M12 10h.01" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.2 12h1.6v3.2h-1.6z" fill="#fff" />
      </svg>
    ),
    chevron: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 6l6 6-6 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div style={S.app}>
      <aside style={S.sidebar}>
        <div style={S.logoWrap}>
          <div style={S.logoMark}>TS</div>
          <div style={S.logoText}>TriStack</div>
        </div>

        <nav style={S.nav} aria-label="menu">
          <div style={S.navItem}>Home</div>
          <div style={S.navItem}>Dashboard</div>
          <div style={{ ...S.navItem, fontWeight: 800 }}>Alertas</div>
          <div style={S.navItem}>Configurações</div>
          <div style={S.navItem}>Administração da Área</div>
          <div style={S.navItem}>Sair</div>
        </nav>
      </aside>

      <main style={S.main}>
        <header style={S.header}>
          <div style={S.headerCenter}>Alertas</div>
          <div style={S.profile}>
            <div style={S.avatar} aria-hidden>
              A
            </div>
            <div>Ana Almeida</div>
          </div>
        </header>

        <section style={S.contentWrap}>
          <div style={S.card}>
            <div style={S.list}>
              {alerts.map((a) => {
                const c = COLORS[a.type];
                return (
                  <div
                    key={a.id}
                    style={S.item(c.border)}
                    onClick={() => setSelectedAlert(a)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 10px 24px rgba(2,6,23,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(15,23,42,0.02)";
                    }}
                  >
                    <div style={S.itemLeft}>
                      <div style={S.iconWrap(c.border, c.iconBg)}>
                        {a.type === "critical" && Icon.critical}
                        {a.type === "moderate" && Icon.moderate}
                        {a.type === "info" && Icon.info}
                      </div>

                      <div style={S.itemTexts}>
                        <div style={S.itemTitle}>{a.title}</div>
                        <div style={S.itemDesc}>{a.desc}</div>
                      </div>
                    </div>

                    <div style={S.arrow}>{Icon.chevron}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {selectedAlert && (
          <div style={S.modalOverlay}>
            <div style={S.modalContent}>
              <button style={S.closeButton} onClick={() => setSelectedAlert(null)}>
                ×
              </button>
              <h2>{selectedAlert.title}</h2>
              <p style={{ marginTop: 16, lineHeight: "1.5em" }}>{selectedAlert.modalText}</p>
            </div>
          </div>
        )}

        <footer style={S.footer}>
          <div>© 2025 TriStack. Todos os direitos reservados.</div>
          <div style={S.footerLinks}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Sobre Nós
            </a>
            <span style={{ opacity: 0.5 }}>|</span>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Contato
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
