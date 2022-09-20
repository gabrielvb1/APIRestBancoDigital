let database = require('../database');

const statement = ((req, res) => {
    let { numero_conta, senha } = req.query;

    let findAcc = database.contas.find((acc) => {
        return acc.numero === Number(numero_conta)
    })

    if (!findAcc) {
        return res.status(404).json({ mensagem: "Numero da conta não encontrada" })
    }

    let findPswd = database.contas.find((psswd) => {
        return psswd.usuario.senha === senha
    })

    if (!findPswd) {
        return res.status(404).json({ mensagem: "Senha inválida" })
    }

    let transferenciasRecebidas = [{
        data: database.transferencias[0].data,
        numero_conta_origem: database.transferencias[0].numero_conta_destino,
        numero_conta_destino: database.transferencias[0].numero_conta_origem,
        valor: database.transferencias[0].valor
    }]

    let statement = {
        depositos: database.depositos,
        saques: database.saques,
        transferenciasEnviadas: database.transferencias,
        transferenciasRecebidas: transferenciasRecebidas,
        valor: database.transferencias.valor
    }

    return res.status(200).json(statement)
})

module.exports = statement