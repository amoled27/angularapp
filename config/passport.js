var LocalStrategy = require('passport-local').Strategy; //requiring strategy for package 'passport-local'
var mongoose = require('mongoose');
var User = mongoose.model('User'); //require user model || user model contains user schema
var passport = require('passport');

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

//login strategy

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback : true
},
function(req,email,password,done){
	User.findOne({ email: email }, function (err, user) {
		if (err) { 
			return done(err); 
		}
		if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		}
		if (!user.validPassword(password)) {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);
	});
}));
