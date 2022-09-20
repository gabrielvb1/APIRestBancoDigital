const database = require('../database');
const {format} = require('date-fns');
let date = format(new Date, "yyyy-MM-dd k:m:ss");

const deposit = ((req, res) => {
    let { numero_conta, valor } = req.body;
    if (!numero_conta || !valor) {
        return res.status(404).json({ "mensagem": "O número da conta e o valor são obrigatórios!" })
    };
    if (valor < 0) {
        return res.status(403).json({ mensagem: "Valor não permitido" })
    }
    let registro = {
        data: date,
        numero_conta: numero_conta,
        valor: valor
    };

    database.depositos.push(registro);
    for (let acc of database.contas) {
        if (Number(numero_conta) === Number(acc.numero)) {
            acc.saldo += valor
        }

    }
    return res.status(200).json()
});

module.exports = deposit