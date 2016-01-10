var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Activity = require('../models/Activity');
var passport = require('passport');
// var Activity = mongoose.model('Activity');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/activity', function(req, res) {
  Activity.find(function(err,activity){
  	if(err){res.send(err);}
  	res.json(activity);
  })
});
router.post('/activity', function(req, res) {
   	var activity = new Activity(req.body);

   	activity.save(function(err, activity){
   		if(err){res.send(err);}
   			res.json(activity);
   	})
});


router.param('activity', function(req, res, next, id) {
  var query = Activity.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!activity) { return next(new Error('can\'t find post')); }

    req.activity = activity;
    return next();
  });
});

router.get('/activity/:activity',function(req,res){
	res.json(req.post);
});

router.get('/login',function(req,res){
		res.render('login')
	});
router.get('/signup' ,function(req,res){
		res.render('signup');
	});
router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup' // redirect back to the signup page if there is an error
     
    }));

router.post('/login',passport.authenticate('local-login',{
      	successRedirect : '/profile',
      	failureRedirect : '/login'
      }));

    



module.exports = router;
