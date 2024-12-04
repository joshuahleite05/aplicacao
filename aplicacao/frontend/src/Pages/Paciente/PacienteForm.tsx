import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import api from "../../api";
import "./styles/PacienteForm.css";

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
  id: string;
  nome: string;
}

interface Medico {
  id: string;
  nome: string;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Carregando dados de pacientes e médicos...");
        const [pacientesResponse, medicosResponse] = await Promise.all([
          api.get<Paciente[]>("/pacientes"),
          api.get<Medico[]>("/medicos"),
        ]);

        console.log("Pacientes:", pacientesResponse.data);
        console.log("Médicos:", medicosResponse.data);

        setPacientes(pacientesResponse.data);
        setMedicos(medicosResponse.data);
        setError(null); // Limpar erros após sucesso
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError("Erro ao carregar dados. Por favor, tente novamente.");
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
      console.log("Dados enviados:", formData);
      await api.post("/consultas", formData);
      refresh();
      setFormData({ Data: "", Hora: "", Paciente_ID: "", Medico_ID: "" });
    } catch (error) {
      console.error("Erro ao adicionar consulta:", error);
      setError("Erro ao adicionar consulta. Por favor, tente novamente.");
    }
  };

  return (
    <form className="medico-form container" onSubmit={handleSubmit}>
      <h2>Adicionar Nova Consulta</h2>
      {error && <div className="error">{error}</div>}

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
            <option value="">Selecione um paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome}
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
            <option value="">Selecione um médico</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nome}
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
