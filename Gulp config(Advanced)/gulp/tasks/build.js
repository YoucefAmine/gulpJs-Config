const { parallel, series } = require('gulp');
const { html } = require('./templates');
const { css } = require('./styles');
const { js } = require('./scripts');
const { staticFiles } = require('./staticFiles');
const { cleanUp } = require('./clean');

const build = series(cleanUp, parallel(css, js, staticFiles), html);

module.exports = {
  build,
};
