const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtener todas las tareas
router.get('/', (req, res) => {
    connection.query('SELECT * FROM tarea', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Obtener todas las tareas de un usuario por su ID
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    connection.query('SELECT * FROM tarea WHERE usuario_id = ? ORDER BY creado DESC', [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Crear una nueva tarea
router.post('/', (req, res) => {
    const { titulo, descripcion, estado, usuario_id } = req.body;
    connection.query('INSERT INTO tarea (titulo, descripcion, estado, usuario_id) VALUES (?, ?, ?, ?)',
        [titulo, descripcion, estado, usuario_id], (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ id: results.insertId, titulo, descripcion, estado, usuario_id });
        });
});

// Actualizar el estado de una tarea
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    connection.query('UPDATE tarea SET estado = ? WHERE id = ?', [estado, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Task status updated successfully', id, estado });
    });
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM tarea WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Task deleted successfully' });
    });
});

module.exports = router;
