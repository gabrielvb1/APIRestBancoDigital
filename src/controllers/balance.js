let database = require('../database');

const balance = ((req, res) => {
    let { numero_conta, senha } = req.query;

    let findAcc = database.contas.find((acc) => {
        return acc.numero === Number(numero_conta)
    })

    if (!findAcc) {
        return res.status(404).json({ mensagem: "Numero da conta não encontrada" })
    }

    let findPswd = database.contas.find((psswd)=>{
        return psswd.usuario.senha === senha
    })

    if(!findPswd) {
        return res.status(404).json({ mensagem: "Senha inválida" })
    }

    return res.status(200).json({saldo: findAcc.saldo})
})

module.exports = balance