const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const TelaLogin = require('../Controller/TelaLoginController');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.get('/login', (req, res) => {
    app.set("layout", "./layouts/default/login");
    TelaLogin.getTelaLogin(req, res);
});

module.exports = app, express, expressLayouts;