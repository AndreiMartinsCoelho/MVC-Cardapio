const express = require('express');
const cors = require('cors');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
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

const ejsRoute = require('./router/EjsRouter');
app.use('/ejs', ejsRoute);

module.exports = app, express, expressLayouts, cors;