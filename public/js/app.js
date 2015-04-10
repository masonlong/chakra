var app = angular.module('mvCore', ['ngRoute', 'angular-medium-editor']);
app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'homeCtrl',
			templateUrl: 'views/home.html'
		})
		.when('/journal', {
			controller: 'journalCtrl',
			templateUrl: 'views/journal.html'
		})
		.when('/organize', {
			controller: 'todoCtrl',
			templateUrl: 'views/orgList.html'
		})
		.when('/calendar', {
			controller: 'calendarCtrl',
			templateUrl: 'views/calendar.html'
		})
		.when('/people', {
			controller: 'peopleCtrl',
			templateUrl: 'views/people.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});
