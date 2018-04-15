const {injectBabelPlugin} = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {
  // add a plugin
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config.module.rules.unshift({
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
  })
  return config;
}
