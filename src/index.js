const express = require('express');
const app = express();
const routes = require('./routes');
const middleware = require('./middleware');
app.use(middleware.checkPasswd)
app.use(routes)
app.use(express.json());

app.listen(3000)

