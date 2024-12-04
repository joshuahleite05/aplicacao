import React, { useState, useEffect } from "react";
import api from "../../api";
import "./styles/ConsultaList.css";


interface Consulta {
  ID: number;
  Data: string;
  Hora: string;
  NomePaciente: string;
  NomeMedico: string;
}

interface ConsultaListProps {
  refresh: boolean;
}

const ConsultaList: React.FC<ConsultaListProps> = ({ refresh }) => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  const fetchConsultasList = async () => {
    try {
      const { data } = await api.get<Consulta[]>("/consultas");
      setConsultas(data);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/consultas/${id}`);
      fetchConsultasList();
    } catch (error) {
      console.error("Erro ao deletar consulta:", error);
    }
  };

  useEffect(() => {
    fetchConsultasList();
  }, [refresh]);

  if (consultas.length === 0) {
    return <div>Não há consultas para exibir.</div>;
  }

  return (
    <div className="container">
      <h2>Lista de Consultas</h2>
    <table className="medico-list">
    <thead>
      <tr>
        <th>Data</th>
        <th>Hora</th>
        <th>Paciente</th>
        <th>Medico</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {consultas.map((consulta) => (
        <tr key={consulta.ID}>
          <td>{consulta.Data}</td>
          <td>{consulta.Hora}</td>
          <td>{consulta.NomePaciente}</td>
          <td>{consulta.NomeMedico}</td>
          <td>
            <button className="delete-button" onClick={() => handleDelete(consulta.ID)}>Deletar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
};

export default ConsultaList;
