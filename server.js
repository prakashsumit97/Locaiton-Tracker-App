var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    config = require('./config/database'),
    session = require('express-session'),
    morgan = require('morgan'),
    jwt = require('jwt-simple');

// log to console
app.use(morgan('dev'));


app.use(bodyParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 30 * 30000
    },
    rolling: true
}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


var index = require('./app/routes/routes');
app.use('/', index);


// connect to database
mongoose.connect(config.database);

var host = process.env.APP_HOST || 'localhost';
var port = process.env.APP_PORT || '3000';

app.listen(3000, function () {
    console.log('App is listening on port: ' + port);
});
