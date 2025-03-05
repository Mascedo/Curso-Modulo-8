const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');

router.get('/', filmesController.mostrarFilmes);       
router.post('/', filmesController.criarFilme);      
router.put('/:id', filmesController.atualizarFilme);
router.delete('/:id', filmesController.deletarFilme);
router.get('/busca', filmesController.buscarFilme);

module.exports = router;
