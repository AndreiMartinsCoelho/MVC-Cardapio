const app = require('./app');
app.use (function (req, res, next) {
    next();
});

// Define a porta do servidor e o inicia
let port = process.env.PORT || 3000;

// Inicia o servidor
app.listen(port);
console.log("Iniciado o servidor na porta " + port);