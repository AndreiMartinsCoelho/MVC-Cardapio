const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const userController = require('./Controller/userController');
const resetController = require('./Controller/resetController');
const homeController = require('./Controller/HomeController');
const cadastroController = require('./Controller/cadastroController');

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(session({
    secret: '4ndr31',
}));

// Middleware de Autenticação
app.use((req, res, next) => {
    if (!req.session.usuario && req.originalUrl !== '/login' && req.originalUrl !== '/resetSenha' && req.originalUrl !== '/cadastro') {
        return res.redirect("/login");
    }
    
    if (req.originalUrl === '/login') {
        res.locals.layout = './layouts/default/login';
    } else if (req.originalUrl === '/resetSenha') {
        res.locals.layout = './layouts/default/resetSenha';
    } else if (req.originalUrl === '/cadastro') {
        res.locals.layout = './layouts/default/cadastro';
    } else {
        res.locals.layout = './layouts/default/home';
    }
    
    res.locals.layoutVariables = {
        url: process.env.URL,
        img: "/images/",
        style: "/css/",
        title: 'Cardapio'
    };
    
    next();
});

//======================ROTAS==========================
app.get('/home/:querry', homeController.getView );
app.get('/home', homeController.getView);

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