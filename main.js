//STEP1 : 서버 기본 
var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(3000, function() {
    console.log('Example App listening on port 3000');
});


//STEP2 : 라우터 사용
var user = require('./routes/user');
app.use('/user', user);

// app.get('/user/:id', function(req, res) {
//     res.send('Received a GET request, param:' + req.params.id);
// });

// app.post('/user', function(req, res) {
//     res.json({ success: true })
// });

// app.put('/user', function(req, res) {
//     res.status(400).json({ message: 'Hey, you. Bad Request!' });
// });

// app.delete('/user', function(req, res) {
//     res.send('Received a DELETE request');
// });

//STEP3 : 미들웨어 추가
var myLogger = function (req, res, next) {
    console.log(req.url);
    next();
};
app.use(myLogger);


var morgan = require('morgan');
app.use(morgan('dev'));

var bodyParser= require('body-parser');
app.use(bodyParser.json());


//STEP4 : mongoDB 연동을 위한 미들웨어 추가

// import mongoose from 'mongoose';
// import session from 'express-session';
var mongoose = require('mongoose');
var session = require('express-session');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost:27017/cokkiri');
// mongoose.connect('mongodb://username:password@host:port/database=');
//-> for 팀원 : mongoDB를 설치하고 start 한 후 접속해야합니다

app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));


//STEP5 : mongoDB에 데이터 생성/조회/삭제/변경

var volenteer = require('./routes/volenteer');
app.use('/api/volenteer', volenteer);