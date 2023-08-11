const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

module.exports = app;