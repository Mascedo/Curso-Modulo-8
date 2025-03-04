const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');

router.get('/', livrosController.mostrarLivros);       
router.post('/', livrosController.criarLivro);      
router.put('/:id', livrosController.atualizarLivro);
router.delete('/:id', livrosController.deletarLivro);
router.get('/busca', livrosController.buscarLivro);

module.exports = router;
