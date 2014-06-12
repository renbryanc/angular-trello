'use strict';

/* Controllers */

angular.module('angularTrello.controllers', [])
  .controller('MainBoardCtrl', ['$scope', function($scope) {
    $scope.columns = {};

    $scope.addColumn = function(name) {
      $scope.columns[name] = {};
    };

    $scope.addColumn("Column 1");
    $scope.addColumn("Column 2");
  }]);
