const express = require("express");
const { check } = require("express-validator");
const { validateRequest } = require("../middleware");
const router = express.Router();
const db = require("../db");

// Listar todos os pacientes
router.get("/", async (req, res) => {
  console.log("GET /api/pacientes chamado");
  try {
    const [result] = await db.query("SELECT * FROM paciente");
    console.log("Pacientes retornados:", result);
    res.json(result);
  } catch (err) {
    console.error("Erro no GET /api/pacientes:", err);
    res.status(500).send(err);
  }
});

// Adicionar paciente
router.post(
  "/",
  [
    check("Nome").notEmpty().withMessage("O nome é obrigatório"),
    check("Data_Nascimento")
      .isDate()
      .withMessage("A data de nascimento deve ser válida"),
    check("Telefone").isMobilePhone().withMessage("O telefone deve ser válido"),
    check("Endereco").notEmpty().withMessage("O endereço é obrigatório"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { Nome, Data_Nascimento, Telefone, Endereco } = req.body;
      await db.query(
        "INSERT INTO paciente (Nome, Data_Nascimento, Telefone, Endereco) VALUES (?, ?, ?, ?)",
        [Nome, Data_Nascimento, Telefone, Endereco]
      );
      res.status(201).send("Paciente criado com sucesso");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Atualizar paciente
router.put(
  "/:id",
  [
    check("Nome").notEmpty().withMessage("O nome é obrigatório"),
    check("Data_Nascimento")
      .isDate()
      .withMessage("A data de nascimento deve ser válida"),
    check("Telefone").isMobilePhone().withMessage("O telefone deve ser válido"),
    check("Endereco").notEmpty().withMessage("O endereço é obrigatório"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { Nome, Data_Nascimento, Telefone, Endereco } = req.body;
      await db.query(
        "UPDATE paciente SET Nome = ?, Data_Nascimento = ?, Telefone = ?, Endereco = ? WHERE ID = ?",
        [Nome, Data_Nascimento, Telefone, Endereco, req.params.id]
      );
      res.send("Paciente atualizado com sucesso");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Deletar paciente
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM paciente WHERE ID = ?", [req.params.id]);
    res.send("Paciente deletado com sucesso");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
