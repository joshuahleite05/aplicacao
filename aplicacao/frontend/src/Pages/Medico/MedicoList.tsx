import React, { useState, useEffect } from "react";
import api from "../../api";
import "./styles/MedicoList.css";

interface Medico {
  ID: number;
  Nome: string;
  CRM: string;
  Especialidade: string;
  Telefone: string;
}

interface MedicoListProps {
  refresh: boolean;
}

const MedicoList: React.FC<MedicoListProps> = ({ refresh }) => {
  const [medicos, setMedicos] = useState<Medico[]>([]);

  const fetchMedicosList = async () => {
    try {
      const { data } = await api.get("/medicos");
      setMedicos(data);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/medicos/${id}`);
      fetchMedicosList();
    } catch (error) {
      console.error("Erro ao deletar médico:", error);
    }
  };

  useEffect(() => {
    fetchMedicosList();
  }, [refresh]);

  if (medicos.length === 0) {
    return <div>Não há médicos para exibir.</div>;
  }

  return (
    <div className="container">
      <h2>Lista de Médicos</h2>
    <table className="medico-list">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CRM</th>
          <th>Especialidade</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {medicos.map((medico) => (
          <tr key={medico.ID}>
            <td>{medico.Nome}</td>
            <td>{medico.CRM}</td>
            <td>{medico.Especialidade}</td>
            <td>{medico.Telefone}</td>
            <td>
              <button className="delete-button" onClick={() => handleDelete(medico.ID)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default MedicoList;
