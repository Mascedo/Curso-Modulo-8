let medicos = require('../models/medicosModel')
let pacientes = require('../models/pacientesModel')
let consultas = require('../models/consultasModel')


exports.listaConsultasMedico = (req, res) => {
    let id = parseInt(req.params.idMedico)
    let verificadorMedico = medicos.find(medico => medico.id === id)
    let verificadorConsulta = consultas.filter(consulta => consulta.idMedico === id)
    if(verificadorMedico&&verificadorConsulta.length > 0){//verifica se o medico existe e tem consultas
        let resposta = consultas.filter(consulta => consulta.idMedico === id)
        res.status(200).json(resposta)
    }else if(verificadorMedico){//verifica se o medico exites
        res.status(200).json("Este medicos não tem consultas marcadas!")
    }else{//este medico nao existe
        res.status(400).json("ID do medico não encontrado!")
    }
}

exports.listarPacientesMedico = (req, res) => {
    let id = parseInt(req.params.idMedico)
    let verificadorMedico = medicos.find(medico => medico.id === id)
    let verificadorPacienteConsultas = consultas.filter(consulta => consulta.idMedico === id)//verifica quantas consultas
    if(verificadorMedico&&verificadorPacienteConsultas.length > 0){
        let resposta = []
        consultas.forEach(consulta => {
            if(consulta.idMedico === id){
                let idPaciente = consulta.idPaciente
                pacientes.forEach(paciente => {
                    if(paciente.id === idPaciente){
                        resposta.push(paciente)
                    }
                });
            }
        });
        res.status(200).json(resposta)
    }else if(verificadorMedico){
        res.status(200).json("Este medicos não tem pacientes atendidos!")
    }else{
        res.status(400).json("ID do medico não encontrado!")
    }
}

exports.listarMedicosPaciente = (req, res) => {
    let id = parseInt(req.params.idPaciente)
    let verificadorPaciente = pacientes.find(paciente => paciente.id === id)
    let verificadorMedicoConsultas = consultas.filter(consulta => consulta.idPaciente === id)//verifica quantas consultas
    if(verificadorPaciente&&verificadorMedicoConsultas.length > 0){
        let resposta = []
        consultas.forEach(consulta => {
            if(consulta.idPaciente === id){
                let idMedico = consulta.idMedico
                medicos.forEach(medico => {
                    if(medico.id === idMedico){
                        resposta.push(medico)
                    }
                });
            }
        });
        res.status(200).json(resposta)
    }else if(verificadorPaciente){
        res.status(200).json("Este pacientes não tem medicos!")
    }else{
        res.status(400).json("ID do paciente não encontrado!")
    }
}

exports.listarConsultasMes = (req, res) => {
    let mes = req.params.mes
    let resposta = consultas.filter(consulta => parseInt(consulta.data.split("-")[1].trim()) == parseInt(mes.trim()))
        if((resposta.length > 0)&&(mes>=1&&mes<=12)){
            res.status(200).json(resposta)
        }else if(mes>=1&&mes<=12){
            res.status(200).json("Nenhuma consulta marcada este mês!")
        }else{
            res.status(400).json("O valor tem que ser valido para um mês!")
        }
}