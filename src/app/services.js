const angular = require('angular');

angular.module('angularTrello.services', [])
  .factory('Card', () => class {
    constructor(name, description, opt_isPhantom) {
      this.name = name || 'Card name unset';
      this.description = description || 'Description unset';
      this.isPhantom = opt_isPhantom || false;
    }
  })
  .factory('Node', () => class {
    constructor(item, next, previous) {
      this.item = item;
      this.nextNode = next;
      this.previousNode = previous;
    }
    get() {
      return this.item;
    }

    setNext(next) {
      this.nextNode = next;
    }

    getNext() {
      return this.nextNode;
    }

    setPrevious(prev) {
      this.previousNode = prev;
    }

    getPrevious() {
      return this.previousNode;
    }

    swap(other) {
      const otherNext = other.getNext();
      const otherPrev = other.getPrevious();
      other.setNext(this.getNext());
      other.setPrevious(this.getPrevious());
      this.setNext(otherNext);
      this.setPrevious(otherPrev);
    }
  })
  .factory('LinkedList', () => class {

  })
  .factory('Column', () => class {
    constructor(name, cards) {
      this.name = name || 'Name unset';
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
  .service('ColumnService', class {
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
