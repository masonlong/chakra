angular.module('journalService', [])

	//super simple service 
	//each function returns a promise object
	.factory('Journal', function($http) {
		return {
			get : function() {
				return $http.get('/api/journal');
			},
			create : function(journalData) {
				return $http.post('/api/journal', journalData);
			},
			delete : function(id) {
				return $http.delete('/api/journal/' + id);
			}
		}
	});