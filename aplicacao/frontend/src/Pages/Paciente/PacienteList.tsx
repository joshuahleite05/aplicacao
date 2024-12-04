import React, { useState, useEffect } from "react";
import api from "../../api";
import "./styles/PacienteList.css";

interface Paciente {
  ID: number;
  Nome: string;
  CPF: string;
  Telefone: string;
  Endereco: string;
}

interface PacienteListProps {
  refresh: boolean;
}

const PacienteList: React.FC<PacienteListProps> = ({ refresh }) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  const fetchPacientesList = async () => {
    try {
      const { data } = await api.get<Paciente[]>("/pacientes");
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/pacientes/${id}`);
      fetchPacientesList();
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
    }
  };

  useEffect(() => {
    fetchPacientesList();
  }, [refresh]);

  if (pacientes.length === 0) {
    return <div>Não há pacientes para exibir.</div>;
  }

  return (
    <div className="container">
      <h2>Lista de Pacientes</h2>
      <table className="paciente-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.ID}>
              <td>{paciente.ID}</td>
              <td>{paciente.Nome}</td>
              <td>{paciente.CPF}</td>
              <td>{paciente.Telefone}</td>
              <td>{paciente.Endereco}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(paciente.ID)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacienteList;
