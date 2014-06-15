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
        x = e.pageX - startX;
        y = e.pageY - startY;
        elm.css({'position': 'absolute',
                 'top': y,
                 'left': x});
        e.preventDefault();
      };
  
      var onMouseUp = function(e) {
        $document.off('mousemove', onMouseMove);
        $document.off('mouseup', onMouseUp);
        scope.$emit('draggable-dropped', x, y);
        e.preventDefault();
      };

      elm.on('mousedown', function(e) {
        startX = e.pageX - elm.position().left;
        startY = e.pageY - elm.position().top;
        $document.on('mousemove', onMouseMove);
        $document.on('mouseup', onMouseUp);
      });
    };
  }]);
