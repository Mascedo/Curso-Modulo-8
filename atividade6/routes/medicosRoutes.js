const express = require('express');
const router = express.Router();
const medicosController = require('../controllers/medicosController');

router.get('/', medicosController.mostrarMedicos);       
router.post('/', medicosController.criarMedico);      
router.put('/:id', medicosController.atualizarMedico);
router.delete('/:id', medicosController.deletarMedico);
router.get('/busca', medicosController.buscarMedico);

module.exports = router;
