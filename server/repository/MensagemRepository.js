const db = require('../database');

class MensagemRepository {
  create(texto) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO mensagem (texto) VALUES (?)',
        [texto],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, texto });
        }
      );
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM mensagem', (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM mensagem WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM mensagem WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ msg: 'Mensagem deletada' });
      });
    });
  }
}

module.exports = new MensagemRepository();
