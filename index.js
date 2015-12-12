'use strict';

module.exports.$modules = {
  
  $config: (function () {
  
    var getConfig = function getConfig($root, $module, $done, $$path, $$confit) {
      var container = this;
      if (container.$config$error) {
        $done(container.$config$error);
      } else if (!container.$config) {
        container.get('$configDirectory', function (err, configDirectory) {
          if (err) {
            configDirectory = 'config';
          }
          if (configDirectory[0] !== '/') {
            configDirectory = $$path.join($root, configDirectory);
          }
          $$confit(configDirectory).create(function (err, configuration) {
            if (err) {
              container.$config$error = err;
            } else {
              container.$config = configuration;
            }
            getConfig.call(container, $root, $module, $done, $$path, $$confit);
          });
        });
      } else {
        $done(null, $module ? container.$config.get($module) : container.$config);
      }
    };
    
    return getConfig;
  }())
};