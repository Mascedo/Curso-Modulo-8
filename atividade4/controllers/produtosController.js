let produtos = require('../models/produtosModel');

exports.mostrarProdutos = (req, res) => {
    if(produtos.length>0){
        res.status(200).json(produtos)
    }else{
        res.json('Nenhum produto adicionado!')
    }
}

exports.criarProduto = (req, res) => {
    const {nome, categoria, preco, estoque} = req.body;

    if(nome&&categoria&&preco&&estoque){
        let id = Date.now()
        let produto = {id, nome, categoria, preco, estoque}
        produtos.push(produto)
        res.status(201).json(produto)
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.atualizarProduto = (req, res) => {
    const {nome, categoria, preco, estoque} = req.body;
    
    if(nome&&categoria&&preco&&estoque){
        let id = parseInt(req.params.id)
        let verificardor = produtos.findIndex(produto => produto.id === id)
        if(verificardor>-1){
            produtos[verificardor] = {id, nome, categoria, preco, estoque}
            res.status(202).json(produtos[verificardor])
        }else{
            res.status(400).json('ID de atualização não encontrado!')
        }
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.deletarProduto = (req, res) => {
    let id = parseInt(req.params.id)
    let verificardor = produtos.find(produto => produto.id === id)
    if(verificardor){
        produtos = produtos.filter(produto => produto.id !== id)
        res.status(202).json('Produtos removido!')
    }else{
        res.status(400).json('ID de remoção não encontrado!')
    }
}

exports.buscarProduto = (req, res) => {
    const {nome, categoria, preco, estoque} = req.query;
    let resultado = produtos;

    if(nome||categoria||preco||estoque){
    if (nome) resultado = resultado.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
    if (categoria) resultado = resultado.filter(produto => produto.categoria.toLowerCase().includes(categoria.toLowerCase()));
    if (preco) resultado = resultado.filter(produto => produto.preco == preco);
    if (estoque) resultado = resultado.filter(produto => produto.estoque == estoque);
    }else{
        res.status(400).json('Metodo de busca incorreto!')
    }
    if(resultado.length>0){
    res.json(resultado);
    }else{
        res.status(400).json('Nenhum produto com esta caracteristica!')
    }
}