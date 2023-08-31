const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const userController = require('./Controller/userController');
const resetController = require('./Controller/resetController');
const homeController = require('./Controller/HomeController');

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(session({
    secret: '4ndr31',
}));

app.use((req, res, next) => {
    if (!req.session.usuario && req.originalUrl !== '/login' && req.originalUrl !== '/resetSenha') {
        res.redirect("/login");
    } else {
        if (req.originalUrl === '/login' || req.originalUrl === '/resetSenha') {
            app.set('layout', './layouts/default/login');
            res.locals.layoutVariables = {
                url: process.env.URL,
                img: "/images/",
                style: "/css/",
                title: 'login'
            };
            app.set('layout', './layouts/default/resetSenha');
            res.locals.layoutVariables = {
                url: process.env.URL,
                img: "/images/",
                style: "/css/",
                title: 'reset'
            };
        } else {
            app.set('layout', './layouts/default/home');
            res.locals.layoutVariables = {
                url: process.env.URL,
                img: "/images/",
                style: "/css/",
                title: 'Cardapio'
            };
        }
        next();
    }
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
    app.set('layout', "./layouts/default/resetSenha");
    resetController.reset(req, res);
});

app.put('/resetSenha',(req,res)=>{
    resetController.resetPassword(req, res);
})

module.exports = app, express, expressLayouts, cors, session;

   