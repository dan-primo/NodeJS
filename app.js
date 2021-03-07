const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //aceita apenas dados simples
app.use(bodyParser.json()); //json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') //Aceita todos
    // res.header('Access-Control-Allow-Origin', 'http://servidorespecifico.com')
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// Tratativa de erros para rotas não encontradas
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            mensagem: error.message
        }
    });
});

module.exports = app;