var path = require('path')
var pkg = require('./package.json')

module.exports = {
  cmd: 'vjsstandard',
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  tagline: pkg.description,
  eslintConfig: {
    configFile: path.join(__dirname, 'rc', 'eslintrc.json')
  }
};
