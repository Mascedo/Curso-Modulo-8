let pacientes = require('../models/pacientesModel')

exports.mostrarPacientes = (req, res) => {
    if(pacientes.length > 0){
        res.status(200).json(pacientes)
    }else{
        res.status(400).json('Nenhum paciente adicionado!')
    }
}

exports.criarPaciente = (req, res) => {
    const {nome, dataNascimento} = req.body

    if(nome&&(dataNascimento.split("").length===10&&dataNascimento[2]==='-'&&dataNascimento[5]==='-')){//verifica se tem os campos e tambem verifica o formato de entrada da data
        let id = Date.now()
        let paciente = {id, nome, dataNascimento}
        res.status(201).json('Paciente adicionado!')
        pacientes.push(paciente)
    }else{
        res.status(400).json('Todos campos são necessarios!')
    }
}

exports.atualizarPaciente = (req, res) => {
    const {nome, dataNascimento} = req.body

    if(nome&&(dataNascimento.split("").length===10&&dataNascimento[2]==='-'&&dataNascimento[5]==='-')){//verifica se tem os campos e tambem verifica o formato de entrada da data
        let id = parseInt(req.params.id)
        let verificardor = pacientes.findIndex(paciente => paciente.id === id)
        if(verificardor>-1){
            res.status(202).json('Paciente atualizado!')
            pacientes[verificardor] = {id, nome, dataNascimento}
        }else{
            res.status(400).json('ID não encontrado!')
        }
    }else{
        res.status(400).json('Todos os campos são necessarios!')
    }
}


exports.deletarPaciente = (req, res) => {
    let id = parseInt(req.params.id)
    let verificardor = pacientes.find(paciente => paciente.id === id)
        if(verificardor){
            pacientes = pacientes.filter(paciente => paciente.id !== id)
            res.status(202).json('Paciente removido!')
        }else{
            res.status(400).json('ID de remoção não encontrado!')
        }
    
}

exports.buscarPaciente = (req, res) => {
    const {nome, dataNascimento} = req.query
    let resultado = pacientes
    if(nome||dataNascimento){
        if(nome) resultado = resultado.filter(paciente => paciente.nome.toLowerCase().includes(nome.toLowerCase()));
        if(dataNascimento) resultado = resultado.filter(paciente => paciente.dataNascimento == dataNascimento);
    }else{
        res.status(400).json('Metodo de busca incorreto!')
    }
    if(resultado.length>0){
        res.json(resultado);
        }else{
            res.status(400).json('Nenhum paciente com esta caracteristica!')
    }
}
