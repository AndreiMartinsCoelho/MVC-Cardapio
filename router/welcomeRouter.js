const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const TelaWelcome = require('../Controller/TelaWelcomeController');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.get('/welcome', (req, res) => {
    app.set("layout", "./layouts/default/welcome");
    TelaWelcome.getTelaWelcome(req, res);
});

module.exports = app, express, expressLayouts;