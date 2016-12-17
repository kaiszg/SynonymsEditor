'use strict';

// Declare app level module which depends on views, and components
angular.module('synonymsEditor', [
  'ngRoute',
  'synonymsEditor.wordsList',
  'synonymsEditor.synonymsList',
  'synonymsEditor.version'
]).
config(['$locationProvider', '$routeProvider', '$compileProvider', function($locationProvider, $routeProvider, $compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|blob|):/);
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/words-list'});
}]);
