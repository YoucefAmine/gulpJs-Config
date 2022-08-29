const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const gUtil = require('gulp-util');
const notify = require('gulp-notify');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const { src, dest } = require('gulp');
const { styles } = require('../config/paths');
const { plumbConfig } = require('../config/pluginsConfig');
const { isDev } = require('../utils/env');

const css = done => {
  src([styles.srcStyles, 'node_modules/bootstrap/scss/bootstrap.scss'])
    .pipe(plumber(plumbConfig))
    .pipe(sass())
    .pipe(
      notify({
        message: gUtil.colors.green(
          '☑️ Style files were successfully compiled @ <%= options.date %>'
        ),
        templateOptions: {
          date: new Date().toLocaleString(),
        },
      })
    )
    .pipe(gulpIf(!isDev, cleanCss()))
    .pipe(gulpIf(!isDev, concat('main.min.css'), concat('main.css')))
    .pipe(gulpIf(!isDev, dest(styles.distStyles), dest(styles.tempStyles)))
    .pipe(browserSync.stream());
  done();
};

module.exports = {
  css,
};
