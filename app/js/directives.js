'use strict';

/* Directives */

angular.module('angularTrello.directives', []).
  directive('trelloDraggable', ['$document', function($document) {
    return function(scope, elm, attrs) {
      var x = 0,
          y = 0,
          startX = 0,
          startY = 0;
      
      var onMouseMove = function(e) {
        x = e.pageX;
        y = e.pageY;
        elm.css({'position': 'absolute',
                 'top': x,
                 'left': y});
      };
  
      debugger;

      elm.click(function() {
        console.log("clicked!");
        elm.mouseMove(onMouseMove);
      });
    };
  }]);
