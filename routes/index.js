var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var Activity = mongoose.model('Activity');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Angular App' });
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
router.post('/signup', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({'email': email}, function (err,user) {      
      if(err) {
        res.json({error : 'Internal error. Please try again'});
        return;
      }

      if(user){
        res.json({error : 'User already exists.'});
        return;
      }else{
        var newUser = new User(); 

        newUser.email = email;
        newUser.password = newUser.generateHash(password); //genearting salt password

      //save the new user
      newUser.save(function (err) {
        if(err) {
          res.json({error : 'Error in creation of user'});
        } else {
          res.json({success : 'User created successfully.'});
        }
      }); 
      
    }
  });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function(err, user, info){
    if(err){ 
      return next(err); 
    }

    if(user){
      return res.json({success : user });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});
   
module.exports = router;
