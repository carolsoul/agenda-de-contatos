const express = require('express');
const router = express.Router();
const db = require('../db'); // conexão com o banco

router.put('/:id/categoria', async (req, res) => {
    const { id } = req.params;
    const { categoria_id } = req.body;

    try {
        await db.query('UPDATE contatos SET categoria_id = ? WHERE id = ?', [categoria_id, id]);
        res.send({ message: 'Categoria atualizada com sucesso.' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id/favorito', async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;

    try {
        await db.query('UPDATE contatos SET favorite = ? WHERE id = ?', [favorite, id]);
        res.send({ message: 'Status de favorito atualizado com sucesso.' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

