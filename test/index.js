/* vim: set et sw=2 ts=2: */

describe('white-horse-config', function () {
  'use strict';

  var assert = require('assert');
  var WhiteHorse = require('white-horse');
  var confit = require('confit');
  var path = require('path');

  it('should be picked up by the container', function () {
    var container = new WhiteHorse(require);
    container.use('../index.js');
    assert(container.getModule('$config') instanceof WhiteHorse.Module);
  });
  
  it('should load + inject the right config into modules', function (done) {
    var container = new WhiteHorse(require);
    container.use('confit');
    container.use('../index.js');
    container.register('hello', function ($config) {
      return $config.port;
    });
    container.register('world', function ($config) {
      return $config.yea;
    });
    container.inject(function (hello, world) {
      assert.equal(1337, hello);
      assert.equal(4711, world);
      done();
    }, function (err) {
      assert.equal(err, null);
    });
  });
  
  it('should load + inject the right config into modules, respecting $configDirectory', function (done) {
    var container = new WhiteHorse(require);
    container.use('confit');
    container.register('$configDirectory', 'fixture/config');
    container.use('../index.js');
    container.register('hello', function ($config) {
      return $config.port;
    });
    container.register('world', function ($config) {
      return $config.yea;
    });
    container.inject(function (hello, world) {
      assert.equal(1337, hello);
      assert.equal(4711, world);
      done();
    }, function (err) {
      assert.equal(err, null);
    });
  });
  
  it('should load + inject the right config into modules, respecting an absolute $configDirectory', function (done) {
    var container = new WhiteHorse(require);
    container.register('$configDirectory', __dirname + '/fixture/config');
    container.use('../index.js');
    container.register('hello', function ($config) {
      return $config.port;
    });
    container.register('world', function ($config) {
      return $config.yea;
    });
    container.inject(function (hello, world) {
      assert.equal(1337, hello);
      assert.equal(4711, world);
      done();
    }, function (err) {
      assert.equal(err, null);
    });
  });
  
  it('report an error if config is bad', function (done) {
    var container = new WhiteHorse(require);
    container.register('$configDirectory', 'fixture/bad-config');
    container.use('../index.js');
    container.register('hello', function ($config) {
      return $config.port;
    });
    container.register('world', function ($config) {
      return $config.yea;
    });
    container.inject(function (hello, world) {
      assert.equal(1337, hello);
      assert.equal(4711, world);
      done();
    }, function (err) {
      assert(err);
      assert(err.dependenciesFailed.hello.dependenciesFailed.$config);
      assert(err.dependenciesFailed.hello.dependenciesFailed.$config.initializationFailed);
      done();
    });
  });
  
  it('returns complete config if not injected into a module', function (done) {
    var container = new WhiteHorse(require);
    container.register('$configDirectory', 'fixture/config');
    container.use('../index.js');
    container.inject(function ($config) {
      var helloConfig = $config.get('hello');
      var worldConfig = $config.get('world');
      assert.equal(1337, helloConfig.port);
      assert.equal(4711, worldConfig.yea);
      return 42;
    }, function (err, result) {
      assert.equal(err, null);
      assert.equal(result, 42);
      done();
    });
  });
});
