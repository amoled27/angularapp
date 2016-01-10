var mongoose = require('mongoose');
require('../models/Activity');
require('../models/User')

mongoose.connect('mongodb://localhost/tourism');

var db = mongoose.connection;

db.on('error',function(){
	console.error('DB Connection Error')
});

db.once('open',function(){
	console.log('DB Connection Successful')
});