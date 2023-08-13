const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Home = require('../Controller/TelaHomeController');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.get('/home', (req, res) => {
    app.set("layout", "./layouts/default/home");
    Home.getTelaHome(req, res);
});

module.exports = app, express, expressLayouts;