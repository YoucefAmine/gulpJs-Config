const { watch, series } = require('gulp');
const { templates, styles, scripts } = require('../config/paths');
const { html } = require('./templates');
const { css } = require('./styles');
const { js } = require('./scripts');
const { reload } = require('./server');

const watcher = done => {
  watch(templates.srcHtml, series(html, reload));
  watch(styles.srcStyles, series(css, reload));
  watch(scripts.srcScripts, series(js, reload));
  done();
};

module.exports = {
  watcher,
};
