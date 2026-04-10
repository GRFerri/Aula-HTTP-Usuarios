const MensagemService = require('../service/MensagemService');

class MensagemController {
  async create(req, res) {
    try {
      const { texto } = req.body;
      const mensagem = await MensagemService.create(texto);
      res.status(201).json(mensagem);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const mensagens = await MensagemService.getAll();
      res.json(mensagens);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const mensagem = await MensagemService.getById(id);
      res.json(mensagem);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const resultado = await MensagemService.delete(id);
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }
}

module.exports = new MensagemController();
