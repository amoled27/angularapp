var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
	name: String,
	status: Boolean
});

mongoose.model('Activity',activitySchema);