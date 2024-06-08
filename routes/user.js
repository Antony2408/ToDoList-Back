const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtener todos los usuarios
router.get('/', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Obtener un usuario por su ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM usuario WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    });
});

// Crear un nuevo usuario
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    connection.query('INSERT INTO usuario (username, email, password) VALUES (?, ?, ?)',
        [username, email, password], (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ id: results.insertId, username, email, password });
        });
});

// Inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        
        const user = results[0];
        const isPasswordValid = (password === user.password);
        if (!isPasswordValid) return res.status(401).send('Invalid credentials');

        res.json({ id: user.id, username: user.username, email: user.email });
    });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM usuario WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
