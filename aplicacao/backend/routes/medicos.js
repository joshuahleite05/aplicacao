const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todos os médicos
router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM Medico');
        res.json(result);
    } catch (err) {
        console.error("Erro ao listar médicos:", err);
        res.status(500).json({ error: "Erro ao buscar médicos" });
    }
});

// Buscar médico por ID
router.get('/:id', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM Medico WHERE ID = ?', [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ error: "Médico não encontrado" });
        }
        res.json(result[0]);
    } catch (err) {
        console.error("Erro ao buscar médico:", err);
        res.status(500).json({ error: "Erro ao buscar médico" });
    }
});

// Adicionar médico
router.post('/', async (req, res) => {
    const { Nome, Especialidade, CRM, Telefone } = req.body;
    if (!Nome || !Especialidade || !CRM || !Telefone) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    try {
        await db.query('INSERT INTO Medico (Nome, Especialidade, CRM, Telefone) VALUES (?, ?, ?, ?)', 
            [Nome, Especialidade, CRM, Telefone]);
        res.status(201).json({ message: "Médico adicionado com sucesso" });
    } catch (err) {
        console.error("Erro ao adicionar médico:", err);
        res.status(500).json({ error: "Erro ao adicionar médico" });
    }
});

// Atualizar médico
router.put('/:id', async (req, res) => {
    const { Nome, Especialidade, CRM, Telefone } = req.body;
    if (!Nome || !Especialidade || !CRM || !Telefone) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    try {
        const [result] = await db.query('UPDATE Medico SET Nome = ?, Especialidade = ?, CRM = ?, Telefone = ? WHERE ID = ?', 
            [Nome, Especialidade, CRM, Telefone, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Médico não encontrado" });
        }
        res.json({ message: "Médico atualizado com sucesso" });
    } catch (err) {
        console.error("Erro ao atualizar médico:", err);
        res.status(500).json({ error: "Erro ao atualizar médico" });
    }
});

// Deletar médico
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Medico WHERE ID = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Médico não encontrado" });
        }
        res.json({ message: "Médico deletado com sucesso" });
    } catch (err) {
        console.error("Erro ao deletar médico:", err);
        res.status(500).json({ error: "Erro ao deletar médico" });
    }
});

module.exports = router;
