const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/routes');
const sequelize = require('./util/db');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

sequelize.sync().then(() => {
    app.listen(8080);
}).catch(err => console.log(err))
