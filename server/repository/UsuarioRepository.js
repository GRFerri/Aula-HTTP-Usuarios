const db = require('../database');

class UsuarioRepository {
  create(nome, email, senha) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, nome, email });
        }
      );
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM usuario WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM usuario WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = new UsuarioRepository();
