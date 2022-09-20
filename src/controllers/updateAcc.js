const database = require('../database');
const { validate } = require('../controllers/createAcc')

const updateAcc = ((req, res) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    let { numeroConta } = req.params;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(404).json({ mensagem: validate(nome, cpf, data_nascimento, telefone, email, senha) })
    }
    let findAcc = database.contas.find((acc) => {
        return acc.numero === Number(numeroConta)
    })

    if (!findAcc) {
        return res.status(404).json({ mensagem: "Numero da conta não-válido" })
    }

    for (let data of database.contas) {
        if (data.usuario.email === email || data.usuario.cpf === cpf) {
            return res.status(403).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" })
        }
    }

    findAcc.usuario.nome = nome;
    findAcc.usuario.cpf = cpf;
    findAcc.usuario.data_nascimento = data_nascimento;
    findAcc.usuario.telefone = telefone;
    findAcc.usuario.email = email;
    findAcc.usuario.senha = senha;
    return res.status(200).json()


});

module.exports = updateAcc