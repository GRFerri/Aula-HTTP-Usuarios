const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

let comentarios = [
    { id: 1, nome: 'João', comentario: 'Muito legal o post!' },
    { id: 2, nome: 'Marcos', comentario: 'Achei bem interessante!' }
];

let nextId = 3;

app.get('/comentarios', (req, res) => {
    res.json(comentarios);
});

app.post('/comentarios', (req, res) => {
    const { nome, comentario } = req.body;
    if (!nome || !comentario) {
        return res.status(400).json({ erro: 'Nome e comentário são obrigatórios' });
    }
    const novo = { id: nextId++, nome, comentario };
    comentarios.push(novo);
    res.status(201).json(novo);
});

app.delete('/comentarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comentarios.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: 'Comentário não encontrado' });
    }
    comentarios.splice(index, 1);
    res.json({ mensagem: 'Comentário deletado com sucesso' });
});

app.listen(PORT, () => {
    console.log(`Servidor de comentários rodando em http://localhost:${PORT}`);
});