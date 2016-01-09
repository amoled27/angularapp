var app = angular.module('formApp', ['ui.router']);

app.factory('activities', ['$http',function($http){
  // service body
  var o = {
  	activities : []
  };
  return o;

    o.getAll = function() {
    return $http.get('/activity').success(function(data){
      angular.copy(data, o.activities);
    });
  };

  	o.create = function(activity){
  		return $http.post('/activity',activity).success(function(data){
  			o.activities.push(data)
  		})
  	}

}]);



app.controller('MainCtrl', [
'$scope',
'activities',
function($scope,activities){
  $scope.activities = activities.activities;

//acctivities added 
$scope.addAct = function(){
	$scope.activities.push({name:$scope.name, status: 0}); //this is just rendering in front
	activities.create({name:$scope.name, status: 0}) // this is inserting in DB which should work but isnt
};

//interested activities set to 1
$scope.actTrue = function(activity){
	activity.status = 1;
}


}]);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('home',{
		url:'/home',
		templateUrl: '/home.html',
		controller:'MainCtrl'
	})
	.state('activity',{
		url: '/activity',
		templateUrl: './views/activity.html',
		// resolve: {
		// 	postPromise : ['activities',function(activities){
		// 		return activities.getAll();
		// 	}]
		// }

	})
	.state('login',{
		url: '/login',
		templateUrl: './views/login.html',

	})
	.state('signup',{
		url: '/signup.html',
		templateUrl: './views/signup.html'

	})
	}])


