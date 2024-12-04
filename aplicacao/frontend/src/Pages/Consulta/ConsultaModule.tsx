import  { useState } from "react";
import ConsultaForm from "./ConsultaForm";
import ConsultaList from "./ConsultaList";
import "./styles/ConsultaModule.css";


const ConsultaModule = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="consulta-module">
      <h2 className="consulta-title" >Gestão de Consultas</h2>
      <ConsultaForm refresh={handleRefresh} />
      <ConsultaList refresh={refresh} />
    </div>
  );
};

export default ConsultaModule;
