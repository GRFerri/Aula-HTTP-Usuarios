const UsuarioService = require('../service/UsuarioService');

class UsuarioController {
  async create(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const usuario = await UsuarioService.create(nome, email, senha);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.getById(id);
      // Não retorna a senha
      const { senha, ...usuarioSemSenha } = usuario;
      res.json(usuarioSemSenha);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }

  async getByEmail(req, res) {
    try {
      const { email } = req.params;
      const usuario = await UsuarioService.getByEmail(email);
      // Não retorna a senha
      const { senha, ...usuarioSemSenha } = usuario;
      res.json(usuarioSemSenha);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }
}

module.exports = new UsuarioController();
