/* vim: set et sw=2 ts=2: */

describe('WhiteHorse', function () {
  'use strict';

  var assert = require('assert');
  var WhiteHorse = require('../../white-horse/index.js');

  it('should be picked up by the container', function () {
    var container = new WhiteHorse();
    container.use(require.resolve('../index.js'));
    assert(container.getModule('$config') instanceof WhiteHorse.Module);
  });
});
