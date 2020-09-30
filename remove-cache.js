/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const cache = path.join(process.cwd(), '.eslintcache');

try {
  fs.unlinkSync(cache);
  console.log('removed .eslintcache');
} catch (e) {
  // file doesn't exist or we cannot delete.
}
