var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var OrientoStore = require('connect-oriento')(session);
var bodyParser = require('body-parser');
var db_config = require('./config/configfile/db-mico-config.json');

app.use(bodyParser.urlencoded({ extended : false}));

// app.use(express.methodOverride());

app.use(session({
    secret: 'aeoifja12312!@#%@#adfeas',
    resave: false,
    saveUninitialized: true,
    store: new OrientoStore({server : db_config})
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var feeling = require('./routes/feeling');
var index = require('./routes/index');
var users = require('./routes/users');

app.use('/feeling', feeling);
app.use('/', index);
app.use('/users', users);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
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

module.exports = app;

// app.listen(3003, function() {
//     console.log('connected 3003 port!');
// });


