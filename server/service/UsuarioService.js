const bcrypt = require('bcrypt');
const UsuarioRepository = require('../repository/UsuarioRepository');

class UsuarioService {
  async create(nome, email, senha) {
    if (!nome || nome.trim() === '') {
      throw new Error('Nome não pode estar vazio');
    }
    if (!email || email.trim() === '') {
      throw new Error('Email não pode estar vazio');
    }
    if (!senha || senha.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    // Verificar se email já existe
    const usuarioExistente = await UsuarioRepository.getByEmail(email);
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    // Hash da senha com bcrypt
    const senhaHash = await bcrypt.hash(senha, 10);

    return await UsuarioRepository.create(nome.trim(), email.trim(), senhaHash);
  }

  async getById(id) {
    const usuario = await UsuarioRepository.getById(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    return usuario;
  }

  async getByEmail(email) {
    const usuario = await UsuarioRepository.getByEmail(email);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    return usuario;
  }
}

module.exports = new UsuarioService();
