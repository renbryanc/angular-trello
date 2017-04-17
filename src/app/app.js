const angular = require('angular');
const ngRoute = require('angular-route');
const fbApp = require('./firebaseApp');

const auth = require('./auth');
const controllers = require('./controllers');
const directives = require('./directives');
const filters = require('./filters');
const services = require('./services');

angular
    .module('angularTrello',
            [
              ngRoute, 'firebase', 'angularTrello.filters',
              'angularTrello.services', 'angularTrello.directives',
              'angularTrello.auth', 'angularTrello.controllers'
            ])
    .run([
      '$rootScope', '$location',
      ($rootScope, $location) => {
        $rootScope.$on('$routeChangeError', (event, next, previous, error) => {
          console.log('bleep');
          console.log(event);
          console.log(error);
          if (error === 'AUTH_REQUIRED') {
            console.log('bloop');
            $location.path('/');
          }
        });
      }
    ])
    .config([
      '$routeProvider',
      ($routeProvider) => {
        $routeProvider.when('/', {
          templateUrl: 'partials/mainBoard.html',
          controller: 'MainBoardController',
         /* resolve :
              {'currentAuth': ['Auth', (Auth) => Auth.$waitForSignIn()]}*/
        });
        $routeProvider.otherwise({redirectTo : '/'});
      }
    ]);
