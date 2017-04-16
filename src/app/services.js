const angular = require('angular');

angular.module('angularTrello.services', [])
  .factory('Card', () => class {
    constructor(name, description, opt_isPhantom) {
      this.name = name || 'New Card';
      this.description = description || 'This is my new card';
      this.isPhantom = opt_isPhantom || false;
    }
  })
  .factory('Column', () => class {
    constructor(name, cards) {
      this.name = name;
      this.cards = cards || [];
    }

    add(card) {
      this.cards.push(card);
    }

    addAt(card, i) {
      this.cards.splice(i, 0, card);
    }

    remove(card) {
      this.cards.splice(this.indexOf(card), 1);
    }

    indexOf(card) {
      return this.cards.indexOf(card);
    }
  })
  .service('columns', class {
    constructor() {
      this.columns = [];
    }
    getAllColumns() {
      return this.columns;
    }
    add(col) {
      this.columns.push(col);
    }
    remove(index) {
      this.columns.slice(index, 1);
    }
    indexOf(col) {
      return this.columns.indexOf(col);
    }
  });
