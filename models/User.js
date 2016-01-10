var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email : {type: String, lowercase: true, unique: true},
	password: String
});

//methods
//generating hashed pasword
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.password)
}


mongoose.model('User', userSchema);