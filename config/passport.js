var LocalStrategy = require('passport-local').Strategy; //requiring strategy for package 'passport-local'
var mongoose = require('mongoose');
// var User = mongoose.model('User'); //require user model || user model contains user schema
var User = require('../models/User');
module.exports = function(passport){
	//serializing user
	passport.serializeUser(function(user,done){
		done(null,user.id);
	});
	//deserializing user
	passport.deserializeUser(function(user,done){
		 User.findById(user, function(err, user) {
            done(err, user);
        });
		});

	//signup strategy


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField : 'password',
		passReqToCallback : true
	},

	function(req,email,password,done){
		process.nextTick(function(){ //functionto wait for the response
			console.log(email, password)
			User.findOne({'email': email}, 
			function(err,user){
				console.log(user,'error',err);
				if(err)
					return done(err);

				if(user){
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				}else{
					var newUser = new User(); 

					newUser.email = email;
					newUser.password = newUser.generateHash(password); //genearting salt password

					//save the new user
					newUser.save(); 
					done(null, newUser);
				}
			});
		})
	}

	));


	//login strategy

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true
	},
	function(req,email,password,done){
		User.findOne({'email': email},
		function(err,user){
			if(err)
				return done(err);
			if(!user){
				return done(null,false,req.flash('loginMessage','User not found'));
			}else if(!user.validPassword(password)){
							return done(null,false,req.flash('loginMessage','password \'t match'));}
							return done(null,user);
				
		});
	}

	));

}