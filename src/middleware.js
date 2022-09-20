const database = require('./database');

const checkPasswd = ((req, res, next)=>{
    let { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(404).json({mensagem: "Senha não informada"});
    }

    if (senha_banco !== "Cubos123Bank") {
        return res.status(401).json({mensagem: "A senha do banco informada é inválida!"});
    }

    next()
})

module.exports = {
checkPasswd
}