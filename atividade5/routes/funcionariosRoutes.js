const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionariosController');

router.get('/', funcionariosController.mostrarFuncionarios);       
router.post('/', funcionariosController.criarFuncionario);      
router.put('/:id', funcionariosController.atualizarFuncionario);
router.delete('/:id', funcionariosController.deletarFuncionario);
router.get('/busca', funcionariosController.buscarFuncionario);

module.exports = router;
