const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const sessionInstance = require("./app-config/session");
// const protect = require("./app-config/protect");
const socket = require('socket.io');
const http = require('http');
// const sessionInstance = require('./app-config/session');

if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}
const testRouter = require('./routes/tests');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const gameRouter = require('./routes/games');
const accountRouter = require('./routes/Accounts');
const joinSessionRouter = require('./routes/joinSession');
const userDoesntExistRouter = require('./routes/userDoesntExist');


const registrationRouter = require('./routes/registration');
const joinSession = require('./routes/session');
// const Games  = require('./public/javascripts/Server/Games');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname,'models')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(sessionInstance);
// app.use(sessionInstance);


const server = http.createServer(app);

const io = socket(server);

// console.log(io);



// server.on('error',(err) => {
//   console.log(err);
// });

function getAppInfo() {
  return[server,io,app];
}




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tests', testRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/games', gameRouter);
app.use('/registration', registrationRouter);
app.use('/joinSession', joinSessionRouter);
app.use('/Accounts', accountRouter);
app.use('/userDoesntExist', userDoesntExistRouter);



// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
