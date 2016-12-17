'use strict';

angular.module('synonymsEditor.wordsList', ['ngRoute']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/words-list', {
		templateUrl : 'words-list/words-list.html',
		controller : 'WordsListCtrl'
	});
	
	
}]).controller('WordsListCtrl', ['ElasticsearchService', 'SynonymsList', '$log', '$window',
function(ElasticsearchService, SynonymsList, $log, $window) {
	var self = this;
	self.words = SynonymsList.getWordsList();
	self.newWord = '';
	self.synonymsList = SynonymsList.getSynonymsList();

	self.addWord = function() {
		if (self.newWord != '') {
			SynonymsList.addWord(self.newWord);
			self.newWord = '';
		}
	}
	
	//downloading text file
	self.generateTextFileData = function() {
		self.data = '';
		var stemmedWordslist = SynonymsList.getStemmedWordsList();
		var stemmedSynonymsList = SynonymsList.getStemmedSynonymsList();
		stemmedWordslist.forEach(function(word) {
			if(stemmedSynonymsList[word].length > 0){
				self.data = self.data + word;
				stemmedSynonymsList[word].forEach(function(synonym) {
					self.data = self.data + ', ' + synonym;
				});
				self.data = self.data + '\r\n';
			}
		});
		self.blob = new Blob([self.data], {
			type : 'text/plain'
		});
		self.url = $window.URL || $window.webkitURL;
		self.fileUrl = self.url.createObjectURL(self.blob);
	}
}]); 