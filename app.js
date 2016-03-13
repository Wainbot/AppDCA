var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var admin = require('./routes/admin/index');
var app = express();

// SYSTEM VIEW
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// CONFIG
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(session({ secret: 'dcateam', resave: true, saveUninitialized: true }));

app.use(express.static(path.join(__dirname, 'public')));

// ROUTE ADMIN PRIVATE
app.use(function (req, res, next) {
    console.log("Debut private : session : ", req.session.user);
    console.log("Debut private : path : ", req.path.split("/")[1]);
    if (req.path.split("/")[1] == "admin") {
        if (typeof req.session.user != 'undefined' && req.session.user['uid'] != 'undefined' && req.session.user['uid'] != null) {
            next();
        } else {
            res.redirect("/login");
        }
    } else {
        next();
    }
});

// ROUTES PUBLIC
app.use('/', routes);
// ROUTES PRIVATE
app.use('/admin', admin);

// ERROR 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// DETECT ENV FOR ERROR MESSAGE
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
