let livros = require('../models/livrosModel');

exports.mostrarLivros = (req, res) => {
    if(livros.length>0){
        res.status(200).json(livros)
    }else{
        res.json('Nenhum livro adicionado!')
    }
}

exports.criarLivro = (req, res) => {
    const {titulo, autor, ano, genero} = req.body;

    if(titulo&&autor&&ano&&genero){
        let id = Date.now()
        let livro = {id, titulo, autor, ano, genero}
        livros.push(livro)
        res.status(201).json(livro)
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.atualizarLivro = (req, res) => {
    const {titulo, autor, ano, genero} = req.body;
    
    if(titulo&&autor&&ano&&genero){
        let id = parseInt(req.params.id)
        let verificardor = livros.findIndex(livro => livro.id === id)
        if(verificardor>-1){
            livros[verificardor] = {id, titulo, autor, ano, genero}
            res.status(202).json(livros[verificardor])
        }else{
            res.status(400).json('ID de atualização não encontrado!')
        }
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.deletarLivro = (req, res) => {
    let id = parseInt(req.params.id)
    let verificardor = livros.find(livro => livro.id === id)
    if(verificardor){
        livros = livros.filter(livro => livro.id !== id)
        res.status(202).json('Livro removido!')
    }else{
        res.status(400).json('ID de remoção não encontrado!')
    }
}

exports.buscarLivro = (req, res) => {
    const { titulo, autor, ano, genero } = req.query;
    let resultado = livros;

    if(titulo||autor||ano||genero){
    if (titulo) resultado = resultado.filter(l => l.titulo.toLowerCase().includes(titulo.toLowerCase()));
    if (autor) resultado = resultado.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
    if (ano) resultado = resultado.filter(l => l.ano == ano);
    if (genero) resultado = resultado.filter(l => l.genero.toLowerCase().includes(genero.toLowerCase()));
    }else{
        res.status(400).json('Metodo de busca incorreto!')
    }
    if(resultado.length>0){
    res.json(resultado);
    }else{
        res.status(400).json('Nenhum livro com esta caracteristica!')
    }
}