let medicos = require('../models/medicosModel')

exports.mostrarMedicos = (req, res) => {
    if(medicos.length > 0){
        res.status(200).json(medicos)
    }else{
        res.status(400).json('Nenhum medico adicionado!')
    }
}

exports.criarMedico = (req, res) => {
    const {nome, especialidade} = req.body

    if(nome&&especialidade){//verifica se tem os campos e tambem verifica o formato de entrada da data
        let id = Date.now()
        let medico = {id, nome, especialidade}
        res.status(201).json('Medico adicionado!')
        medicos.push(medico)
    }else{
        res.status(400).json('Todos campos são necessarios!')
    }
}

exports.atualizarMedico = (req, res) => {
    const {nome, especialidade} = req.body

    if(nome&&especialidade){//verifica se tem os campos e tambem verifica o formato de entrada da data
        let id = parseInt(req.params.id)
        let verificardor = medicos.findIndex(medico => medico.id === id)
        if(verificardor>-1){
            res.status(202).json('Medico atualizado!')
            medicos[verificardor] = {id, nome, especialidade}
        }else{
            res.status(400).json('ID não encontrado!')
        }
    }else{
        res.status(400).json('Todos os campos são necessarios!')
    }
}

exports.deletarMedico = (req, res) => {
    let id = parseInt(req.params.id)
    let verificardor = medicos.find(medico => medico.id === id)
        if(verificardor){
            medicos = medicos.filter(medico => medico.id !== id)
            res.status(202).json('Medico removido!')
        }else{
            res.status(400).json('ID de remoção não encontrado!')
        }
    
}

exports.buscarMedico = (req, res) => {
    const {nome, especialidade} = req.query
    let resultado = medicos
    if(nome||especialidade){
        if(nome) resultado = resultado.filter(medico => medico.nome.toLowerCase().includes(nome.toLowerCase()));
        if(especialidade) resultado = resultado.filter(medico => medico.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }else{
        res.status(400).json('Metodo de busca incorreto!')
    }
    if(resultado.length>0){
        res.json(resultado);
        }else{
            res.status(400).json('Nenhum medico com esta caracteristica!')
    }
}