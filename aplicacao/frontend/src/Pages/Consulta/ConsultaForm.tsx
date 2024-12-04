import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import api from "../../api";
import "./styles/ConsultaForm.css";

interface ConsultaFormProps {
  refresh: () => void;
}

interface FormData {
  Data: string;
  Hora: string;
  Paciente_ID: string;
  Medico_ID: string;
}

interface Paciente {
  ID: number;
  Nome: string;
}

interface Medico {
  ID: number;
  Nome: string;
}

const ConsultaForm: React.FC<ConsultaFormProps> = ({ refresh }) => {
  const [formData, setFormData] = useState<FormData>({
    Data: "",
    Hora: "",
    Paciente_ID: "",
    Medico_ID: "",
  });

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar lista de pacientes
  const fetchPacientesList = async () => {
    try {
      const { data } = await api.get<Paciente[]>("/pacientes");
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      setError("Erro ao carregar lista de pacientes.");
    }
  };

  // Buscar lista de médicos
  const fetchMedicosList = async () => {
    try {
      const { data } = await api.get<Medico[]>("/medicos");
      setMedicos(data);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
      setError("Erro ao carregar lista de médicos.");
    }
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Limpar erros
      try {
        await Promise.all([fetchPacientesList(), fetchMedicosList()]);
      } catch {
        setError("Erro ao carregar dados.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/consultas", formData);
      refresh();
      setFormData({ Data: "", Hora: "", Paciente_ID: "", Medico_ID: "" });
    } catch (error) {
      console.error("Erro ao adicionar consulta:", error);
      setError("Erro ao adicionar consulta. Tente novamente.");
    }
  };

  if (isLoading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <form className="medico-form container" onSubmit={handleSubmit}>
      <h2>Adicionar Nova Consulta</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Data:</label>
          <input
            type="date"
            name="Data"
            value={formData.Data}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hora:</label>
          <input
            type="time"
            name="Hora"
            value={formData.Hora}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Linha de Paciente e Médico */}
      <div className="form-row">
        <div className="form-group">
          <label>Paciente:</label>
          <select
            name="Paciente_ID"
            value={formData.Paciente_ID}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um Paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.ID} value={paciente.ID}>
                {paciente.Nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Médico:</label>
          <select
            name="Medico_ID"
            value={formData.Medico_ID}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um Médico</option>
            {medicos.map((medico) => (
              <option key={medico.ID} value={medico.ID}>
                {medico.Nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="submit-button" type="submit">
        Adicionar Consulta
      </button>
    </form>
  );
};

export default ConsultaForm;
