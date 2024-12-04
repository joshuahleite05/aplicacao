import React, { useState } from "react";
import MedicoForm from "./MedicoForm";
import MedicoList from "./MedicoList";
import "./styles/MedicoModule.css";

const MedicoModule: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="medico-module">
      <h2 className="module-title">Gestão de Médicos</h2>
      <MedicoForm refresh={handleRefresh} />
      <MedicoList refresh={refresh} />
    </div>
  );
};

export default MedicoModule;
