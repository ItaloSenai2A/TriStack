import React, { useState } from "react";
import { FaFire, FaPhone, FaBell, FaMapMarkedAlt, FaFileAlt, FaCalendarCheck, FaCheck } from "react-icons/fa";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Administracao() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState(""); 
  const [modalConteudo, setModalConteudo] = useState({ titulo: "", descricao: "" });

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
    setMensagem(prev => [...prev, novaOcorrencia]);
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
    setChecklist(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
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
    if(novoVoluntario.trim() !== ""){
      setVoluntarios(prev => [...prev, novoVoluntario.trim()]);
      setNovoVoluntario("");
    }
  };

  const removerVoluntario = (nome) => {
    setVoluntarios(prev => prev.filter(v => v !== nome));
  };

  const enviarMensagemVoluntarios = () => {
    if(mensagemVoluntarios.trim() !== ""){
      alert(`Mensagem enviada para ${voluntarios.length} voluntários:\n"${mensagemVoluntarios}"`);
      setMensagemVoluntarios("");
    }
  };

  /* --- Gráfico de barras --- */
  const dadosGrafico = {
    labels: ["Queimadas", "Enchentes", "Deslizamentos"],
    datasets: [
      {
        label: "Ocorrências registradas",
        data: [50, 80, 30], // você pode ligar esses valores a estados dinâmicos depois
        backgroundColor: ["#d68936", "#3498db", "#e74c3c"]
      }
    ]
  };

  const opcoesGrafico = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Desafios enfrentados na área"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={container}>
      {/* Gráfico */}
      <div style={graficoContainer}>
        <Bar data={dadosGrafico} options={opcoesGrafico} />
      </div>

      {/* Intervenções */}
      <div style={acoesContainer}>
        <h3>Intervenções para aplicar</h3>

        {/* Ações emergenciais */}
        <div style={acaoGrupo}>
          <h4>Ações emergenciais:</h4>
          <div style={card("#f8d7da")} onClick={() => abrirModal("defesaCivil", "Acionar Defesa Civil", "Selecione equipes próximas para ação")}>
            <FaFire /> Acionar Defesa Civil
          </div>
          <div style={card("#f8d7da")} onClick={() => abrirModal("bombeiros", "Chamar Bombeiros", "Selecione equipes próximas para ação")}>
            <FaBell /> Chamar Bombeiros
          </div>
          <div style={card("#f8d7da")} onClick={() => abrirModal("autoridades", "Contato rápido com autoridades", "Enviar alertas e informações às autoridades")}>
            <FaPhone /> Contato rápido com autoridades
          </div>
        </div>

        {/* Comunicação e apoio */}
        <div style={acaoGrupo}>
          <h4>Comunicação e apoio:</h4>
          <div style={card("#d4edda")} onClick={() => abrirModal("comunidade", "Notificar comunidade", "Enviar alertas e comunicados à população")}>
            <FaBell /> Notificar comunidade
          </div>
          <div style={card("#d4edda")} onClick={() => abrirModal("voluntarios", "Grupo de voluntários locais", "Organizar voluntários para auxiliar nas operações")}>
            <FaCheck /> Grupo de voluntários locais
          </div>
          <div style={card("#d4edda")} onClick={() => abrirModal("seguranca", "Orientações de segurança", "Passo a passo para casos de acidentes")}>
            <FaCheck /> Orientações de segurança
          </div>
        </div>

        {/* Monitoramento e prevenção */}
        <div style={acaoGrupo}>
          <h4>Monitoramento e prevenção:</h4>
          <div style={card("#d1ecf1")} onClick={() => abrirModal("sensores", "Verificar sensores ambientais", "Checar dados dos sensores ambientais")}>
            <FaBell /> Verificar sensores ambientais
          </div>
          <div style={card("#d1ecf1")} onClick={() => abrirModal("historico", "Histórico de ocorrências", "Visualizar registros anteriores")}>
            <FaFileAlt /> Histórico de ocorrências
          </div>
          <div style={card("#d1ecf1")} onClick={() => abrirModal("mapa", "Mapa de áreas críticas", "Exibir mapa com áreas de risco")}>
            <FaMapMarkedAlt /> Mapa de áreas críticas
          </div>
        </div>

        {/* Administração e planejamento */}
        <div style={acaoGrupo}>
          <h4>Administração e planejamento:</h4>
          <div style={card("#fff3cd")} onClick={() => abrirModal("ocorrencia", "Registrar nova ocorrência", "Digite os detalhes da nova ocorrência:")}>
            <FaFileAlt /> Registrar nova ocorrência
          </div>
          <div style={card("#fff3cd")} onClick={() => abrirModal("intervencao", "Agendar intervenção preventiva", "Digite os detalhes da intervenção a ser agendada:")}>
            <FaCalendarCheck /> Agendar intervenção preventiva
          </div>
          <div style={card("#fff3cd")} onClick={() => abrirModal("checklist", "Checklist de ações aplicadas", "Marque as ações que já foram realizadas:")}>
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

            {/* Tipos de modal */}
            {modalTipo === "ocorrencia" && (
              <>
                <input type="text" placeholder="Detalhes da ocorrência" value={novaOcorrencia} onChange={(e) => setNovaOcorrencia(e.target.value)} style={inputStyle}/>
                <button style={modalButton} onClick={adicionarOcorrencia}>Registrar</button>
              </>
            )}

            {modalTipo === "intervencao" && (
              <>
                <input type="text" placeholder="Detalhes da intervenção" value={intervencao} onChange={(e) => setIntervencao(e.target.value)} style={inputStyle}/>
                <button style={modalButton} onClick={agendarIntervencao}>Agendar</button>
              </>
            )}

            {modalTipo === "checklist" && (
              <>
                {["Acionar Defesa Civil", "Chamar Bombeiros", "Notificar comunidade", "Voluntários mobilizados"].map(item => (
                  <label key={item} style={checkItem}>
                    <input type="checkbox" checked={checklist.includes(item)} onChange={() => alternarChecklist(item)} /> {item}
                  </label>
                ))}
                <button style={modalButton} onClick={fecharModal}>Fechar</button>
              </>
            )}

            {modalTipo === "comunidade" && (
              <>
                <textarea placeholder="Escreva a mensagem para a comunidade" value={mensagem} onChange={(e) => setMensagem(e.target.value)} style={{...inputStyle, height:"100px"}} />
                <button style={modalButton} onClick={enviarMensagem}>Enviar mensagem</button>
              </>
            )}

            {modalTipo === "defesaCivil" && (
              <div style={{ textAlign:"left" }}>
                <h4>Defesas Civis Próximas</h4>
                {[{ nome: "Brigada de Incêndio Central", distancia: "1,2 km" },
                  { nome: "Equipe de Resgate Norte", distancia: "2,5 km" },
                  { nome: "Equipe de Suporte Leste", distancia: "3,0 km" },
                  { nome: "Equipe de Monitoramento Sul", distancia: "4,1 km" }].map((equipe, index) => (
                  <button key={index} style={{ ...modalButton, display:"block", width:"100%", marginTop:"10px", backgroundColor:"#e67e22" }} onClick={() => acionarEquipe(equipe.nome)}>
                    {equipe.nome} - {equipe.distancia}
                  </button>
                ))}
                <button style={{ ...modalButton, backgroundColor:"#e74c3c", marginTop:"15px" }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {modalTipo === "bombeiros" && (
              <div style={{ textAlign:"left" }}>
                <h4>Equipes de Bombeiros Próximas</h4>
                {[{ nome: "Quartel Central", distancia: "1,0 km" },
                  { nome: "Equipe de Resgate Leste", distancia: "2,8 km" },
                  { nome: "Equipe de Salvamento Sul", distancia: "3,5 km" },
                  { nome: "Equipe de Atendimento Norte", distancia: "4,0 km" }].map((equipe, index) => (
                  <button key={index} style={{ ...modalButton, display:"block", width:"100%", marginTop:"10px", backgroundColor:"#c0392b" }} onClick={() => acionarEquipe(equipe.nome)}>
                    {equipe.nome} - {equipe.distancia}
                  </button>
                ))}
                <button style={{ ...modalButton, backgroundColor:"#e74c3c", marginTop:"15px" }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {modalTipo === "autoridades" && (
              <div style={{ textAlign:"left" }}>
                <h4>Contato rápido com autoridades</h4>
                {["Prefeito", "Secretário de Segurança", "Polícia Militar", "Defesa Civil"].map((autoridade, index) => (
                  <div key={index} style={{ marginBottom:"10px" }}>
                    <span style={{ fontWeight:"600" }}>{autoridade}</span>
                    <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", marginTop:"5px" }}>
                      <button style={{ ...modalButton, backgroundColor:"#3498db" }} onClick={() => alert(`Chamando ${autoridade}...`)}>Chamada</button>
                      <button style={{ ...modalButton, backgroundColor:"#2ecc71" }} onClick={() => alert(`SMS enviado para ${autoridade}`)}>SMS</button>
                      <button style={{ ...modalButton, backgroundColor:"#f1c40f" }} onClick={() => {
                        const texto = prompt(`Digite a mensagem para ${autoridade}:`);
                        if(texto) alert(`Mensagem enviada para ${autoridade}: "${texto}"`);
                      }}>Mensagem</button>
                    </div>
                  </div>
                ))}
                <button style={{ ...modalButton, backgroundColor:"#e74c3c", marginTop:"15px" }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {modalTipo === "voluntarios" && (
              <div style={{ textAlign:"left" }}>
                <h4>Grupo de Voluntários Locais</h4>

                {voluntarios.length > 0 ? (
                  <ul style={ulStyle}>
                    {voluntarios.map((v, index) => (
                      <li key={index}>
                        {v} 
                        <button style={{ ...modalButton, backgroundColor:"#e74c3c", marginLeft:"10px", padding:"3px 6px", fontSize:"12px" }} onClick={() => removerVoluntario(v)}>Remover</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhum voluntário cadastrado.</p>
                )}

                <input type="text" placeholder="Nome do voluntário" value={novoVoluntario} onChange={(e) => setNovoVoluntario(e.target.value)} style={inputStyle}/>
                <button style={modalButton} onClick={adicionarVoluntario}>Adicionar voluntário</button>

                {voluntarios.length > 0 && (
                  <>
                    <textarea placeholder="Mensagem para todos os voluntários" value={mensagemVoluntarios} onChange={(e) => setMensagemVoluntarios(e.target.value)} style={{...inputStyle, height:"80px", marginTop:"10px"}} />
                    <button style={modalButton} onClick={enviarMensagemVoluntarios}>Enviar mensagem</button>
                  </>
                )}

                <button style={{ ...modalButton, backgroundColor:"#e74c3c", marginTop:"15px" }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {modalTipo === "seguranca" && (
              <div style={{ textAlign:"left" }}>
                <h4>Passo a Passo</h4>
                <label style={{ marginBottom:"5px", fontWeight:"600" }}>Selecione o tipo de acidente:</label>
                <select 
                  style={{ width:"100%", padding:"8px", borderRadius:"5px", border:"1px solid #ccc", marginBottom:"10px" }} 
                  onChange={(e) => setChecklist([e.target.value])}
                >
                  <option value="">-- Selecione --</option>
                  <option value="queimadas">Queimadas</option>
                  <option value="enchentes">Enchentes</option>
                  <option value="acidentesGerais">Acidentes Gerais</option>
                </select>

                {checklist.includes("queimadas") && (
                  <ol style={{ marginBottom:"10px" }}>
                    <li>Evacuar a área imediatamente.</li>
                    <li>Acionar brigadas de incêndio locais.</li>
                    <li>Orientar voluntários e população sobre abrigos seguros.</li>
                    <li>Monitorar a propagação do fogo através de sensores.</li>
                  </ol>
                )}

                {checklist.includes("enchentes") && (
                  <ol style={{ marginBottom:"10px" }}>
                    <li>Evacuar áreas de risco e pontos de alagamento.</li>
                    <li>Acionar equipes de resgate e Defesa Civil.</li>
                    <li>Garantir comunicação com a população através de alertas.</li>
                    <li>Monitorar níveis de água com sensores.</li>
                  </ol>
                )}

                {checklist.includes("acidentesGerais") && (
                  <ol style={{ marginBottom:"10px" }}>
                    <li>Isolar a área para evitar mais acidentes.</li>
                    <li>Prestar primeiros socorros às vítimas.</li>
                    <li>Acionar ambulâncias e equipes médicas.</li>
                    <li>Registrar ocorrência e comunicar autoridades.</li>
                  </ol>
                )}

                <button
                  style={{ ...modalButton, backgroundColor:"#e74c3c" }}
                  onClick={fecharModal}
                >
                  Fechar
                </button>
              </div>
            )}

            {modalTipo === "sensores" && (
              <div style={{ textAlign:"left" }}>
                <p><strong>Temperatura:</strong> 28°C</p>
                <p><strong>Umidade:</strong> 65%</p>
                <p><strong>Qualidade do Ar:</strong> Boa</p>
                <button style={{ ...modalButton, backgroundColor:"#e74c3c", marginTop:"10px" }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {modalTipo === "historico" && (
              <div style={{ textAlign:"left" }}>
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
                <button style={{ ...modalButton, backgroundColor:"#e74c3c" }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

            {modalTipo === "mapa" && (
              <div style={{ textAlign:"left" }}>
                <h4>Mapa de áreas críticas</h4>
                <div style={{ width:"100%", height:"400px", borderRadius:"12px", overflow:"hidden", marginBottom:"10px" }}>
                  <MapContainer center={[-3.4653, -62.2159]} zoom={5} style={{ width: "100%", height: "100%" }}>
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, and the GIS User Community"
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
                <button style={{ ...modalButton, backgroundColor:"#e74c3c" }} onClick={fecharModal}>Fechar</button>
              </div>
            )}

          </div>
        </div>
      )}
      
    </div>
  );
}

/* --- Estilos --- */
const sidebarWidth = 250;
const container = { display:"flex", gap:"30px", padding:"30px", fontFamily:"Arial, sans-serif", minHeight:"100vh", backgroundColor:"#f4f6f3", marginLeft:sidebarWidth, maxWidth:`calc(100% - ${sidebarWidth}px)` };
const graficoContainer = { flex:1, backgroundColor:"#fdfdfd", padding:"20px", borderRadius:"15px", boxShadow:"0 4px 10px rgba(0,0,0,0.1)" };
const acoesContainer = { flex:1, display:"flex", flexDirection:"column", gap:"20px" };
const acaoGrupo = { display:"flex", flexDirection:"column", gap:"8px" };
const card = (bg) => ({ display:"flex", alignItems:"center", gap:"10px", padding:"10px", backgroundColor:bg, borderRadius:"10px", cursor:"pointer", boxShadow:"0 2px 5px rgba(0,0,0,0.1)", fontSize:"14px" });
const modalOverlay = { position:"fixed", top:0, left:0, width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,0.5)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:1000 };
const modalContent = { backgroundColor:"#fff", padding:"20px", borderRadius:"10px", maxWidth:"500px", width:"90%", textAlign:"center", boxShadow:"0 4px 15px rgba(0,0,0,0.2)" };
const modalButton = { marginTop:"15px", padding:"8px 16px", borderRadius:"5px", border:"none", backgroundColor:"#3498db", color:"#fff", cursor:"pointer" };
const inputStyle = { width:"100%", padding:"8px", marginTop:"10px", borderRadius:"5px", border:"1px solid #ccc" };
const checkItem = { display:"block", margin:"8px 0", fontSize:"14px" };