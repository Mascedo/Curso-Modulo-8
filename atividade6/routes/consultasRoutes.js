const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');

router.get('/', consultasController.mostrarConsultas);       
router.post('/', consultasController.criarConsulta);      
router.put('/:id', consultasController.atualizarConsulta);
router.delete('/:id', consultasController.deletarConsulta);
router.get('/busca', consultasController.buscarConsulta);

module.exports = router;
