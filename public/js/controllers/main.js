angular.module('todoController', [])

	.controller('mainController', function($scope, $http, Todos) {
		$scope.formData = {};

		// GET ==============
		// When landing on the page, get all todos and show them
		// Use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
			});

		// CREATE ============
		// When submitting the add form, send the text to the node API
		$scope.createTodo = function() {
			// Validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			//People can't just hold enter to keep adding the same to-do anymore

			if (!$.isEmptyObject($scope.formData)) {
				console.log($scope.formData);
				// call the create function from the service (returns a promise object)
				Todos.create($scope.formData)

					// If successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.formData = {}; // clear the form sco our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==============
		// Delete a todo after checking it
		$scope.deleteTodo = function(id) {
			Todos.delete(id)
				// If successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.todos = data; // assign our new list of todos
				});
		};
	});