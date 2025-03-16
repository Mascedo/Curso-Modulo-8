let alugueis = require('../models/alugueisModel');
let estudantes = require('../models/estudantesModels');
let livros = require('../models/livrosModel');

function verificardorDeAluguel (idLivro, idEstudante, dataAluguel, dataDevolucao){//faz a verficação dos dados do aluguel
    
    let verificadorDeLivro = livros.find(livro => livro.id == idLivro)//verifica se o livro existe
    let verificadorDeEstudante = estudantes.find(estudante => estudante.id == idEstudante)//verifica se o estudante existe

    function verificadorDeData (data){//verifica o formato se o formato da data é ISO e tabem retorna um valor da data
        if((data.split("").length===10&&data[4]==="-"&&data[7]==="-")&&parseInt((data.slice(5,7))) > 0 && parseInt(data.slice(5,7)) < 13 && parseInt(data.slice(8,10)) > 0 && parseInt(data.slice(8,10)) < 32){//verifica o formato e valores da data
            let valorDaData = data.split("").filter(caracteres => caracteres !== "-")//extrai um valor da data vetirando os "-"
            return [true, valorDaData]
        }else{
            return [false, "Formato de data invalido!"]
        }
    }

    if(!verificadorDeLivro){
        return "ID de livro não encontrado!"
    }

    if(!verificadorDeEstudante){
        return "ID de estudante não encontrado!"
    }

    if(verificadorDeData(dataAluguel)[0] === false){
        return "dataAluguel formato invalido!"
    }

    if(verificadorDeData(dataDevolucao)[0] === false){
        return "dataDevolucao formato invalido"
    }

    if(verificadorDeData(dataAluguel)[1]>verificadorDeData(dataDevolucao)[1]){
        return "dataDevolucao não pode ser antes de dataAluguel"
    }

    return true
}

exports.mostrarAlugueis = (req, res) => {
    if(alugueis.length > 0){//verifica se a livros adicionados
        res.status(200).json(alugueis)
    }else{
        res.status(400).json("Sem alugueis adiconados!")
    }
}

exports.criarAluguel = (req, res) => {
    const {idLivro, idEstudante, dataAluguel, dataDevolucao} = req.body

    if(verificardorDeAluguel(idLivro, idEstudante, dataAluguel, dataDevolucao) === true){//case a verificação de bom
        let id = Date.now()
        let novoAluguel = {id, idLivro, idEstudante, dataAluguel, dataDevolucao}
        res.status(201).json("Aluguel adicionado!")
        alugueis.push(novoAluguel)
    }else{
        res.status(400).json(verificardorDeAluguel(idLivro, idEstudante, dataAluguel, dataDevolucao))//resposta de erro da verificação
    }
}

exports.atualizarAluguel = (req, res) => {
    const {idLivro, idEstudante, dataAluguel, dataDevolucao} = req.body

    let id = parseInt(req.params.id)
    let verificador = alugueis.findIndex(aluguel => aluguel.id === id)

    if(verificardorDeAluguel(idLivro, idEstudante, dataAluguel, dataDevolucao) === true){//case a verificação de bom
        alugueis[verificador] = {id, idLivro, idEstudante, dataAluguel, dataDevolucao}
        res.status(202).json("Consulta atualizada!")
    }else if(verificador > -1){//caso o verificador recuse mas tenha o livro
        res.status(400).json(verificardorDeAluguel(idLivro, idEstudante, dataAluguel, dataDevolucao))
    }else{//caso nao tenha livro
        res.status(400).json("ID de aluguel não encontrado!")
    }
}

exports.deletarAluguel = (req, res) => {
    let id = parseInt(req.params.id)
    let verificador = alugueis.find(aluguel => aluguel.id === id)//ele primeiro vê se o livro existe
    if(verificador){//caso existir...
        alugueis = alugueis.filter(aluguel => aluguel.id !== id)//remove o livro
        res.status(202).json("Aluguel deletado!")
    }else{
        res.status(400).json("ID de aluguel não encontrado!")//caso nao exista
    }
}

exports.buscarAluguel = (req, res) => {
    const {dataAluguel, idLivro, idEstudante} = req.query;
    let resultado = alugueis;

    if(dataAluguel||idLivro||idEstudante){
    if (dataAluguel) resultado = resultado.filter(aluguel => aluguel.dataAluguel == dataAluguel);
    if (idLivro) resultado = resultado.filter(aluguel => aluguel.idLivro == idLivro)
    if (idEstudante) resultado = resultado.filter(aluguel => aluguel.idEstudante == idEstudante);
    }else{
        res.status(400).json('Metodo de busca incorreto!')//caso nao encontre
    }
    if(resultado.length>0){//caso tenha aluguel com esta caracteristica
    res.json(resultado);
    }else{
        res.status(400).json('Nenhum aluguel com esta caracteristica!')
    }
}