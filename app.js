const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const userController = require('./Controller/userController');

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(session({
    secret: '4ndr31',
}));

// app.use((req, res, next) => {
//     if (!req.session.user) {
//         res.locals.user = req.session.user;
//         if(req.originalUrl == '/login' || req.originalUrl == '/auth'){
//             app.set('layout', './layouts/default/login');
//             res.locals.layout = './layouts/default/login';
//             next();
//         }else{
//             res.redirect('/login');
//         }
//     }else{
//         app.set('layout', './layouts/default/home');
//         res.locals.layout = './layouts/default/home';
//         res.locals.user = req.session.user;
//         next();
//     }
// });

//Rotas da aplicação
app.get('/login', (req, res)=>{
    app.set('layout', "./layouts/default/login");
    userController.login(req, res);
});

app.post('/login', (req, res)=>{
    userController.auth(req, res);
});

module.exports = app, express, expressLayouts, cors, session;