const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Bootstrap: criar tabelas se não existirem
db.run(`CREATE TABLE IF NOT EXISTS mensagem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
)`);

module.exports = db;
