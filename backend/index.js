const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app=express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://delgadolia.github.io'
  ]
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const productoRutas = require('./routes/db.routes');
app.use('/api/productos', productoRutas);
const mensajesRoutes = require('./routes/mensaje.routes');
app.use('/api/mensajes', mensajesRoutes);

app.get('/api/manga', async (req, res) => {
  try {
    const { title, limit } = req.query;

    let url = `https://api.mangadex.org/manga?includes[]=cover_art&order[followedCount]=desc`;


    if (limit) url += `&limit=${limit}`;
    if (title) url += `&title=${title}`;


    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mangas' });
  }
});


app.get('/imagen', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        'Referer': 'https://mangadex.org',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener imagen' });
  }
});


app.get('/', (req, res) => {
    res.json({mensaje: 'Servidor funcionando correctamente en Render'});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});