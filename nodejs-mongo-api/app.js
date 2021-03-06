var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// JSONWebToken
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');

var config = require('config');
//const port = config.get('static.port');
const port = 3001;
var app = express();
app.use(cors());  //CORS Enable for all route

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//index Base url call
app.get('/', function (req, res) {
  res.send("Base URL is called");
});

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(500).send({
    errorMessage: res.locals.message
  })
});

//for run the server on port
app.listen(port, (reqq, res) => {
  console.log("server is running on " + port + " port");
})
module.exports = app;