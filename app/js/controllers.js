'use strict';

/* Controllers */

angular.module('angularTrello.controllers', [])
  .controller('MainBoardCtrl', ['$scope', function($scope) {
    $scope.columns = [];

    $scope.addColumn = function(name) {
      $scope.columns.push({name: name, cards: []});
    };

    var createCard = function(name, description) {
      return {name: name, description: description};
    };

    $scope.addCard = function(columnId, card) {
      var col = $scope.columns[columnId];
      col.cards.push(card);
    };

    $scope.deleteCard = function(cards, index) {
      delete cards[index];
    };

    $scope.addColumn("Column 1");
    $scope.addCard(0, createCard("Card 1", "Fix up the css!"));
    $scope.addCard(0, createCard("Card 2", "Add some ids!"));
    $scope.addColumn("Column 2");
    $scope.addCard(1, createCard("Card 3", "Write some tests!"));
  }])
  .controller('ColumnController', ['$scope', function($scope) {
    $scope.$on('draggable-dropped', function(e, elm, card) {

    });
  }]);
