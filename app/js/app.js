'use strict';

// Declare app level module which depends on filters, and services
angular.module('angularTrello', [
  'ngRoute',
  'angularTrello.filters',
  'angularTrello.services',
  'angularTrello.directives',
  'angularTrello.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main_board.html', controller: 'MainBoardCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
