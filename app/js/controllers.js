'use strict';

/* Controllers */

angular.module('angularTrello.controllers', [])
  .controller('MainBoardCtrl', ['$scope', function($scope) {
    $scope.columns = {};

    $scope.addColumn = function(name) {
      $scope.columns[name] = {cards: {}};
    };

    $scope.addCard = function(columnId, cardName, cardDescription) {
      var col = $scope.columns[columnId];
      col.cards[cardName] = {description: cardDescription};
    };

    $scope.deleteCard = function(cards, cardName) {
      console.log("Deleting " + cardName);
      delete cards[cardName];
    };

    $scope.addColumn("Column 1");
    $scope.addCard("Column 1", "Card 1", "Fix up the css!");
    $scope.addCard("Column 1", "Card 2", "Add some ids!");
    $scope.addColumn("Column 2");
    $scope.addCard("Column 2", "Card 3", "Write some tests!");
  }]);
