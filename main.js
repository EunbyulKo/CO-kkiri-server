var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(3000, function() {
    console.log('Example App listening on port 3000');
});

var morgan = require('morgan');
app.use(morgan('dev'));

var bodyParser= require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');
var session = require('express-session');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost:27017/cokkiri');

app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

var volenteer = require('./routes/volenteer');
app.use('/api/volenteer', volenteer);

module.exports = app;