var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var Activity = require('../models/Activity');
var Activity = mongoose.model('Activity');

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
module.exports = router;