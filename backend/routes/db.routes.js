const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const nombre = Date.now() + path.extname(file.originalname);
    cb(null, nombre);
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error en la db' });
  }
});

router.post('/', upload.single('imagen'), async (req, res) => {
  console.log('POST recibido');
  console.log('body:', req.body);
  console.log('file:', req.file);
  try {
    const { nombre, categoria, editorial, tomo, precio, stock, descripcion, disponible } = req.body;

    const imagen = req.file ? req.file.filename : null;

    const sql = `
      INSERT INTO productos 
      (nombre, categoria, editorial, tomo, precio, stock, imagen, descripcion, disponible)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [nombre, categoria, editorial, tomo, precio, stock, imagen, descripcion, disponible]);

    res.json({ mensaje: 'Producto agregado' });

  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Error al insertar producto' });
  }
});

module.exports = router;