'use strict';

angular.module('synonymsEditor.synonymsList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:word/synonyms', {
    templateUrl: 'synonyms-list/synonyms-list.html',
    controller: 'synonymsListCtrl'
  });
}])

.controller('synonymsListCtrl', ['$routeParams', 'SynonymsList', '$log', '$location', function($routeParams, SynonymsList, $log, $location) {
	var self = this;
	self.word = $routeParams.word;
		self.synonymsList = SynonymsList.getSynonymsList();
		self.newSynonym ='';
		
		self.addSynonym = function(){
			if(self.newSynonym!=''){
				SynonymsList.addSynonym(self.word, self.newSynonym);
			}
			self.newSynonym='';
		}
		
		self.removeWord = function(){
			SynonymsList.removeWord(self.word);
			$location.path('/#!/words-list');
		}
		
		self.removeSynonym = function(synonym){
			SynonymsList.removeSynonym(self.word, synonym);
		}
}]);