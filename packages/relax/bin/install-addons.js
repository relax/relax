/* eslint-disable no-console */
// TODO Proper logging. Need to use webpack to integrate Relax default logger

const spawn = require('child_process').spawn;
const config = require('../config');

const elements = config.addons.map((addon) => `relax-${addon}`);

if (elements.length) {
  console.log('Installing addons...');

  const npmI = spawn('npm', ['i'].concat(elements), {
    cwd: './addons'
  });

  npmI.stdout.on('data', (data) => {
    if (data) {
      console.log(data.toString().replace(/\n+$/, ''));
    }
  });

  npmI.stderr.on('data', (data) => {
    if (data) {
      console.error(data.toString().replace(/\n+$/, ''));
    }
  });

  npmI.on('close', (code) => {
    if (code !== 0) {
      console.error('Something went bad');
    }
    process.exit(code);
  });
}
