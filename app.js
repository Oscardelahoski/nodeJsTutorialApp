const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
// const nodeApp = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get("/user/:Name/:age/:sex", (req, res) => {
//   return res.send(`My name is ${req.params.Name}, I am ${req.params.age} years old, My sex is ${req.params.sex}`)
// })

app.get ('/user/:Name/:age/:sex', (req, res) => {
  res.json ({name: req.params.Name, age: req.params.age, sex: req.params.sex });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
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





// nodeApp.get("/home", (req, res) => {
//   return res.send('Hello World')
// })



app.listen (3000, () => console.log ('server listening on port'));


