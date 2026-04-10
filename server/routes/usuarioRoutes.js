const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/UsuarioController');

router.post('/', UsuarioController.create.bind(UsuarioController));
router.get('/:id', UsuarioController.getById.bind(UsuarioController));
router.get('/email/:email', UsuarioController.getByEmail.bind(UsuarioController));

module.exports = router;
