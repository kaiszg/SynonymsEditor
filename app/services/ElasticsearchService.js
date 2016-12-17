var app = angular.module('synonymsEditor');

app.factory('ElasticsearchService', ['$http', '$log',
function($http, $log) {
	self = this;
	self.result='';
	var getStemmedWord = function(word) {
		word = word + '';
		data = {
				'text' : word,
				'analyzer' : 'german'
			}
		return $http.post('http://localhost:9200/_analyze', data);
	};
	return {
		getStemmedWord : getStemmedWord
	}
}])
