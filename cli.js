#!/usr/bin/env node

const findRoot = require('find-root');
const path = require('path');
const CLIEngine = require('eslint').CLIEngine;
const cwd = process.cwd();

var root;
try {
  root = findRoot(cwd);
} catch (x) {}

const pkg = root ? require(path.join(root, 'package.json')) : null;

const cli = new CLIEngine({
  cwd,
  configFile: path.join(__dirname, 'eslintrc.json'),
  ignorePattern: pkg && pkg.vjsstandard && pkg.vjsstandard.ignore || null
});

const files = process.argv.slice(2);

if (!files.length) {
  files.push('.');
}

const report = cli.executeOnFiles(files);
const formatter = cli.getFormatter();

console.log(formatter(report.results));
