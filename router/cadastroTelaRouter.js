const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const TelaCadastro = require('../Controller/TelaCadastroController');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.get('/', (req, res) => {
    app.set("layout", "./layouts/default/cadastroTela");
    TelaCadastro.getTelaCad(req, res);
});

module.exports = app, express, expressLayouts;