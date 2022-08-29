const { parallel, series, task } = require('gulp');
const { server } = require('./server');
const { watcher } = require('./watch');
const { build } = require('./build');
const { starterMsg } = require('./messages');

task('serving', parallel(server, watcher));

const dev = task('dev', series(starterMsg, build, 'serving'));

module.exports = {
  dev,
};
