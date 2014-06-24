'use strict';

/* Directives */

angular.module('angularTrello.directives', []).
  directive('trelloDraggable', ['$document', '$rootScope', function($document, $rootScope) {
    return function(scope, elm, attrs) {
      var x = 0,
          y = 0,
          startX = 0,
          startY = 0;
      
      var onMouseMove = function(e) {
        x = e.pageX - startX;
        y = e.pageY - startY;
        elm.css({'top': y,
                 'left': x});

        e.preventDefault();
      };
  
      var onMouseUp = function(e) {
        e.preventDefault();
        
        $document.off('mousemove', onMouseMove);
        $document.off('mouseup', onMouseUp);
       
        $rootScope.$broadcast('draggable-dropped', elm);

        elm.removeClass('dragging');
        elm.removeAttr('style');
      };

      elm.on('mousedown', function(e) {
        startX = e.pageX - elm.position().left;
        startY = e.pageY - elm.position().top;
        
        elm.css({'width': elm.width() + 'px',
                 'height': elm.height() + 'px'});
        elm.addClass('dragging');

        $document.on('mousemove', onMouseMove);
        $document.on('mouseup', onMouseUp);
      });
    };
  }]).
  directive('trelloDragZone', [function() {
    return function(scope, elm, attrs) {
      var left = elm.position().left,
          right = left + elm.width();
      scope.$on('draggable-dropped', function(e, draggedElm) {
        var draggedX = draggedElm.position().left;
        if (draggedX >= left && draggedX < right) {
          var card = draggedElm.scope().card;
          var oldColumn = draggedElm.scope().$parent.column;
          var newColumn = elm.scope().column;
          
          oldColumn.remove(card);
          newColumn.add(card);
          
          draggedElm.scope().$apply();
          elm.scope().$apply();
        }
      });
    };
  }]);
