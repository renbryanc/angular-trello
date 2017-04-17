const angular = require('angular');
const services = require('./services');

angular.module('angularTrello.controllers', [
      'angularTrello.services'
    ])
  .controller('MainBoardController',
  ['$scope', 'ColumnService', 'Column', 'Card', function($scope, columns, Column, Card) {
    $scope.columns = columns.getAllColumns();

    // Test cards.
    columns.add(new Column('testing 1', [new Card('Card 1', 'Description'), new Card('Card 3', 'Description')]));
    columns.add(new Column('testing 2', [new Card('Card 2', 'Description')]));
  }])
  .controller('ColumnController', ['$scope', ($scope) => {}]);
