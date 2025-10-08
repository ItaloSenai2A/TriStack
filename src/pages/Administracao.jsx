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

export default function Administracao() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState("");
  const [modalConteudo, setModalConteudo] = useState({
    titulo: "",
    descricao: ""
  });

  const [novaOcorrencia, setNovaOcorrencia] = useState("");
  const [intervencao, setIntervencao] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [mensagem, setMensagem] = useState([]);
  const [equipesAcionadas, setEquipesAcionadas] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [novoVoluntario, setNovoVoluntario] = useState("");
  const [mensagemVoluntarios, setMensagemVoluntarios] = useState("");

  const abrirModal = (tipo, titulo, descricao) => {
    setModalTipo(tipo);
    setModalConteudo({ titulo, descricao });
    setModalAberto(true);
    setEquipesAcionadas([]);
  };

  const fecharModal = () => setModalAberto(false);

  const adicionarOcorrencia = () => {
    alert(`Nova ocorrência registrada: ${novaOcorrencia}`);
    setMensagem((prev) => [...prev, novaOcorrencia]);
    setNovaOcorrencia("");
    fecharModal();
  };

  const agendarIntervencao = () => {
    alert(`Intervenção agendada: ${intervencao}`);
    setIntervencao("");
    fecharModal();
  };

  const enviarMensagem = () => {
    alert(`Mensagem enviada: ${mensagem}`);
    setMensagem("");
    fecharModal();
  };

  const alternarChecklist = (item) => {
    setChecklist((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const acionarEquipe = (nome) => {
    if (!equipesAcionadas.includes(nome)) {
      setEquipesAcionadas((prev) => [...prev, nome]);
      alert(`${nome} acionada!`);
    } else {
      alert(`${nome} já foi acionada!`);
    }
  };

  const adicionarVoluntario = () => {
    if (novoVoluntario.trim() !== "") {
      setVoluntarios((prev) => [...prev, novoVoluntario.trim()]);
      setNovoVoluntario("");
    }
  };

  const removerVoluntario = (nome) => {
    setVoluntarios((prev) => prev.filter((v) => v !== nome));
  };

  const enviarMensagemVoluntarios = () => {
    if (mensagemVoluntarios.trim() !== "") {
      alert(
        `Mensagem enviada para ${voluntarios.length} voluntários:\n"${mensagemVoluntarios}"`
      );
      setMensagemVoluntarios("");
    }
  };

  /* --- Dados do gráfico (Recharts) --- */
  const dadosGrafico = [
    { desafio: "2022", "2021": 45, "2022": 60 },
    { desafio: "2023", "2021": 35, "2022": 80 },
    { desafio: "2024", "2021": 25, "2022": 50 },
    { desafio: "2025", "2021": 55, "2022": 40 },
  ];

  return (
    <div style={container}>
      {/* Gráfico */}
      <div style={graficoContainer}>
        <h3 style={{ fontWeight: "600", marginBottom: "10px" }}>
          Desafios enfrentados na área
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={dadosGrafico}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
            <XAxis type="number" hide />
            <YAxis dataKey="desafio" type="category" />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="center"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 10 }}
            />
            <Bar
              dataKey="2021"
              fill="#b8792b"
              barSize={12}
              radius={[4, 4, 4, 4]}
              name="Queimadas"
            />
            <Bar
              dataKey="2022"
              fill="#3182ff"
              barSize={12}
              radius={[4, 4, 4, 4]}
              name="Enchentes"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Intervenções */}
      <div style={acoesContainer}>
        <h3>Intervenções para aplicar</h3>

        {/* Ações emergenciais */}
        <div style={acaoGrupo}>
          <h4>Ações emergenciais:</h4>
          <div
            style={card("#f8d7da")}
            onClick={() =>
              abrirModal(
                "defesaCivil",
                "Acionar Defesa Civil",
                "Selecione equipes próximas para ação"
              )
            }
          >
            <FaFire /> Acionar Defesa Civil
          </div>
          <div
            style={card("#f8d7da")}
            onClick={() =>
              abrirModal(
                "bombeiros",
                "Chamar Bombeiros",
                "Selecione equipes próximas para ação"
              )
            }
          >
            <FaBell /> Chamar Bombeiros
          </div>
          <div
            style={card("#f8d7da")}
            onClick={() =>
              abrirModal(
                "autoridades",
                "Contato rápido com autoridades",
                "Enviar alertas e informações às autoridades"
              )
            }
          >
            <FaPhone /> Contato rápido com autoridades
          </div>
        </div>

        {/* Comunicação e apoio */}
        <div style={acaoGrupo}>
          <h4>Comunicação e apoio:</h4>
          <div
            style={card("#d4edda")}
            onClick={() =>
              abrirModal(
                "comunidade",
                "Notificar comunidade",
                "Enviar alertas e comunicados à população"
              )
            }
          >
            <FaBell /> Notificar comunidade
          </div>
          <div
            style={card("#d4edda")}
            onClick={() =>
              abrirModal(
                "voluntarios",
                "Grupo de voluntários locais",
                "Organizar voluntários para auxiliar nas operações"
              )
            }
          >
            <FaCheck /> Grupo de voluntários locais
          </div>
          <div
            style={card("#d4edda")}
            onClick={() =>
              abrirModal(
                "seguranca",
                "Orientações de segurança",
                "Passo a passo para casos de acidentes"
              )
            }
          >
            <FaCheck /> Orientações de segurança
          </div>
        </div>

        {/* Monitoramento e prevenção */}
        <div style={acaoGrupo}>
          <h4>Monitoramento e prevenção:</h4>
          <div
            style={card("#d1ecf1")}
            onClick={() =>
              abrirModal(
                "sensores",
                "Verificar sensores ambientais",
                "Checar dados dos sensores ambientais"
              )
            }
          >
            <FaBell /> Verificar sensores ambientais
          </div>
          <div
            style={card("#d1ecf1")}
            onClick={() =>
              abrirModal(
                "historico",
                "Histórico de ocorrências",
                "Visualizar registros anteriores"
              )
            }
          >
            <FaFileAlt /> Histórico de ocorrências
          </div>
          <div
            style={card("#d1ecf1")}
            onClick={() =>
              abrirModal(
                "mapa",
                "Mapa de áreas críticas",
                "Exibir mapa com áreas de risco"
              )
            }
          >
            <FaMapMarkedAlt /> Mapa de áreas críticas
          </div>
        </div>

        {/* Administração e planejamento */}
        <div style={acaoGrupo}>
          <h4>Administração e planejamento:</h4>
          <div
            style={card("#fff3cd")}
            onClick={() =>
              abrirModal(
                "ocorrencia",
                "Registrar nova ocorrência",
                "Digite os detalhes da nova ocorrência:"
              )
            }
          >
            <FaFileAlt /> Registrar nova ocorrência
          </div>
          <div
            style={card("#fff3cd")}
            onClick={() =>
              abrirModal(
                "intervencao",
                "Agendar intervenção preventiva",
                "Digite os detalhes da intervenção a ser agendada:"
              )
            }
          >
            <FaCalendarCheck /> Agendar intervenção preventiva
          </div>
          <div
            style={card("#fff3cd")}
            onClick={() =>
              abrirModal(
                "checklist",
                "Checklist de ações aplicadas",
                "Marque as ações que já foram realizadas:"
              )
            }
          >
            <FaCheck /> Checklist de ações aplicadas
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div style={modalOverlay} onClick={fecharModal}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{modalConteudo.titulo}</h3>
            <p>{modalConteudo.descricao}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- Estilos --- */
const sidebarWidth = 250;
const container = {
  display: "flex",
  gap: "30px",
  padding: "30px",
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  backgroundColor: "#f4f6f3",
  marginLeft: sidebarWidth,
  maxWidth: `calc(100% - ${sidebarWidth}px)`
};
const graficoContainer = {
  flex: 1,
  backgroundColor: "#fdfdfd",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};
const acoesContainer = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};
const acaoGrupo = {
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};
const card = (bg) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  backgroundColor: bg,
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  fontSize: "14px"
});
const modalOverlay = {
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
const modalContent = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "500px",
  width: "90%",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
};
const modalButton = {
  marginTop: "15px",
  padding: "8px 16px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#3498db",
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
const checkItem = { display: "block", margin: "8px 0", fontSize: "14px" };
const ulStyle = {
  listStyleType: "disc",
  paddingLeft: "20px",
  marginBottom: "10px"
};
