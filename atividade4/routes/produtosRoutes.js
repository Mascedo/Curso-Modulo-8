const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.get('/', produtosController.mostrarProdutos);       
router.post('/', produtosController.criarProduto);      
router.put('/:id', produtosController.atualizarProduto);
router.delete('/:id', produtosController.deletarProduto);
router.get('/busca', produtosController.buscarProduto);

module.exports = router;
