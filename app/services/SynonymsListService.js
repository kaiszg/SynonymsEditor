var app = angular.module('synonymsEditor');

app.factory('SynonymsList', ['ElasticsearchService', '$log', function(ElasticsearchService, $log) {
	var synonymsList = [];
	var wordsList = [];
	
	var stemmedSynonymsList =[];
	var stemmedWordsList = [];
	
	return {
		addWord: addWord,
		addSynonym: addSynonym,
		getSynonymsList: getSynonymsList,
		getWordsList: getWordsList,
		getStemmedSynonymsList : getStemmedSynonymsList,
		getStemmedWordsList: getStemmedWordsList,
		getStemmedWord: getStemmedWord,
		removeWord: removeWord,
		removeSynonym: removeSynonym
	};
	
	function addWord(word){
		wordsList.push(word);
		synonymsList[word] = [];
		ElasticsearchService.getStemmedWord(word).then(function(response){
			stemmedWordsList.push(response.data.tokens[0].token);
			stemmedSynonymsList[response.data.tokens[0].token] = [];
		});
	}
	
	function addSynonym(word, synonym){
		synonymsList[word].push(synonym);
		var position = wordsList.indexOf(word);
		ElasticsearchService.getStemmedWord(synonym).then(function(response){
			stemmedSynonymsList[stemmedWordsList[position]].push(response.data.tokens[0].token);
		});
	}
	
	function getStemmedSynonymsList(){
		return stemmedSynonymsList;
	}
	
	function getStemmedWordsList(){
		return stemmedWordsList;
	}
	
	function getSynonymsList(){
		return synonymsList;
	}
	
	function getWordsList(){
		return wordsList;
	}
	
	function getStemmedWord(word){
		var position = wordsList.indexOf(word);
		return stemmedWordsList[position];
	}
	
	function removeWord(word){
		var position = wordsList.indexOf(word);
		if(position > -1){
			wordsList.splice(position, 1);
			synonymsList.splice(position, 1);
			stemmedSynonymsList.splice(position, 1);
			stemmedWordsList.splice(position, 1);
		}
		else{
			$log.error("Word not found!");
		}
	}
	
	function removeSynonym(word, synonym){
		var posWord = wordsList.indexOf(word);
		var posSynonym = synonymsList[word].indexOf(synonym);
		var stemmedWord = stemmedWordsList[posWord];
		if((posSynonym > -1)&&(posWord > -1)){
			synonymsList[word].splice(posSynonym, 1);
			stemmedSynonymsList[stemmedWord].splice(posSynonym, 1);
		}
		else{
			$log.error("Synonym not found!");
		}
	}
}]);