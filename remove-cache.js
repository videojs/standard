/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');

try {
  const root = findRoot(process.env.INIT_CWD || process.cwd());
  const cachePath = path.join(root, '.eslintcache');

  fs.unlinkSync(cachePath);
  console.log(`removed ${cachePath}`);
} catch (e) {
  // file doesn't exist or we cannot delete.
}
