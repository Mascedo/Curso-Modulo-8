let funcionarios = require('../models/funcionariosModel');

exports.mostrarFuncionarios = (req, res) => {
    if(funcionarios.length>0){
        res.status(200).json(funcionarios)
    }else{
        res.json('Nenhum funcionario adicionado!')
    }
}

exports.criarFuncionario = (req, res) => {
    const {nome, cargo, departamento, salario} = req.body;

    if(nome&&cargo&&departamento&&salario){
        let id = Date.now()
        let funcionario = {id, nome, cargo, departamento, salario}
        funcionarios.push(funcionario)
        res.status(201).json(funcionario)
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.atualizarFuncionario = (req, res) => {
    const {nome, cargo, departamento, salario} = req.body;
    
    if(nome&&cargo&&departamento&&salario){
        let id = parseInt(req.params.id)
        let verificardor = funcionarios.findIndex(funcionario => funcionario.id === id)
        if(verificardor>-1){
            funcionarios[verificardor] = {id, nome, cargo, departamento, salario}
            res.status(202).json(funcionarios[verificardor])
        }else{
            res.status(400).json('ID de atualização não encontrado!')
        }
    }else{
        res.status(400).json('Todos campos são obrigatorios!')
    }
}

exports.deletarFuncionario = (req, res) => {
    let id = parseInt(req.params.id)
    let verificardor = funcionarios.find(funcionario => funcionario.id === id)
    if(verificardor){
        funcionarios = funcionarios.filter(funcionario => funcionario.id !== id)
        res.status(202).json('Funcionario removido!')
    }else{
        res.status(400).json('ID de remoção não encontrado!')
    }
}

exports.buscarFuncionario = (req, res) => {
    const {nome, cargo, departamento, salario} = req.query;
    let resultado = funcionarios;

    if(nome||cargo||departamento||salario){
    if (nome) resultado = resultado.filter(funcionario => funcionario.nome.toLowerCase().includes(nome.toLowerCase()));
    if (cargo) resultado = resultado.filter(funcionario => funcionario.cargo.toLowerCase().includes(cargo.toLowerCase()));
    if (departamento) resultado = resultado.filter(funcionario => funcionario.departamento.toLowerCase().includes(departamento.toLowerCase()));
    if (salario) resultado = resultado.filter(funcionario => funcionario.salario == salario);
    }else{
        res.status(400).json('Metodo de busca incorreto!')
    }
    if(resultado.length>0){
    res.json(resultado);
    }else{
        res.status(400).json('Nenhum funcionario com esta caracteristica!')
    }
}