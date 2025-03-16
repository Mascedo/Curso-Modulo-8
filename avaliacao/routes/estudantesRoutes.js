const express = require('express');
const router = express.Router();
const estudantesController = require('../controllers/estudantesController');

router.get('/', estudantesController.mostrarEstudantes);       
router.post('/', estudantesController.criarEstudantes);      
router.put('/:id', estudantesController.atualizarEstudantes);
router.delete('/:id', estudantesController.deletarEstudantes);
router.get('/busca', estudantesController.buscarEstudantes);

module.exports = router;
