'use strict';

angular.module('journalDirective', ['angular-medium-editor'])

.controller('mainController', ['$scope', function($scope) {

  $scope.text =
  '<p>Please enter your story here.</p>';

}]);