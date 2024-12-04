import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Link,
} from "react-router";
import ConsultaModule from "./Pages/Consulta/ConsultaModule";
import PacienteModule from "./Pages/Paciente/PacienteModule";
import MedicoModule from "./Pages/Medico/MedicoModule";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bem-vindo!</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Link to="/consultas">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Consultas
          </button>
        </Link>
        <Link to="/pacientes">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Pacientes
          </button>
        </Link>
        <Link to="/medicos">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Médicos
          </button>
        </Link>
      </div>
    </div>
  );
};

// Configuração das rotas
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/consultas" element={<ConsultaModule />} />
      <Route path="/pacientes" element={<PacienteModule />} />
      <Route path="/medicos" element={<MedicoModule />} />
    </Route>
  )
);
