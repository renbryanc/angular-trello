const angular = require('angular');
const $ = require('jquery');
const services = require('./services');

angular.module('angularTrello.directives', [
      'angularTrello.services'
    ]).
  directive('trelloDraggable', ['$document', '$rootScope', ($document, $rootScope) => {
    return (scope, elm, attrs) => {
      let x = 0,
          y = 0,
          startX = 0,
          startY = 0;

      const onMouseMove = (e) => {
        e.preventDefault();

        x = e.pageX - startX;
        y = e.pageY - startY;
        elm.css({'top': y,
                 'left': x});

        $rootScope.$broadcast('draggable-dragged', elm);
      };

      const onMouseUp = (e) => {
        e.preventDefault();

        $document.off('mousemove', onMouseMove);
        $document.off('mouseup', onMouseUp);

        $rootScope.$broadcast('draggable-dropped', elm);

        elm.removeClass('dragging');
        elm.removeAttr('style');
      };

      elm.on('mousedown', (e) => {
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
  directive('trelloDragZone', ['Card', (Card) => {
    return (scope, elm, attrs) => {
      const left = elm.position().left,
          right = left + elm.width();

      const phantom = new Card('','', true);
      let column = scope.column;

      const containsPhantom = () => {
        return column.indexOf(phantom) > -1;
      };

      const removePhantom = () => {
        if (containsPhantom()) {
          column.remove(phantom);
        }
      };

      const addPhantomAt = (i) => {
        removePhantom();
        column.addAt(phantom, i);
      };

      const updatePhantomToMatch = (elm) => {
        angular.element('.phantom').css({
          width: elm.width() + 'px',
          height: elm.height() + 'px'
        });
      };

      const yMidpoint = (el) => {
        return el.position().top + el.height() / 2;
      };

      const xMidpoint = (el) => {
        return el.position().left + el.width() / 2;
      };

      const elementIsClosest = (otherElm) => {
        const otherX = xMidpoint(otherElm);
        return otherX >= left && otherX < right;
      };

      const calculateMidpoints = (columnEl) => {
        let output = [];
        columnEl.find('.card').not('.dragging')
          .each((i, el) => {
            output.push(yMidpoint($(el)));
          });
        return output;
      };

      const getIndexOf = (el) => {
        const y = yMidpoint(el);
        const midpoints = calculateMidpoints(elm);
        let i = 0;
        while (midpoints[i] < y && i < midpoints.length) {
          i++;
        }
        return i;
      };

      scope.$on('draggable-dropped', (e, draggedElm) => {
        if (elementIsClosest(draggedElm)) {
          const card = draggedElm.scope().card;
          let oldColumn = draggedElm.scope().$parent.column;

          removePhantom();

          oldColumn.remove(card);
          column.addAt(card, getIndexOf(draggedElm));

          draggedElm.scope().$apply();
          scope.$apply();
        }
      });
      scope.$on('draggable-dragged', (e, draggedElm) => {
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
