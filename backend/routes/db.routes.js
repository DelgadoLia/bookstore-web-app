const express = require('express');
const router = express.Router();
const db = require('../db');

//GET, todos los productos
router.get('/', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM productos');
        res.json(rows);
    }catch(error){
        res.status(500).json({error: 'Error en la db'});
    }
});

module.exports = router; 
