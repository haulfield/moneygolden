var express = require('express');
var router = express.Router();
var Put = require("../models/account")
var News = require("../models/news")
var User = require("../models/user")
var Static = require("../models/static")
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}


module.exports = function(passport){
    
    /* GET login page. */
    router.get('/', function(req, res) {
        
        // Display the Login page with any flash message, if any
        var inv = Math.floor(Math.random() * 5) + 1;
        var pt = Math.floor(Math.random() * 20000) + 1;
        var tk = Math.floor(Math.random() * 3000) + 1;
        Static.findOneAndUpdate({}, {$inc:{investor:inv, put: pt, take:tk}},function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        });
        Static.find({}, function(err, stats){
            News.find({}, function(err, newss){
                console.log(stats[0].investor);
                res.render('index', { message: req.flash('message'), user: req.user, news: newss, investor: parseInt(stats[0].investor), put: stats[0].put, take: stats[0].take});
            }).limit(2);
        });

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
    
    router.post('/my/put', isAuthenticated, function(req, res){
        res.render('put', { user: req.user });
    });
    
    router.get('/my/take', isAuthenticated, function(req, res){
        res.render('take', { user: req.user });
    });
    
    router.get('/my/success', isAuthenticated, function(req, res){
        req.flash('message', "success");
        res.redirect('/my') ;
    });

    router.get('/my/oops', isAuthenticated, function(req, res){
        req.flash('message', "fail");
        res.redirect('/my') ;
    });

    router.get('/my/wait', isAuthenticated, function(req, res){
        req.flash('message', "wait");
        res.redirect('/my') ;
    });
    
    router.post('/my/status', isAuthenticated, function(req, res){
        console.log("ANTIHAYP");
        var secret_key="I7fBuUGbIjBtqWn9";
        var ik_shop_id="587d41b33c1eaf0b318b456f";
        if(ik_shop_id==req.param('ik_shop_id') && req.param('ik_payment_state') == "success"){
            myamount = req.param("ik_payment_amount");
            var putting = new Put({
                user: req.user,
                amount: myamount
            });
            putting.save(function(err){
                if(err) res.send(404);
            })
            User.find({username: req.user.username}, function(err, usr){
                if(err) res.send(404);
                usr.money += myamount;
                usr.save(function(err){
                    if(err) res.send(404);
                });
            });
            res.send(200);
        }else
            res.send(404)
        req.flash('message', "alo");
        
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

    router.get('/news/', function(req, res){
        News.find({}, function(err, newss){
            res.render('allnews', {news: newss});
        });
    });

    router.get('/news/:name',  function(req, res){
        console.log(req.params.name);
        News.findOne({name: req.params.name}, function(err, newww){
            res.render('newsone', {neww: newww}); 
        });
    });

    router.post('/news/:id/update', isAuthenticated, function(req, res){
        
    });

    router.post('/news/create/', isAuthenticated, function(req, res){
        
    });
    
    return router;
}
