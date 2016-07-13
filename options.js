var eslint = require('eslint');
var path = require('path');
var pkg = require('./package.json');

module.exports = {
  cmd: 'vjsstandard',
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  tagline: pkg.description,
  eslint: eslint,
  eslintConfig: {
    configFile: path.join(__dirname, 'eslintrc.json')
  },
  cwd: ''
};
