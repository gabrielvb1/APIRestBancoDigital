const database = require('../database');
function validate (nome, cpf, data_nascimento, telefone, email, senha) {
    
    if (!nome) {
        return "Nome não informado"
    };

    if (!cpf) {
        return "Cpf não informado"
    };

    if (!data_nascimento) {
        return "Data de nascimento não informada"
    };

    if (!telefone) {
        return "Telefone não informado"
    };

    if (!email) {
        return "Email não informado"
    };

    if (!senha) {
        return "Senha não informada"
    }
}

const createAcc = ((req, res) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    let numero = database.contas.length + 1;

    if(!nome||!cpf||!data_nascimento||!telefone||!email||!senha) {
     return res.status(404).json({mensagem:validate(nome, cpf, data_nascimento, telefone, email, senha)})
    }
    
    let newAcc = {
        numero: numero,
        saldo: 0,
        usuario: {
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            telefone: telefone,
            email: email,
            senha: senha
        }
    };

    for (let data of database.contas) {
        if(data.usuario.email === email || data.usuario.cpf === cpf) {
            return res.status(403).json({mensagem: "Já existe uma conta com o cpf ou e-mail informado!"})
        }
   };
    database.contas.push(newAcc);
    res.status(200).json()
});


module.exports = {createAcc, validate}