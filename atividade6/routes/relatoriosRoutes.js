const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

router.get('/consultas/medico/:idMedico', relatoriosController.listaConsultasMedico)//todas consultas de um medico
router.get('/pacientes/medico/:idMedico', relatoriosController.listarPacientesMedico)//todos pacientes de um medico
router.get('/medicos/paciente/:idPaciente', relatoriosController.listarMedicosPaciente)//todos medicos de um paciente
router.get('/consultas/mes/:mes', relatoriosController.listarConsultasMes)//listar todas consultas de um mês

module.exports = router