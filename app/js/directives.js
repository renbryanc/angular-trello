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
        $document.off('mousemove', onMouseMove);
        $document.off('mouseup', onMouseUp);
        $rootScope.$broadcast('draggable-dropped', elm, scope.card);
        elm.removeClass('dragging');
        e.preventDefault();
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
  directive('trelloDragZone', ['$document', function($document) {
    return function(scope, elm, attrs) {
      var left = elm.position().left,
          right = left + elm.width();
      scope.$on('draggable-dropped', function(e, draggedElm, card) {
        var draggedX = draggedElm.position().left;
        if (draggedX >= left && draggedX < right) {
          e.currentScope.column.cards.push(card);
          debugger;
        }
      });
    };
  }]);
