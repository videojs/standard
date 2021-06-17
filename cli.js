#!/usr/bin/env node

/* eslint-disable no-console */

const {Command} = require('commander');
const CLIEngine = require('eslint').CLIEngine;
const path = require('path');
const os = require('os');
const tsmlb = require('tsmlb');
const filterer = require('./filterer');
const getConfig = require('./get-config');
const pkg = require(path.join(__dirname, 'package.json'));

const program = new Command();
const opts = {};

program.
  version('videojs-standard: ' + pkg.version + os.EOL + 'eslint: ' + CLIEngine.version).
  arguments('[targets...]').
  action((targets) => {
    opts.targets = targets;
  }).
  option('-e, --errors', 'Produces a report that only includes errors; not warnings.').
  option('-w, --warnings', 'Produces a report that only includes warnings; not errors.').
  option('--fix, --format', 'Formats/fixes files where possible to comply with videojs-standard.').
  parse(process.argv);

Object.assign(opts, program.opts());

// If no targets were specified, default to this directory.
if (!opts.targets || !opts.targets.length) {
  opts.targets = ['.'];
}

const config = getConfig(process.cwd());
const rules = {};

if (config.jsdoc === false) {
  rules['require-jsdoc'] = 'off';
  rules['valid-jsdoc'] = 'off';
  rules['jsdoc/newline-after-description'] = 'off';
}

config.ignore = config.ignore || [];
config.ignore.push('node_modules');

const cli = new CLIEngine({
  cwd: process.cwd(),
  baseConfig: require(path.join(__dirname, 'eslintrc.json')),
  fix: Boolean(opts.format),
  ignorePattern: config.ignore,
  cache: true,
  useEslintrc: false,
  rules
});

const report = filterer(
  cli.executeOnFiles(opts.targets),
  opts.errors,
  opts.warnings
);

if (opts.format) {
  CLIEngine.outputFixes(report);

  const applied = report.results.
    map(result => result.output ? result.filePath : '').
    filter(Boolean);

  if (applied.length) {
    console.log(tsmlb`
      Applied fixes to ${applied.length} files:
        ${applied.join(os.EOL + '        ')}
    `);
  }

  if (applied.length < report.results.length) {
    console.log(tsmlb`
      Could not apply fixes to ${applied.length ? report.results.length - applied.length : 'any'} files!
    `);
  }
}

const formatter = cli.getFormatter();

console.log(formatter(report.results));

// Exit with a correct code.
process.exit(report.errorCount ? 1 : 0);
