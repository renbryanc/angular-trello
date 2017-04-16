const angular = require('angular');
const ngRoute = require('angular-route');

const controllers = require('./controllers');
const directives = require('./directives');
const filters = require('./filters');
const services = require('./services');

angular.module('angularTrello', [
  ngRoute,
  'angularTrello.filters',
  'angularTrello.services',
  'angularTrello.directives',
  'angularTrello.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/mainBoard.html', controller: 'MainBoardCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
