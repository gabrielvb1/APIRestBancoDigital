let database = require('../database');

const deleteAcc = ((req, res) => {
    let { numeroConta } = req.params;

    let findAcc = database.contas.find((acc) => {
        return acc.numero === Number(numeroConta)
    })

    if (!findAcc) {
        return res.status(404).json({ mensagem: "Numero da conta não-válido" })
    }

    if (findAcc.saldo === 0) {
        database.contas = database.contas.filter((acc) => {
            return acc !== findAcc
        })
    }
    else {
        return res.status(403).json({ mensagem: "Saldo precisa estar zerado" })
    }

    return res.status(200).json()


});

module.exports = deleteAcc