app.controller('journalCtrl', function($scope, $http) {
		$scope.formData = {};
		// GET ==============
		// When landing on the page, get all todos and show them
		// Use the service to get all the todos

		$scope.placeholder =
        '<p>Please enter your story here.</p>';

	$scope.createJournal = function() {

		alert("Hey!");
		var notedata = document.getElementById('editForm').innerHTML;
		console.log(notedata);

		var dat_1 = {"text": notedata};
		var param = JSON.stringify(dat_1);
		alert(param);
		$http.post('/api/journal', param)
			.success(function(data) {
				$scope.formData = {};
				$scope.journals = data;
				console.log(data);
			})
			.error(function(data) {})
	};
	

	});