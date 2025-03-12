const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');

router.get('/', pacientesController.mostrarPacientes);       
router.post('/', pacientesController.criarPaciente);      
router.put('/:id', pacientesController.atualizarPaciente);
router.delete('/:id', pacientesController.deletarPaciente);
router.get('/busca', pacientesController.buscarPaciente);

module.exports = router;
