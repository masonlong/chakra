'use strict'
app.controller('homeCtrl', function($scope, $location) {
		$scope.home = "This is the homepage";
		$scope.menuClass = function(page) {
    		var current = $location.path().substring(1);
   			return page === current ? "active" : "";
  		};
	});

app.controller('journalCtrl', ['$scope', function($scope) {

  $scope.text =
  '<p>Please enter your story here.</p>';

}]);