const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// enable CORS for all origins (allows file:// or other domains to call the API)
app.use(cors());
app.use(express.json());

// optional: serve static files so you can open the page via http://localhost:3000
app.use(express.static(__dirname));

// in‑memory comments store
let comentarios = [
    { nome: 'João', comentario: 'Muito legal o post!' },
    { nome: 'Marcos', comentario: 'Achei bem interessante!' }
];

app.get('/comentarios', (req, res) => {
    res.json(comentarios);
});

app.post('/comentarios', (req, res) => {
    const { nome, comentario } = req.body;
    if (!nome || !comentario) {
        return res.status(400).json({ erro: 'Nome e comentário são obrigatórios' });
    }
    const novo = { nome, comentario };
    comentarios.push(novo);
    res.status(201).json(novo);
});

app.listen(PORT, () => {
    console.log(`Servidor de comentários rodando em http://localhost:${PORT}`);
});