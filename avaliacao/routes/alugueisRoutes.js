const express = require('express');
const router = express.Router();
const alugueisController = require('../controllers/alugueisController');

router.get('/', alugueisController.mostrarAlugueis);       
router.post('/', alugueisController.criarAluguel);      
router.put('/:id', alugueisController.atualizarAluguel);
router.delete('/:id', alugueisController.deletarAluguel);
router.get('/busca', alugueisController.buscarAluguel);

module.exports = router;