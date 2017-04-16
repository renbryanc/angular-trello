const angular = require('angular');

angular.module('angularTrello.services', [])
  .factory('Card', function() {
    const Card = function(name, description, opt_isPhantom) {
      this.name = name || 'New Card';
      this.description = description || 'This is my new card';
      this.isPhantom = opt_isPhantom || false;
    };

    return Card;
  })
  .factory('Column', function() {
    const Column = function(name, cards) {
      this.name = name;
      this.cards = cards || [];
    };

    Column.prototype.add = function(card) {
      this.cards.push(card);
    };

    Column.prototype.addAt = function(card, i) {
      this.cards.splice(i, 0, card);
    };

    Column.prototype.remove = function(card) {
      this.cards.splice(this.indexOf(card), 1);
    };

    Column.prototype.indexOf = function(card) {
      return this.cards.indexOf(card);
    };

    return Column;
  })
  .service('columns', function() {
    let columns = [];
    return {
      getAllColumns: function() {
        return columns;
      },
      add: function(col) {
        columns.push(col);
      },
      remove: function(index) {
        columns.slice(index, 1);
      },
      indexOf: function(col) {
        return columns.indexOf(col);
      }
    };
  });
