const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const gUtil = require('gulp-util');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const { src, dest } = require('gulp');
const { scripts } = require('../config/paths');
const { babelConfig } = require('../config/pluginsConfig');
const { plumbConfig } = require('../config/pluginsConfig');
const { isDev } = require('../utils/env');

const js = done => {
  src(
    [scripts.srcScripts],
    'node_modules/jqury/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
  )
    .pipe(plumber(plumbConfig))
    .pipe(babel(babelConfig))
    .pipe(
      notify({
        message: gUtil.colors.green(
          '☑️ Scripts files were successfully compiled @ <%= options.date %>'
        ),
        templateOptions: {
          date: new Date().toLocaleString(),
        },
      })
    )
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(gulpIf(!isDev, concat('main.min.js'), concat('main.js')))
    .pipe(gulpIf(!isDev, dest(scripts.distScripts), dest(scripts.tempScripts)))
    .pipe(browserSync.stream());
  done();
};

module.exports = {
  js,
};
