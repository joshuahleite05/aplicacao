import { useState } from "react";
import PacienteList from "./PacienteList";
import PacienteForm from "./PacienteForm";
import "./styles/PacienteModule.css";

const PacienteModule = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="paciente-module">
      <h2 className="module-title">Gestão de Pacientes</h2>
      <PacienteForm refresh={handleRefresh} />
      <PacienteList refresh={refresh} />
    </div>
  );
};

export default PacienteModule;
