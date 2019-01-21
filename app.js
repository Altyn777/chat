const createError = require('http-errors');
const express = require('express');
path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userRouter = require('./routes/user');

const session = require('express-session');
MongoStore = require('connect-mongo')(session);
mongoose = require('./libs/mongoose');
mongoose_store = new MongoStore({mongooseConnection: mongoose.connection});

log = require('./libs/log')(module);

app = express(); // создается приложение

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug'); // pug - система шаблонизации
app.use(logger('dev')); // выводит запись о том, что за запрос пришел, dev - формат логгирования
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // внутри - ключ

app.use(session({
  secret: "KillerIsJim", // обязат парам - для подпис куки
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  saveUninitialized: false,
  resave: false,
  store: mongoose_store
}));

app.use(function (req, res, next) {
  req.session.numberOfVisits = req.session.numberOfVisits +1 || 1;
  res.send("Visits: " + req.session.numberOfVisits);
});

/*
User = require('./models/user').User;
app.get('/users', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

app.get('/user/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    if (!user) {
      next(createError(404, "User Not Found"));
    }
    res.json(user);
  });
});
*/
app.use(express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*
app.use(function (req, res, next) { // Middleware
  if (req.url =='/') {
    res.end("Hello");
  } else {
    next(); // передать управление следующему Middleware
  }
});
app.use(function (req, res, next) {
  if (req.url =='/forbidden') {
    next(createError("wops, denied")); // передать ош дальше по цепочке - по ум. выводит стек
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
*/
app.use(function(err, req, res, next) { // length - кол-во арг функции; 4 - обработчик ош error handler
  res.locals.message = err.message;
  log.info(res.locals.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // true : false
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;