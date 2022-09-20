let database = require('../database');
const {format} = require('date-fns');
let date = format(new Date, "yyyy-MM-dd k:m:ss");

const withdraw = ((req, res) => {
    let { numero_conta, valor, senha } = req.body;
    if (!numero_conta || !valor || !senha) {
        return res.status(403).json({ "mensagem": "O número da conta e o valor são obrigatórios!" })
    };
    if (valor < 0) {
        return res.status(403).json({ "mensagem": "O valor não pode ser menor que zero!" })
    };
    let findAcc = database.contas.find((acc) => {
        return acc.numero === Number(numero_conta)
    });

    if (!findAcc) {
        return res.status(404).json({ mensagem: "Conta informada não existe" })
    }

    if (findAcc.usuario.senha !== senha) {
        return res.status(403).json({ mensagem: "Senha incorreta" })
    }

    if (findAcc.saldo < Number(valor)) {
        return res.status(403).json({ mensagem: "Saldo insuficiente" })
    }
   
    let registro = {
        data: date,
        numero_conta: numero_conta,
        valor: valor
    };

    database.saques.push(registro);

    for (let acc of database.contas) {
        if (Number(numero_conta) === Number(acc.numero)) {
            acc.saldo -= valor
        }

    };
    return res.status(200).json();
});

module.exports = withdraw