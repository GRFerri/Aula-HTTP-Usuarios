const express = require('express');
const cors = require('cors');
const db = require('./database');
const mensagemRoutes = require('./routes/mensagemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../'));

// Rotas
app.use('/mensagem', mensagemRoutes);
app.use('/usuario', usuarioRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('Servidor Outlaw Social rodando!');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor de Outlaw Social rodando em http://localhost:${PORT}`);
});
