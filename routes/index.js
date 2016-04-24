var express         = require('express');
var router          = express.Router();
var mysql           = require('mysql');
var connexionParams = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'dca',
    port     : 3306
};

router.get('/', function (req, res) {
    function resizeString (value, taille) {
        if (value.length > taille) {
            var result = "";
            for (var i = 0; i < (taille - 3); i++) {
                result += value[i];
            }
            result += "...";
            return result;
        } else {
            return value;
        }
    }

    var connexion = mysql.createConnection(connexionParams, function() {
        res.render("index", { user: req.session.user, error: "Problème de connexion à la base de données" })
    });
    connexion.connect();
    connexion.query(
        "SELECT * FROM dca_news ORDER BY date DESC LIMIT 6"
        , req
        , function(err, rows) {
            if (rows.length > 0) {
                rows.forEach(function(value) {
                    value.content = resizeString(value.content, 100);
                });
            }
            res.render("index", { user: req.session.user, news: rows });
        });
    connexion.end();
});

router.get('/login', function (req, res) {
    res.render("login");
});

router.post('/login', function (req, res) {
    var connexion = mysql.createConnection(connexionParams, function() {
        res.render("login", { error: "Problème de connexion à la base de données" })
    });
    connexion.connect();
    connexion.query(
        "SELECT uid, username, level, email FROM dca_users WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "'"
        , req
        , function(err, rows) {
            if (rows.length > 0) {
                req.session.user = rows[0];
                res.redirect("/admin/");
            } else {
                res.render("login", { error: "Pseudo ou mot de passe incorrecte" });
            }
        });
    connexion.end();
});

router.get('/news/:id', function (req, res) {
    if (!isNaN(req.params.id)) {
        var connexion = mysql.createConnection(connexionParams);
        connexion.connect();
        connexion.query(
            "SELECT * FROM dca_news WHERE uid = " + req.params.id
            , req
            , function (err, rows) {
                if (rows.length > 0) {
                    res.render("news", { user: req.session.user, news: rows[0] });
                } else {
                    res.render("login", {error: "Pseudo ou mot de passe incorrecte"});
                }
            });
        connexion.end();
    } else {
        res.redirect('/');
    }
});

module.exports = router;
