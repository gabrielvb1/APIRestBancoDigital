const database = require('../database');
const {format} = require('date-fns');
let date = format(new Date, "yyyy-MM-dd k:m:ss");

const transfer = ((req, res) => {
    let { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(404).json({ "mensagem": "Número das contas, valor e senha são obrigatórios" })
    };
    if (valor < 0) {
        return res.status(403).json({ mensagem: "Valor não permitido" })
    }

    let registro = {
        data: date,
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor
    };
    let transfAcc = database.contas.filter((acc) => {
        return acc.numero === Number(numero_conta_origem) ||acc.numero === Number (numero_conta_destino)
    })

    if (transfAcc.length === 1) {
       return res.status(404).json({ mensagem: "Conta informada é inválida" })
    }

    if (senha !== transfAcc[0].usuario.senha) {
        return res.status(403).json({ mensagem: "Senha inválida" })
    }
    if (Number(valor) > transfAcc[0].saldo) {
        return res.status(403).json({ mensagem: "Saldo insuficiente" })
    }
    transfAcc[0].saldo -= Number(valor)
    transfAcc[1].saldo += Number(valor)

    database.transferencias.push(registro);
    res.send(transfAcc)
    
});

module.exports = transfer