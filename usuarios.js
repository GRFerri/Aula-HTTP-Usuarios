const express = require('express');
const app = express();

app.use(express.json()); 

let usuarios = [
    {id: 1, nome: "Ana", idade: 20, email: "ana@gmail.com"},
    {id: 2, nome: "Carlos", idade: 25, email: "carlos@gmail.com"},
    {id: 3, nome: "Maria", idade: 30, email: "maria@gmail.com"}

];


app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json(usuario);

});

app.post('/usuarios', (req, res) => {
    const nome = req.body.nome;
    const idade = req.body.idade;
    const email = req.body.email;

    if (!nome || !idade || !email) return res.status(400).json({ erro: 'Nome, idade e email são obrigatórios' });

    const novo = { id: usuarios.length + 1, nome: nome, idade: idade, email: email };
    usuarios.push(novo);
    res.status(201).json(novo);
});

app.put('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const nome = req.body.nome;
    const idade = req.body.idade;
    const email = req.body.email;

    if (!nome || !idade || !email) return res.status(400).json({ erro: 'Nome, idade e email são obrigatórios' });

    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const atualizado = { id, nome, idade, email };
    usuarios[idx] = atualizado;
    res.json(atualizado);
});

app.patch('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const { nome, idade, email } = req.body;
    if (nome !== undefined) usuario.nome = nome;
    if (idade !== undefined) usuario.idade = idade;
    if (email !== undefined) usuario.email = email;

    res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });
    const removido = usuarios.splice(idx, 1)[0];
    res.json(removido);
});

app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001/usuarios');
});