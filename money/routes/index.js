var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}


module.exports = function(passport){
 
  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
      res.render('index', { message: req.flash('message'), user: req.user});
  });

  router.get('/signin', function(req, res){
    res.render('enter',{message: req.flash('message')});
  });

  router.get('/my', isAuthenticated, function(req, res){
    res.render('cabinet', { user: req.user });
  });

  router.get('/my/put', isAuthenticated, function(req, res){
    res.render('put', { user: req.user });
  });

  router.get('/my/take', isAuthenticated, function(req, res){
    res.render('take', { user: req.user });
  });

  router.get('/my/vklad', isAuthenticated, function(req, res){
    res.render('vklad', { user: req.user });
  });
    
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect("/");
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/my',
    failureRedirect: '/signin',
    failureFlash : true 
  }));
 
  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });
 
  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/my',
    failureRedirect: '/signup',
    failureFlash : true 
  }));
 
  return router;
}
