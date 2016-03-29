var express = require('express');
var router  = express.Router();
var mysql   = require('mysql');
var connexionParams = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'dca',
    port     : 3306
};

router.get('/', function(req, res) {
    res.render('admin/index', { user: req.session.user });
});

router.get('/users', function(req, res) {
    res.render('admin/users', { user: req.session.user })
});

router.get('/news', function(req, res) {
    res.render('admin/news', { user: req.session.user })
});

router.post('/news', function(req, res) {
    var connexion = mysql.createConnection(connexionParams);
    connexion.connect();
    connexion.query(
        "INSERT INTO dca_news (title, content, date) VALUES ('"+req.body.title+"', '"+req.body.content+"', '"+new Date()+"')"
        , req
        , function(err, rows) {
            res.render("index", { user: req.session.user });
        });
    connexion.end();
});

router.get('/schedule', function(req, res) {
    res.render('admin/schedule', { user: req.session.user })
});

router.get('/profile', function(req, res) {
    res.render('admin/profile', { user: req.session.user })
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
