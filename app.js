const express = require('express')
const path = require('path')
const favicon = require('static-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const load = require('express-load')
const mongoose = require('mongoose')
const flash = require('express-flash')
const moment = require('moment')
const validator = require( 'express-validator')

//conexao com mongo
mongoose.connect('mongodb://localhost/apinode', function(err){
    if(err){
        console.log("Erro de conexão com o banco de dados: "+ err)
    }else{
        console.log("Conexão com banco de dados efetuada com sucesso!")
    }
})



const app = express();

//middleware
const erros = require('./middleware/erros');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(validator());
app.use(cookieParser());
app.use(session({ secret: '81199006mt' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


//helpers
app.use(function(req,res,next) {
    res.locals.session = req.session.usuario;
    res.locals.isLogged = req.session.usuario ? true : false;
    res.locals.moment = moment
    next()
    
})

//controller das rotas do sistema
load('models').then('controllers').then('routes').into(app);

//middleware
app.use(erros.notfound);
app.use(erros.serverError);

app.listen(3000, function() {
    console.log('Server startado a porta 3000');
});
