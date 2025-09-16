import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div
      className="d-none d-md-flex flex-column col-3 text-white min-vh-100"
      style={{ backgroundColor: "#8B0000", padding: 0 }}
    >
      {/* Logo grudado no topo, alinhado ao centro com mesmo padding lateral */}
      <div style={{ padding: "16px" }}>
        <Link to="/">
          <img
            src={props.Logo}
            alt="TriStack Logo"
            className="img-fluid"
            style={{ maxWidth: "200px", display: "block", margin: "0 auto" }}
          />
        </Link>
      </div>

      {/* Menu com mesmo padding lateral */}
      <ul className="nav flex-column px-4">
        <li className="nav-item">
          <a className="nav-link text-white" href="/home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/dashboard">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/alertas">Alertas</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/configuracoes">Configurações</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/adinistracao">Administração da Área</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/sair">Sair</a>
        </li>
      </ul>

    </div>
  );
};

export default Header;
