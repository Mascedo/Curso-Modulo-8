let estudantes = require('../models/estudantesModels');

exports.mostrarEstudantes = (req, res) => {
    if(estudantes.length>0){
        res.status(200).json(estudantes)
    }else{
        res.json('Nenhum estudante adicionado!')
    }
}

exports.criarEstudantes = (req, res) => {
    const {nome, matricula, curso, ano} = req.body;

    if(nome&&matricula&&curso&&ano){
        let id = Date.now()
        let estudante = {id, nome, matricula, curso, ano}
        estudantes.push(estudante)
        res.status(201).json(estudante)
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.atualizarEstudantes = (req, res) => {
    const {nome, matricula, curso, ano} = req.body;
    
    if(nome&&matricula&&curso&&ano){
        let id = parseInt(req.params.id)
        let verificardor = estudantes.findIndex(estudante => estudante.id === id)
        if(verificardor>-1){
            estudantes[verificardor] = {id, nome, matricula, curso, ano}
            res.status(202).json(estudantes[verificardor])
        }else{
            res.status(400).json('ID de atualização não encontrado!')
        }
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.deletarEstudantes = (req, res) => {
    let id = parseInt(req.params.id)
    let verificardor = estudantes.find(estudante => estudante.id === id)
    if(verificardor){
        estudantes = estudantes.filter(estudante => estudante.id !== id)
        res.status(202).json('Livro removido!')
    }else{
        res.status(400).json('ID de remoção não encontrado!')
    }
}

exports.buscarEstudantes = (req, res) => {
    const {nome, matricula, curso, ano} = req.query;
    let resultado = estudantes;

    if(nome||matricula||curso||ano){
    if (nome) resultado = resultado.filter(estudante => estudante.nome.toLowerCase().includes(nome.toLowerCase()));
    if (matricula) resultado = resultado.filter(estudante => estudante.matricula.toLowerCase().includes(matricula.toLowerCase()));
    if (curso) resultado = resultado.filter(estudante => estudante.curso.toLowerCase().includes(curso.toLowerCase()));
    if (ano) resultado = resultado.filter(estudante => estudante.ano == ano);
    }else{
        res.status(400).json('Metodo de busca incorreto!')
    }
    if(resultado.length>0){
    res.json(resultado);
    }else{
        res.status(400).json('Nenhum livro com esta caracteristica!')
    }
}