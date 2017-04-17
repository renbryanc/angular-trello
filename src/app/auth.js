const angular = require('angular');

console.log('auth');
angular.module('angularTrello.auth', ['firebase']).factory('Auth', [
  '$firebaseAuth', ($firebaseAuth) => {
    // TODO figure out why $firebaseAuth() is throwing.
    return true;
  }
]);
