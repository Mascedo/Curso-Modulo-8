let medicos = require('../models/medicosModel')
let pacientes = require('../models/pacientesModel')
let consultas = require('../models/consultasModel')

exports.mostrarConsultas = (req, res) => {
    if(consultas.length > 0){
        res.status(200).json(consultas)
    }else{
        res.status(400).json("Nenhuma consulta adicionada!")
    }
}

exports.criarConsulta = (req, res) => {
    const {data, idMedico, idPaciente, descricao} = req.body
    let verificadorMedico = medicos.find(medico => medico.id === idMedico)//confirma a existencia do medico
    let verificadorPaciente = pacientes.find(paciente => paciente.id === idPaciente)//confirma a existencia do paciente
    if((data.split("").length===10&&data[2]==='-'&&data[5]==='-')&&idMedico&&idPaciente&&descricao&&verificadorMedico&&verificadorPaciente){//confima tudo
        res.status(201).json("Consulta adicionada!")
        let id = Date.now()
        let consulta = {id, data, idMedico, idPaciente, descricao}
        consultas.push(consulta)
    }else{
        res.status(400).json("Todos os campos são necessarios!")
    }
}

exports.atualizarConsulta = (req, res) => {
    const {data, idMedico, idPaciente, descricao} = req.body
    let verificadorMedico = medicos.find(medico => medico.id === idMedico)//confirma a existencia do medico
    let verificadorPaciente = pacientes.find(paciente => paciente.id === idPaciente)//confirma a existencia do paciente
    if((data.split("").length===10&&data[2]==='-'&&data[5]==='-')&&idMedico&&idPaciente&&descricao&&verificadorMedico&&verificadorPaciente){//confima tudo
        let id = parseInt(req.params.id)
        let verificador = consultas.findIndex(consulta => consulta.id === id)
        if(verificador > -1){
            consultas[verificador] = {id, data, idMedico, idPaciente, descricao}
            res.status(202).json("Conssulta atualizada")
        }else{
            res.status(400).json("ID de consulta não encontrado!")
        } 
    }else{
        res.status(400).json("Todos os campos são necessarios!")
    }
}

exports.deletarConsulta = (req, res) => {
    let idRemover = parseInt(req.params.id)
    let verificador = consultas.find(consulta => consulta.id === idRemover)
    if(verificador){
        res.status(202).json("Consulta removida!")
        consultas = consultas.filter(consulta => consulta.id !== idRemover)
    }else{
        res.status(400).json("ID de remoção não encontrado!")
    }
}

exports.buscarConsulta = (req, res) => {
    const {data, idMedico, idPaciente, descricao} = req.query
    let resultado = consultas
    if(data||idMedico||idPaciente||descricao){
        if(data) resultado = resultado.filter(consulta => consulta.data.toLowerCase().includes(data.toLowerCase()));
        if(descricao) resultado = resultado.filter(consulta => consulta.descricao.toLowerCase().includes(descricao.toLowerCase()));
        if(idMedico) resultado = resultado.filter(consulta => consulta.idMedico == idMedico)
        if(idPaciente) resultado = resultado.filter(consulta => consulta.idPaciente == idPaciente)
    }else{
        res.json("Requisição de caracterisitca invalida!")
    }
    if(resultado.length > 0){
        res.status(200).json(resultado)
    }else{
        res.status(400).json("Nehnuma consulta com esta caracteristica!")
    }
}