//import useful node libraries using require()
var express = require('express'); //creates an express applicaiton
//core library used for parshing files and directory paths
var path = require('path'); //also required for express
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//import mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//require modules from our /routes direcotry for URL paths
var index = require('./routes/index');
var users = require('./routes/users');

//create an app object using our imported express module
var app = express();

//use the newly created app object to setup view engine
app.set('views', path.join(__dirname, 'views'));

//specify the template library engine 'pug'
app.set('view engine', 'pug');

//set of functions call app.use() to add the middleware libraries into the request handling chain.
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//we use the Express.static middleware to get Express to serve all the static files in the directory /public in the project root.
app.use(express.static(path.join(__dirname, 'public')));

//add in route handlers for route urls
app.use('/', index);
app.use('/users', users);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

//It's now fully configured, this last part is what allows it to be imported by /bin/www
module.exports = app;
