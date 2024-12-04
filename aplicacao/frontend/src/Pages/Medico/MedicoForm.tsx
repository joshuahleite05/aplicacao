import React, { useState, ChangeEvent, FormEvent } from "react";
import api from "../../api";
import "./styles/MedicoForm.css";

interface MedicoFormProps {
  refresh: () => void;
}

const MedicoForm: React.FC<MedicoFormProps> = ({ refresh }) => {
  const [formData, setFormData] = useState({
    Nome: "",
    CRM: "",
    Especialidade: "",
    Telefone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/medicos", formData);
      refresh();
      setFormData({ Nome: "", CRM: "", Especialidade: "", Telefone: "" });
    } catch (error) {
      console.error("Erro ao adicionar médico:", error);
    }
  };

  return (
    <form className="medico-form container" onSubmit={handleSubmit}>
      <h2>Adicionar Novo Médico</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="Nome"
            value={formData.Nome}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>CRM:</label>
          <input
            type="text"
            name="CRM"
            value={formData.CRM}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Especialidade:</label>
          <input
            type="text"
            name="Especialidade"
            value={formData.Especialidade}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="text"
            name="Telefone"
            value={formData.Telefone}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="submit-button" type="submit">Adicionar Médico</button>
    </form>
  );
};

export default MedicoForm;
