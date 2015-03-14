angular.module('journalController', []) 

	.controller('mainJournalController', function($scope, $http, Journal) {
		$scope.formData = {};
		// GET ==============
		// When landing on the page, get all todos and show them
		// Use the service to get all the todos
		Journal.get()
			.success(function(data) {
				console.log(data)
			});
			var editor = new MediumEditor('.editable', {
			    anchorInputPlaceholder: 'Type a link',
			    buttons: ['bold', 'italic', 'quote'],
			    diffLeft: 25,
			    diffTop: 10,
			    firstHeader: 'h1',
			    secondHeader: 'h2',
			    delay: 1000,
			    targetBlank: true
		    });

		$scope.createJournal = function() {
			// Validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			//People can't just hold enter to keep adding the same to-do anymore
			if (!$.isEmptyObject($scope.formData)) {
				console.log($scope.formData);
				// call the create function from the service (returns a promise object)
				Journal.create($scope.formData)

					// If successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.formData = {}; // clear the form sco our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};
	});