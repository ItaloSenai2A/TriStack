import React, { useState } from "react";
import {
  FaFire,
  FaPhone,
  FaBell,
  FaMapMarkedAlt,
  FaFileAlt,
  FaCalendarCheck,
  FaCheck
} from "react-icons/fa";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

export default function Administracao({ isDarkMode = false }) {
  // --- Estados ---
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState("");
  const [modalConteudo, setModalConteudo] = useState({ titulo: "", descricao: "" });

  const [novaOcorrencia, setNovaOcorrencia] = useState("");
  const [intervencao, setIntervencao] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [mensagem, setMensagem] = useState([]); // serve como histórico de ocorrências também
  const [equipesAcionadas, setEquipesAcionadas] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [novoVoluntario, setNovoVoluntario] = useState("");
  const [mensagemVoluntarios, setMensagemVoluntarios] = useState("");

  // --- Cores / tema ---
  // Nota: o usuário pediu fundo verde escuro no dark e que os botões mantenham cores porém um pouco mais escuras.
  const darkBg = "#1b3a2f"; // cor que o usuário indicou
  const tema = {
    fundo: isDarkMode ? darkBg : "#f4f6f3",
    graficoBg: isDarkMode ? "#153026" : "#fdfdfd",
    text: isDarkMode ? "#ffffff" : "#000000",
    cardText: isDarkMode ? "#fff" : "#000",
    modalBg: isDarkMode ? "#153026" : "#ffffff",
    inputBg: isDarkMode ? "#224236" : "#ffffff",
    // cores originais dos cards (com versão um pouco mais escura no dark)
    cores: {
      emergencia: isDarkMode ? "#d46a6a" : "#f8d7da", // vermelho / bordô levemente mais forte
      comunicacao: isDarkMode ? "#8bcf9b" : "#d4edda", // verde
      prevencao: isDarkMode ? "#82c1db" : "#d1ecf1", // azul
      admin: isDarkMode ? "#ffd17f" : "#fff3cd" // amarelo
    },
    // botão modal padrão: em dark, deixamos um verde mais escuro; mas os botões dentro dos modais (ex: e74c3c ou e67e22)
    // são mantidos com suas cores originais (apenas adaptadas levemente se desejado)
    modalButtonBg: isDarkMode ? "#256d49" : "#3498db",
    dangerButtonBg: isDarkMode ? "#c0392b" : "#e74c3c"
  };

  // --- Funções ---
  const abrirModal = (tipo, titulo, descricao) => {
    setModalTipo(tipo);
    setModalConteudo({ titulo, descricao });
    setModalAberto(true);
    setEquipesAcionadas([]);
  };

  const fecharModal = () => setModalAberto(false);

  const adicionarOcorrencia = () => {
    if (novaOcorrencia.trim() === "") {
      alert("Digite os detalhes da ocorrência antes de registrar.");
      return;
    }
    alert(`Nova ocorrência registrada: ${novaOcorrencia}`);
    setMensagem(prev => [...prev, novaOcorrencia]);
    setNovaOcorrencia("");
    fecharModal();
  };

  const agendarIntervencao = () => {
    if (intervencao.trim() === "") {
      alert("Digite os detalhes da intervenção antes de agendar.");
      return;
    }
    alert(`Intervenção agendada: ${intervencao}`);
    setIntervencao("");
    fecharModal();
  };

  const enviarMensagem = () => {
    if (mensagem.trim() === "") {
      alert("Digite a mensagem antes de enviar.");
      return;
    }
    alert(`Mensagem enviada: ${mensagem}`);
    setMensagem("");
    fecharModal();
  };

  const alternarChecklist = (item) => {
    setChecklist(prev => (prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]));
  };

  const acionarEquipe = (nome) => {
    if (!equipesAcionadas.includes(nome)) {
      setEquipesAcionadas(prev => [...prev, nome]);
      alert(`${nome} acionada!`);
    } else {
      alert(`${nome} já foi acionada!`);
    }
  };

  const adicionarVoluntario = () => {
    if (novoVoluntario.trim() !== "") {
      setVoluntarios(prev => [...prev, novoVoluntario.trim()]);
      setNovoVoluntario("");
    }
  };

  const removerVoluntario = (nome) => {
    setVoluntarios(prev => prev.filter(v => v !== nome));
  };

  const enviarMensagemVoluntarios = () => {
    if (mensagemVoluntarios.trim() === "") {
      alert("Digite a mensagem antes de enviar.");
      return;
    }
    alert(`Mensagem enviada para ${voluntarios.length} voluntários:\n"${mensagemVoluntarios}"`);
    setMensagemVoluntarios("");
  };

  // --- Dados do gráfico ---
  const dadosGrafico = [
    { desafio: "2022", "2021": 45, "2022": 60 },
    { desafio: "2023", "2021": 35, "2022": 80 },
    { desafio: "2024", "2021": 25, "2022": 50 },
    { desafio: "2025", "2021": 55, "2022": 40 },
  ];

  // --- Render ---
  return (
    <div style={{ ...containerStyle, backgroundColor: tema.fundo, color: tema.text }}>
      {/* Gráfico */}
      <div style={{ ...graficoContainerStyle, backgroundColor: tema.graficoBg }}>
        <h3 style={{ fontWeight: 600, marginBottom: 10, color: tema.text }}>Desafios enfrentados na área</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosGrafico} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.08} />
            <XAxis type="number" hide />
            <YAxis dataKey="desafio" type="category" tick={{ fill: tema.text }} />
            <Tooltip />
            <Legend verticalAlign="top" align="center" iconType="circle" wrapperStyle={{ paddingBottom: 10, color: tema.text }} />
            <Bar dataKey="2021" fill="#b8792b" barSize={12} radius={[4,4,4,4]} name="Queimadas" />
            <Bar dataKey="2022" fill="#3182ff" barSize={12} radius={[4,4,4,4]} name="Enchentes" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Intervenções e Ações */}
      <div style={acoesContainerStyle}>
        <h3 style={{ color: tema.text }}>Intervenções para aplicar</h3>

        {/* Ações emergenciais */}
        <div style={acaoGrupoStyle}>
          <h4 style={{ color: tema.text }}>Ações emergenciais:</h4>
          <div style={cardStyle(tema.cores.emergencia)} onClick={() => abrirModal("defesaCivil", "Acionar Defesa Civil", "Selecione equipes próximas para ação")}>
            <FaFire /> Acionar Defesa Civil
          </div>
          <div style={cardStyle(tema.cores.emergencia)} onClick={() => abrirModal("bombeiros", "Chamar Bombeiros", "Selecione equipes próximas para ação")}>
            <FaBell /> Chamar Bombeiros
          </div>
          <div style={cardStyle(tema.cores.emergencia)} onClick={() => abrirModal("autoridades", "Contato rápido com autoridades", "Enviar alertas e informações às autoridades")}>
            <FaPhone /> Contato rápido com autoridades
          </div>
        </div>

        {/* Comunicação e apoio */}
        <div style={acaoGrupoStyle}>
          <h4 style={{ color: tema.text }}>Comunicação e apoio:</h4>
          <div style={cardStyle(tema.cores.comunicacao)} onClick={() => abrirModal("comunidade", "Notificar comunidade", "Enviar alertas e comunicados à população")}>
            <FaBell /> Notificar comunidade
          </div>
          <div style={cardStyle(tema.cores.comunicacao)} onClick={() => abrirModal("voluntarios", "Grupo de voluntários locais", "Organizar voluntários para auxiliar nas operações")}>
            <FaCheck /> Grupo de voluntários locais
          </div>
          <div style={cardStyle(tema.cores.comunicacao)} onClick={() => abrirModal("seguranca", "Orientações de segurança", "Passo a passo para casos de acidentes")}>
            <FaCheck /> Orientações de segurança
          </div>
        </div>

        {/* Monitoramento e prevenção */}
        <div style={acaoGrupoStyle}>
          <h4 style={{ color: tema.text }}>Monitoramento e prevenção:</h4>
          <div style={cardStyle(tema.cores.prevencao)} onClick={() => abrirModal("sensores", "Verificar sensores ambientais", "Checar dados dos sensores ambientais")}>
            <FaBell /> Verificar sensores ambientais
          </div>
          <div style={cardStyle(tema.cores.prevencao)} onClick={() => abrirModal("historico", "Histórico de ocorrências", "Visualizar registros anteriores")}>
            <FaFileAlt /> Histórico de ocorrências
          </div>
          <div style={cardStyle(tema.cores.prevencao)} onClick={() => abrirModal("mapa", "Mapa de áreas críticas", "Exibir mapa com áreas de risco")}>
            <FaMapMarkedAlt /> Mapa de áreas críticas
          </div>
        </div>

        {/* Administração e planejamento */}
        <div style={acaoGrupoStyle}>
          <h4 style={{ color: tema.text }}>Administração e planejamento:</h4>
          <div style={cardStyle(tema.cores.admin)} onClick={() => abrirModal("ocorrencia", "Registrar nova ocorrência", "Digite os detalhes da nova ocorrência:")}>
            <FaFileAlt /> Registrar nova ocorrência
          </div>
          <div style={cardStyle(tema.cores.admin)} onClick={() => abrirModal("intervencao", "Agendar intervenção preventiva", "Digite os detalhes da intervenção a ser agendada:")}>
            <FaCalendarCheck /> Agendar intervenção preventiva
          </div>
          <div style={cardStyle(tema.cores.admin)} onClick={() => abrirModal("checklist", "Checklist de ações aplicadas", "Marque as ações que já foram realizadas:")}>
            <FaCheck /> Checklist de ações aplicadas
          </div>
        </div>
      </div>

      {/* Modais (com todas as funcionalidades) */}
      {modalAberto && (
        <div style={modalOverlayStyle} onClick={fecharModal}>
          <div style={{ ...modalContentStyle, backgroundColor: tema.modalBg, color: tema.text }} onClick={(e) => e.stopPropagation()}>
            <h3>{modalConteudo.titulo}</h3>
            <p>{modalConteudo.descricao}</p>

            {/* Ocorrência */}
            {modalTipo === "ocorrencia" && (
              <>
                <input
                  type="text"
                  placeholder="Detalhes da ocorrência"
                  value={novaOcorrencia}
                  onChange={(e) => setNovaOcorrencia(e.target.value)}
                  style={{ ...inputStyle, backgroundColor: tema.inputBg, color: tema.text }}
                />
                <button style={{ ...modalButtonStyle, backgroundColor: tema.modalButtonBg }} onClick={adicionarOcorrencia}>Registrar</button>
              </>
            )}

            {/* Intervenção */}
            {modalTipo === "intervencao" && (
              <>
                <input
                  type="text"
                  placeholder="Detalhes da intervenção"
                  value={intervencao}
                  onChange={(e) => setIntervencao(e.target.value)}
                  style={{ ...inputStyle, backgroundColor: tema.inputBg, color: tema.text }}
                />
                <button style={{ ...modalButtonStyle, backgroundColor: tema.modalButtonBg }} onClick={agendarIntervencao}>Agendar</button>
              </>
            )}

            {/* Checklist */}
            {modalTipo === "checklist" && (
              <>
                {["Acionar Defesa Civil", "Chamar Bombeiros", "Notificar comunidade", "Voluntários mobilizados"].map(item => (
                  <label key={item} style={{ ...checkItemStyle, color: tema.text }}>
                    <input type="checkbox" checked={checklist.includes(item)} onChange={() => alternarChecklist(item)} /> {item}
                  </label>
                ))}
                <button style={{ ...modalButtonStyle, backgroundColor: tema.modalButtonBg }} onClick={fecharModal}>Fechar</button>
              </>
            )}

            {/* Comunidade */}
            {modalTipo === "comunidade" && (
              <>
                <textarea
                  placeholder="Escreva a mensagem para a comunidade"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  style={{ ...inputStyle, height: "100px", backgroundColor: tema.inputBg, color: tema.text }}
                />
                <button style={{ ...modalButtonStyle, backgroundColor: tema.modalButtonBg }} onClick={enviarMensagem}>Enviar mensagem</button>
              </>
            )}

            {/* Defesa Civil */}
            {modalTipo === "defesaCivil" && (
              <div style={{ textAlign: "left" }}>
                <h4>Defesas Civis Próximas</h4>
                {[
                  { nome: "Brigada de Incêndio Central", distancia: "1,2 km" },
                  { nome: "Equipe de Resgate Norte", distancia: "2,5 km" },
                  { nome: "Equipe de Suporte Leste", distancia: "3,0 km" },
                  { nome: "Equipe de Monitoramento Sul", distancia: "4,1 km" }
                ].map((equipe, index) => (
                  <button
                    key={index}
                    style={{ ...modalButtonStyle, display: "block", width: "100%", marginTop: "10px", backgroundColor: "#e67e22" }}
                    onClick={() => acionarEquipe(equipe.nome)}
                  >
                    {equipe.nome} - {equipe.distancia}
                  </button>
                ))}
                <button style={{ ...modalButtonStyle, backgroundColor: tema.dangerButtonBg, marginTop: 15 }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {/* Bombeiros */}
            {modalTipo === "bombeiros" && (
              <div style={{ textAlign: "left" }}>
                <h4>Equipes de Bombeiros Próximas</h4>
                {[
                  { nome: "Quartel Central", distancia: "1,0 km" },
                  { nome: "Equipe de Resgate Leste", distancia: "2,8 km" },
                  { nome: "Equipe de Salvamento Sul", distancia: "3,5 km" },
                  { nome: "Equipe de Atendimento Norte", distancia: "4,0 km" }
                ].map((equipe, index) => (
                  <button
                    key={index}
                    style={{ ...modalButtonStyle, display: "block", width: "100%", marginTop: "10px", backgroundColor: "#c0392b" }}
                    onClick={() => acionarEquipe(equipe.nome)}
                  >
                    {equipe.nome} - {equipe.distancia}
                  </button>
                ))}
                <button style={{ ...modalButtonStyle, backgroundColor: tema.dangerButtonBg, marginTop: 15 }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {/* Autoridades */}
            {modalTipo === "autoridades" && (
              <div style={{ textAlign: "left" }}>
                <h4>Contato rápido com autoridades</h4>
                {["Prefeito", "Secretário de Segurança", "Polícia Militar", "Defesa Civil"].map((autoridade, index) => (
                  <div key={index} style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 600 }}>{autoridade}</span>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 5 }}>
                      <button style={{ ...modalButtonStyle, backgroundColor: "#3498db" }} onClick={() => alert(`Chamando ${autoridade}...`)}>Chamada</button>
                      <button style={{ ...modalButtonStyle, backgroundColor: "#2ecc71" }} onClick={() => alert(`SMS enviado para ${autoridade}`)}>SMS</button>
                      <button style={{ ...modalButtonStyle, backgroundColor: "#f1c40f" }} onClick={() => {
                        const texto = prompt(`Digite a mensagem para ${autoridade}:`);
                        if (texto) alert(`Mensagem enviada para ${autoridade}: "${texto}"`);
                      }}>Mensagem</button>
                    </div>
                  </div>
                ))}
                <button style={{ ...modalButtonStyle, backgroundColor: tema.dangerButtonBg, marginTop: 15 }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {/* Voluntários */}
            {modalTipo === "voluntarios" && (
              <div style={{ textAlign: "left" }}>
                <h4>Grupo de Voluntários Locais</h4>

                {voluntarios.length > 0 ? (
                  <ul style={ulStyle}>
                    {voluntarios.map((v, index) => (
                      <li key={index} style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span>{v}</span>
                        <button style={{ ...modalButtonStyle, backgroundColor: "#e74c3c", padding: "4px 8px", fontSize: 12 }} onClick={() => removerVoluntario(v)}>Remover</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhum voluntário cadastrado.</p>
                )}

                <input
                  type="text"
                  placeholder="Nome do voluntário"
                  value={novoVoluntario}
                  onChange={(e) => setNovoVoluntario(e.target.value)}
                  style={{ ...inputStyle, backgroundColor: tema.inputBg, color: tema.text }}
                />
                <button style={{ ...modalButtonStyle, backgroundColor: tema.modalButtonBg }} onClick={adicionarVoluntario}>Adicionar voluntário</button>

                {voluntarios.length > 0 && (
                  <>
                    <textarea
                      placeholder="Mensagem para todos os voluntários"
                      value={mensagemVoluntarios}
                      onChange={(e) => setMensagemVoluntarios(e.target.value)}
                      style={{ ...inputStyle, height: 80, marginTop: 10, backgroundColor: tema.inputBg, color: tema.text }}
                    />
                    <button style={{ ...modalButtonStyle, backgroundColor: tema.modalButtonBg }} onClick={enviarMensagemVoluntarios}>Enviar mensagem</button>
                  </>
                )}

                <button style={{ ...modalButtonStyle, backgroundColor: tema.dangerButtonBg, marginTop: 15 }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {/* Segurança */}
            {modalTipo === "seguranca" && (
              <div style={{ textAlign: "left" }}>
                <h4>Passo a Passo</h4>
                <label style={{ marginBottom: 8, fontWeight: 600 }}>Selecione o tipo de acidente:</label>
                <select
                  style={{ width: "100%", padding: 8, borderRadius: 5, border: "1px solid #ccc", marginBottom: 10 }}
                  onChange={(e) => setChecklist([e.target.value])}
                >
                  <option value="">-- Selecione --</option>
                  <option value="queimadas">Queimadas</option>
                  <option value="enchentes">Enchentes</option>
                  <option value="acidentesGerais">Acidentes Gerais</option>
                </select>

                {checklist.includes("queimadas") && (
                  <ol style={{ marginBottom: 10 }}>
                    <li>Evacuar a área imediatamente.</li>
                    <li>Acionar brigadas de incêndio locais.</li>
                    <li>Orientar voluntários e população sobre abrigos seguros.</li>
                    <li>Monitorar a propagação do fogo através de sensores.</li>
                  </ol>
                )}

                {checklist.includes("enchentes") && (
                  <ol style={{ marginBottom: 10 }}>
                    <li>Evacuar áreas de risco e pontos de alagamento.</li>
                    <li>Acionar equipes de resgate e Defesa Civil.</li>
                    <li>Garantir comunicação com a população através de alertas.</li>
                    <li>Monitorar níveis de água com sensores.</li>
                  </ol>
                )}

                {checklist.includes("acidentesGerais") && (
                  <ol style={{ marginBottom: 10 }}>
                    <li>Isolar a área para evitar mais acidentes.</li>
                    <li>Prestar primeiros socorros às vítimas.</li>
                    <li>Acionar ambulâncias e equipes médicas.</li>
                    <li>Registrar ocorrência e comunicar autoridades.</li>
                  </ol>
                )}

                <button style={{ ...modalButtonStyle, backgroundColor: tema.dangerButtonBg }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {/* Sensores */}
            {modalTipo === "sensores" && (
              <div style={{ textAlign: "left" }}>
                <p><strong>Temperatura:</strong> 28°C</p>
                <p><strong>Umidade:</strong> 65%</p>
                <p><strong>Qualidade do Ar:</strong> Boa</p>
                <button style={{ ...modalButtonStyle, backgroundColor: tema.dangerButtonBg, marginTop: 10 }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {/* Histórico */}
            {modalTipo === "historico" && (
              <div style={{ textAlign: "left" }}>
                <h4>Histórico de ocorrências</h4>
                {mensagem.length === 0 ? (
                  <p>Nenhuma ocorrência registrada.</p>
                ) : (
                  <ul style={ulStyle}>
                    {mensagem.map((ocorrencia, index) => (
                      <li key={index}>{ocorrencia}</li>
                    ))}
                  </ul>
                )}
                <button style={{ ...modalButtonStyle, backgroundColor: tema.dangerButtonBg }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {/* Mapa com círculos de alerta */}
            {modalTipo === "mapa" && (
              <div style={{ textAlign: "left" }}>
                <h4>Mapa de áreas críticas</h4>
                <div style={{ width: "100%", height: 400, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
                  <MapContainer center={[-3.4653, -62.2159]} zoom={5} style={{ width: "100%", height: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    {[
                      { lat: -3.4653, lng: -62.2159, tipo: "Queimada", descricao: "Fogo detectado próximo ao rio" },
                      { lat: -2.1631, lng: -55.1266, tipo: "Enchente", descricao: "Inundação em área ribeirinha" },
                      { lat: -4.9440, lng: -60.0000, tipo: "Praga", descricao: "Infestação de pragas em floresta" }
                    ].map((alerta, idx) => (
                      <Circle
                        key={idx}
                        center={[alerta.lat, alerta.lng]}
                        radius={20000}
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
                <p>Use este mapa para localizar áreas de risco e planejar intervenções.</p>
                <button style={{ ...modalButtonStyle, backgroundColor: tema.dangerButtonBg }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {/* Botão fechar genérico (caso queira) */}
            {/* <button style={{ ...modalButtonStyle, marginTop: 12, backgroundColor: tema.dangerButtonBg }} onClick={fecharModal}>Fechar</button> */}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== estilos em variáveis JS ===================== */
const sidebarWidth = 250;

const containerStyle = {
  display: "flex",
  gap: "30px",
  padding: "30px",
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  marginLeft: sidebarWidth,
  maxWidth: `calc(100% - ${sidebarWidth}px)`
};

const graficoContainerStyle = {
  flex: 1,
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const acoesContainerStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const acaoGrupoStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const cardStyle = (bg) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  backgroundColor: bg,
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  fontSize: "14px",
  color: "#000"
});

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modalContentStyle = {
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "700px",
  width: "95%",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
};

const modalButtonStyle = {
  marginTop: "12px",
  padding: "8px 16px",
  borderRadius: "5px",
  border: "none",
  color: "#fff",
  cursor: "pointer"
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const checkItemStyle = {
  display: "block",
  margin: "8px 0",
  fontSize: "14px"
};

const ulStyle = {
  listStyleType: "disc",
  paddingLeft: "20px",
  marginBottom: "10px"
};
