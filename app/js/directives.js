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
                 'top': y,
                 'left': x});
        e.preventDefault();
      };
  
      var onMouseUp = function(e) {
        console.log('mouseup!');
        $document.off('mousemove', onMouseMove);
        $document.off('mouseup', onMouseUp);
        e.preventDefault();
      };

      elm.on('mousedown', function() {
        $document.on('mousemove', onMouseMove);
        $document.on('mouseup', onMouseUp);
      });
    };
  }]);
