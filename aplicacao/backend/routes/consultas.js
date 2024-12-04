const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todas as consultas
router.get('/', async (req, res) => {
    try {
        const [result] = await db.query(
            `SELECT Consulta.*, 
                    Paciente.Nome AS NomePaciente, 
                    Medico.Nome AS NomeMedico 
             FROM Consulta
             INNER JOIN Paciente ON Consulta.Paciente_ID = Paciente.ID
             INNER JOIN Medico ON Consulta.Medico_ID = Medico.ID`
        );
        res.json(result);
    } catch (err) {
        console.error("Erro ao listar consultas:", err);
        res.status(500).json({ error: "Erro ao buscar consultas" });
    }
});

// Buscar consulta por ID
router.get('/:id', async (req, res) => {
    try {
        const [result] = await db.query(
            `SELECT Consulta.*, 
                    Paciente.Nome AS NomePaciente, 
                    Medico.Nome AS NomeMedico 
             FROM Consulta
             INNER JOIN Paciente ON Consulta.Paciente_ID = Paciente.ID
             INNER JOIN Medico ON Consulta.Medico_ID = Medico.ID
             WHERE Consulta.ID = ?`, 
            [req.params.id]
        );
        if (result.length === 0) {
            return res.status(404).json({ error: "Consulta não encontrada" });
        }
        res.json(result[0]);
    } catch (err) {
        console.error("Erro ao buscar consulta:", err);
        res.status(500).json({ error: "Erro ao buscar consulta" });
    }
});

// Adicionar consulta
router.post('/', async (req, res) => {
    const { Data, Hora, Paciente_ID, Medico_ID } = req.body;
    if (!Data || !Hora || !Paciente_ID || !Medico_ID) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    try {
        await db.query(
            'INSERT INTO Consulta (Data, Hora, Paciente_ID, Medico_ID) VALUES (?, ?, ?, ?)', 
            [Data, Hora, Paciente_ID, Medico_ID]
        );
        res.status(201).json({ message: "Consulta adicionada com sucesso" });
    } catch (err) {
        console.error("Erro ao adicionar consulta:", err);
        res.status(500).json({ error: "Erro ao adicionar consulta" });
    }
});

// Atualizar consulta
router.put('/:id', async (req, res) => {
    const { Data, Hora, Paciente_ID, Medico_ID } = req.body;
    if (!Data || !Hora || !Paciente_ID || !Medico_ID) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    try {
        const [result] = await db.query(
            'UPDATE Consulta SET Data = ?, Hora = ?, Paciente_ID = ?, Medico_ID = ? WHERE ID = ?', 
            [Data, Hora, Paciente_ID, Medico_ID, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Consulta não encontrada" });
        }
        res.json({ message: "Consulta atualizada com sucesso" });
    } catch (err) {
        console.error("Erro ao atualizar consulta:", err);
        res.status(500).json({ error: "Erro ao atualizar consulta" });
    }
});

// Deletar consulta
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Consulta WHERE ID = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Consulta não encontrada" });
        }
        res.json({ message: "Consulta deletada com sucesso" });
    } catch (err) {
        console.error("Erro ao deletar consulta:", err);
        res.status(500).json({ error: "Erro ao deletar consulta" });
    }
});

module.exports = router;
