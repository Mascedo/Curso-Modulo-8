let filmes = require('../models/filmesModel');

exports.mostrarFilmes = (req, res) => {
    if(filmes.length>0){
        res.status(200).json(filmes)
    }else{
        res.json('Nenhum filme adicionado!')
    }
}

exports.criarFilme = (req, res) => {
    const {titulo, diretor, ano, genero} = req.body;

    if(titulo&&diretor&&ano&&genero){
        let id = Date.now()
        let filme = {id, titulo, diretor, ano, genero}
        filmes.push(filme)
        res.status(201).json(filme)
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.atualizarFilme = (req, res) => {
    const {titulo, diretor, ano, genero} = req.body;
    
    if(titulo&&diretor&&ano&&genero){
        let id = parseInt(req.params.id)
        let verificardor = filmes.findIndex(filme => filme.id === id)
        if(verificardor>-1){
            filmes[verificardor] = {id, titulo, diretor, ano, genero}
            res.status(202).json(filmes[verificardor])
        }else{
            res.status(400).json('ID de atualização não encontrado!')
        }
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.deletarFilme = (req, res) => {
    let id = parseInt(req.params.id)
    let verificardor = filmes.find(filme => filme.id === id)
    if(verificardor){
        filmes = filmes.filter(filme => filme.id !== id)
        res.status(202).json('Filmes removido!')
    }else{
        res.status(400).json('ID de remoção não encontrado!')
    }
}

exports.buscarFilme = (req, res) => {
    const { titulo, diretor, ano, genero } = req.query;
    let resultado = filmes;

    if(titulo||diretor||ano||genero){
    if (titulo) resultado = resultado.filter(filme => filme.titulo.toLowerCase().includes(titulo.toLowerCase()));
    if (diretor) resultado = resultado.filter(filme => filme.diretor.toLowerCase().includes(diretor.toLowerCase()));
    if (ano) resultado = resultado.filter(filme => filme.ano == ano);
    if (genero) resultado = resultado.filter(filme => filme.genero.toLowerCase().includes(genero.toLowerCase()));
    }else{
        res.status(400).json('Metodo de busca incorreto!')
    }
    if(resultado.length>0){
    res.json(resultado);
    }else{
        res.status(400).json('Nenhum livro com esta caracteristica!')
    }
}