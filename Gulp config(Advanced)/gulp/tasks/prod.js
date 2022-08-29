const { series, task } = require('gulp');
const { build } = require('./build');
const { starterMsg } = require('./messages');

const prod = task('prod', series(starterMsg, build));

module.exports = {
  prod,
};
