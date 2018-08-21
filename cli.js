#!/usr/bin/env node
const spawnSync = require('child_process').spawnSync;
const findRoot = require('find-root');
const path = require('path');

/**
 * Get ignored file patterns from package.json
 */
const ignores = (function ignores() {
  let root;
  let ignores = [];

  try {
    root = findRoot(process.cwd());
  } catch (x) {
    return ignores;
  }

  const pkg = require(path.join(root, 'package.json'));

  ignores = ignores
    .concat(pkg.eslintIgnore || [])
    .concat(pkg.vjsstandard && pkg.vjsstandard.ignore || []);

  return ignores;
})();

const ignoreArgs = ignores.reduce((acc, ig) => acc.concat(['--ignore-pattern', ig]), []);
// defaults
const args = [
  '--config', path.join(__dirname, 'eslintrc.json')
]
  .concat(ignoreArgs)

  // add user args
  .concat(process.argv.splice(2))


const retval = spawnSync('eslint', args, {stdio: 'inherit', env: process.env});

process.exit(retval.status);
