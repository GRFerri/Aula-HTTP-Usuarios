const MensagemRepository = require('../repository/MensagemRepository');

class MensagemService {
  async create(texto) {
    if (!texto || texto.trim() === '') {
      throw new Error('Texto da mensagem não pode estar vazio');
    }
    return await MensagemRepository.create(texto.trim());
  }

  async getAll() {
    return await MensagemRepository.getAll();
  }

  async getById(id) {
    const mensagem = await MensagemRepository.getById(id);
    if (!mensagem) {
      throw new Error('Mensagem não encontrada');
    }
    return mensagem;
  }

  async delete(id) {
    await this.getById(id); // Valida se existe
    return await MensagemRepository.delete(id);
  }
}

module.exports = new MensagemService();
