'use strict';

/* Directives */

angular.module('angularTrello.directives', [
      'angularTrello.services'
    ]).
  directive('trelloDraggable', ['$document', '$rootScope', function($document, $rootScope) {
    return function(scope, elm, attrs) {
      var x = 0,
          y = 0,
          startX = 0,
          startY = 0;
      
      var onMouseMove = function(e) {
        e.preventDefault();
        
        x = e.pageX - startX;
        y = e.pageY - startY;
        elm.css({'top': y,
                 'left': x});

        $rootScope.$broadcast('draggable-dragged', elm);
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
      
        // call this so we add the phantom and update the x/y coords
        onMouseMove(e);
      });
    };
  }]).
  directive('trelloDragZone', ['Card', function(Card) {
    return function(scope, elm, attrs) {
      var left = elm.position().left,
          right = left + elm.width();

      var phantom = new Card('','', true);
      var column = scope.column;

      var containsPhantom = function() {
        return column.indexOf(phantom) > -1;
      };

      var removePhantom = function() {
        if (containsPhantom()) {
          column.remove(phantom);
        }
      };

      var addPhantomAt = function(i) {
        removePhantom();
        column.addAt(phantom, i);
      };

      var updatePhantomToMatch = function(elm) {
        angular.element('.phantom').css({
          width: elm.width() + 'px', 
          height: elm.height() + 'px'
        });
      };

      var yMidpoint = function(el) {
        return el.position().top + el.height() / 2;
      };

      var xMidpoint = function(el) {
        return el.position().left + el.width() / 2;
      };

      var elementIsClosest = function(otherElm) {
        var otherX = xMidpoint(otherElm);
        return otherX >= left && otherX < right;
      };

      var calculateMidpoints = function(columnEl) {
        var output = [];
        columnEl.find('.card').not('.dragging').not('.phantom')
          .each(function(i, el) {
            output.push(yMidpoint($(el)));
          });
        return output;
      };

      var getIndexOf = function(el) {
        var y = yMidpoint(el);
        var midpoints = calculateMidpoints(elm);
        var i = 0;
        while (midpoints[i] < y && i < midpoints.length) {
          i++;
        }
        console.log(midpoints);
        console.log(i);
        return i; 
      };

      scope.$on('draggable-dropped', function(e, draggedElm) {
        if (elementIsClosest(draggedElm)) {
          var card = draggedElm.scope().card;
          var oldColumn = draggedElm.scope().$parent.column;
        
          removePhantom();
          
          oldColumn.remove(card);
          column.addAt(card, getIndexOf(draggedElm));
          
          draggedElm.scope().$apply();
          scope.$apply();
        }
      });
      scope.$on('draggable-dragged', function(e, draggedElm) {
        if (elementIsClosest(draggedElm)) {
          addPhantomAt(getIndexOf(draggedElm));
          scope.$apply();
          updatePhantomToMatch(draggedElm);
        } else if (containsPhantom()) {
          // we are no longer the closest column :( remove the phantom
          removePhantom();
          scope.$apply();
        }
      });
    };
  }]);
