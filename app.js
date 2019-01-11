createError = require('http-errors');
express = require('express');
path = require('path');
cookieParser = require('cookie-parser');
logger = require('morgan');

indexRouter = require('./routes/index');
usersRouter = require('./routes/users');

log = require('./libs/log')(module);

app = express(); // создается приложение

/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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
*/

app.use(function (req, res, next) { // Middleware
  if (req.url =='/') {
    res.end("Hello");
  } else {
    next(); // передать управление следующему Middleware
  }
});

app.use(function (req, res, next) {
  if (req.url =='/forbidden') {
    next(new Error("wops, denied")); // передать ош дальше по цепочке - по ум. выводит стек
    log.info(Error);
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  if (req.url =='/test') {
    res.end("Test");
  } else {
    next();
  }
});

app.use(function (req, res) { // обработчик
  res.send(404, "Page Not Found Sorry"); // замыкает цепочку
});

app.use(function (err, req, res, next) { // length - кол-во арг функции; 4 - обработчик ош error handler
  res.locals.message = err.message;
  console.log(res.locals.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // true : false
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;