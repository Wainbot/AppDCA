var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    res.render('admin/index', { user: req.session.user });
});

router.get('/users', function(req, res) {
    res.render('admin/users', { user: req.session.user })
});

router.get('/news', function(req, res) {
    res.render('admin/news', { user: req.session.user })
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
