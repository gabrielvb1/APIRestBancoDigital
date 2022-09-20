const express = require('express');
const routes = express();
const showAcc = require('../src/controllers/showAcc');
const createAcc = require('../src/controllers/createAcc');
const updateAcc = require('../src/controllers/updateAcc')
const deleteAcc = require('../src/controllers/deleteAcc');
const deposit = require('../src/controllers/deposit');
const withdraw = require('../src/controllers/withdraw');
const transfer = require('../src/controllers/transfer');
const balance = require('../src/controllers/balance');
const statement = require('../src/controllers/statement');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

routes.get('/contas', showAcc);
routes.post('/contas', jsonParser, createAcc.createAcc);
routes.put('/contas/:numeroConta/usuario', jsonParser, updateAcc);
routes.delete('/contas/:numeroConta', deleteAcc);
routes.post('/transacoes/depositar', jsonParser, deposit);
routes.post('/transacoes/sacar', jsonParser, withdraw);
routes.post('/transacoes/transferir', jsonParser, transfer);
routes.get('/contas/saldo', balance);
routes.get('/contas/extrato', statement);


module.exports = routes;