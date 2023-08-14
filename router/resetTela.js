const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const TelaReset = require('../Controller/resetTelaController');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.get('/tela', (req, res) => {
    app.set("layout", "./layouts/default/resetSenha");
    TelaReset.getTelaReset(req, res);
});

module.exports = app, express, expressLayouts;