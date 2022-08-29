const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const gUtil = require('gulp-util');
const notify = require('gulp-notify');
const inject = require('gulp-inject');

const { src, dest } = require('gulp');
const { templates, temp, dist, styles, scripts } = require('../config/paths');
const { pugConfig } = require('../config/pluginsConfig');
const { plumbConfig } = require('../config/pluginsConfig');
const { isDev } = require('../utils/env');

const html = done => {
  src(templates.srcHtml)
    .pipe(plumber(plumbConfig))
    .pipe(pug(pugConfig))
    .pipe(
      inject(
        gulpIf(
          isDev,
          src([scripts.injectTempScripts, styles.injectTempStyles], {
            read: false,
          }),
          src([scripts.injectDistScripts, styles.injectDistStyles], {
            read: false,
          })
        ),
        {
          ignorePath: isDev ? temp : dist,
          addRootSlash: false,
        }
      )
    )
    .pipe(
      notify({
        message: gUtil.colors.green(
          '☑️ Templates were successfully compiled @ <%= options.date %>'
        ),
        templateOptions: {
          date: new Date().toLocaleString(),
        },
      })
    )
    .pipe(gulpIf(isDev, dest(temp), dest(dist)));
  done();
};

module.exports = {
  html,
};
