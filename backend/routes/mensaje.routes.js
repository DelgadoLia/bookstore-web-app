const express = require('express');
const router = express.Router();
const db = require('../db');

//get - obtener comentarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mensajes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

//crear mensaje
router.post('/', async (req, res) => {
  try {
    const {nombre, correo, asunto, mensaje} = req.body;
    const [result] = await db.query(
      'INSERT INTO mensajes (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)',
      [nombre, correo, asunto, mensaje]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Mensaje creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar' });
  }
});

module.exports = router;
