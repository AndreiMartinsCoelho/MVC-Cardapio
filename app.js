const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({secret:'4ndr31'}));
app.use(expressLayouts);

//Conexão com o banco de dados
const{
    DB_HOST,
    DB_USER,
    DB_DATABASE,
} = require('./config');

//rotas importantes para funcionar a aplicação
const router = require('./router/route');
app.use(router);

const userRoute = require('./router/userRouter');
app.use('/user', userRoute);

const reset = require('./router/resetSenha');
app.use('/reset', reset);

const ejsRoute = require('./router/EjsRouter');
app.use('/ejs', ejsRoute);

const welcomeRoute = require('./router/welcomeRouter');
app.use('/ejs', welcomeRoute);

const homeRoute = require('./router/homeRouter');
app.use('/ejs', homeRoute);

const resetTela = require('./router/resetTela');
app.use('/reset', resetTela);

const cadastroTela = require('./router/cadastroTelaRouter');
app.use('/cadastro', cadastroTela);

app.use((req, res, next) => {
    if(!req.session.user){
        
    }
});

module.exports = app, express, expressLayouts, cors, session;