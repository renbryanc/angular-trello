'use strict';

var angular = require('angular');

/* Filters */

angular.module('angularTrello.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);
