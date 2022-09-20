const database = require('../database');

const showAcc = ((req, res) => {

    return res.status(200).json(database);

})

module.exports = showAcc;