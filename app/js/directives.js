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
        scope.$emit('draggable-dropped', elm);
        elm.css({'z-index': 0});
        e.preventDefault();
      };

      elm.on('mousedown', function(e) {
        startX = e.pageX - elm.position().left;
        startY = e.pageY - elm.position().top;
        elm.css({'width': elm.width() + 'px',
                 'height': elm.height() + 'px',
                 'z-index': 99});
        $document.on('mousemove', onMouseMove);
        $document.on('mouseup', onMouseUp);
      });
    };
  }]);
