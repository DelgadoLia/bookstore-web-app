const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app=express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin:'http://localhost:4200'}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const productoRutas = require('./routes/db.routes');
app.use('/api/productos', productoRutas);

app.get('/', (req, res) => {
    res.json({mensaje: 'Servidor funcionando'});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});