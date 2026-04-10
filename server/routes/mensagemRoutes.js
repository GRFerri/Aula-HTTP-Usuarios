const express = require('express');
const router = express.Router();
const MensagemController = require('../controller/MensagemController');

router.post('/', MensagemController.create.bind(MensagemController));
router.get('/', MensagemController.getAll.bind(MensagemController));
router.get('/:id', MensagemController.getById.bind(MensagemController));
router.delete('/:id', MensagemController.delete.bind(MensagemController));

module.exports = router;
