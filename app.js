const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//========================Controladores da requisição============================
const userController = require('./Controller/userController');
const resetController = require('./Controller/resetController');
const homeController = require('./Controller/HomeController');
const cadastroController = require('./Controller/cadastroController');
const cardapioController = require('./Controller/cardapioController');

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(session({
    secret: '4ndr31',
}));

//===============Middleware de Autenticação===================
// app.use((req, res, next) => {
//     if (!req.session.usuario && req.originalUrl !== '/login' && req.originalUrl !== '/resetSenha' && req.originalUrl !== '/cadastro') {
//         return res.redirect("/login");
//     }
//     if (req.originalUrl === '/login') {
//         res.locals.layout = './layout/default/login';
//     } else if (req.originalUrl === '/resetSenha') {
//         res.locals.layout = './layout/default/resetSenha';
//     } else if (req.originalUrl === '/cadastro') {
//         res.locals.layout = './layout/default/cadastro';
//     } else {
//         res.locals.layout = './layout/default/home';
//     } if (req.originalUrl === '/cardapios') {
//         res.locals.layout = './layout/default/cardapios';
//     }
//     app.set('layout', './layout/default/home');
//     res.locals.layoutVariables = {
//         url: process.env.URL,
//         img: "/images/",
//         style: "/css/",
//         title: 'Cardapios',
//         user: req.session.usuario,
//     };
//     next();
// });

//======================ROTAS==========================
app.get('/home/:querry', homeController.getView );
app.get('/home', homeController.getView);
app.get('/cardapios', cardapioController.getCardapios)
app.get('/cardapio/:id_cardapio', cardapioController.getCardapio);
app.post('/cardapio', cardapioController.addCardapio);
app.get('/cardapio/:query', cardapioController.getCardapios);

app.get('/login', (req, res)=>{
    userController.login(req, res);
});

app.post('/login', async (req, res)=>{
    userController.auth(req, res);
});

app.get('/resetSenha', (req, res)=>{
    resetController.reset(req, res);
});

app.post('/resetSenha', async (req, res) => {
    resetController.resetPassword(req, res);
});

app.get('/cadastro', (req, res)=>{
    res.render('cadastro');
});

app.post('/cadastro', async (req, res) => {
    cadastroController.cadastro(req, res);
});

module.exports = app;