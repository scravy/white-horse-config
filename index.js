'use strict';

module.exports.$modules = {
  
  $config: (function () {
  
    var error = null;
    var config = null;
  
    var getConfig = function getConfig($root, $module, $done, path, confit) {
      if (error) {
        $done(error);
      } else if (!config) {
        this.get('$configFolder', function (err, configFolder) {
          if (err) {
            configFolder = 'config';
          }
          if (configFolder[0] !== '/') {
            configFolder = path.join($root, 'config');
          }
          confit(configFolder).create(function (err, configuration) {
            error = error;
            config = configuration;
            getConfig($root, $module, $done);
          });
        });
      } else {
        $done(null, config.get($module));
      }
    };
    
    return getConfig;
  }())
};