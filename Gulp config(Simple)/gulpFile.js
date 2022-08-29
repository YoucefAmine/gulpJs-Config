const gulp = require('gulp');
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const del = require('del');
const gUtil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const plumber = require('gulp-plumber');
const zip = require('gulp-zip');
const notify = require('gulp-notify');
const inject = require('gulp-inject');

//! Html task
gulp.task('html', done => {
  gulp
    .src('src/**/*.pug')
    .pipe(
      plumber(err => {
        gUtil.log(gUtil.colors.red(err.message));
      })
    )
    .pipe(
      inject(
        gulp.src(['dist/js/*.js', 'dist/css/*.css'], {
          read: false,
        }),
        {
          ignorePath: 'dist',
          addRootSlash: false,
        }
      )
    )
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist'));
  done();
});

//! Css task
gulp.task('css', done => {
  gulp
    .src([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'src/css/*.{scss,sass}',
    ])
    .pipe(
      plumber(err => {
        gUtil.log(gUtil.colors.red(err.message));
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(concat('main.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
  done();
});

//! JS task
gulp.task('js', done => {
  gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'src/**/*.js',
    ])
    .pipe(
      plumber(err => {
        gUtil.log(gUtil.colors.red(err.message));
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
  done();
});

//! Static files task
gulp.task('staticFiles', done => {
  gulp.src('src/images/*').pipe(gulp.dest('dist/images'));
  done();
});

//! CleanUp task
gulp.task('cleanUp', async done => {
  const deletedDirectoryPaths = await del('dist');
  gUtil.log(
    gUtil.colors.bgRed('⚠️ Directories that would be deleted: \n'),
    '✔️  ',
    gUtil.colors.red(deletedDirectoryPaths.join('\n'))
  );
  done();
});

//! Server task
gulp.task('connect', done => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    port: 8080,
  });
  done();
});

//! AutoReload task
gulp.task('reload', done => {
  browserSync.reload();
  done();
});

//! Watch task
gulp.task('watch', done => {
  gulp.watch('src/**/*.pug', gulp.series('html', 'reload'));
  gulp.watch('src/css/*.{scss,sass}', gulp.series('css', 'reload'));
  gulp.watch('src/**/*.js', gulp.series('js', 'reload'));
  done();
});

//! Default task
gulp.task(
  'default',
  gulp.series(
    'cleanUp',
    gulp.parallel('css', 'js', 'staticFiles'),
    'html',
    'connect',
    'watch'
  )
);

//! Files compress task
gulp.task('compress', done => {
  gulp
    .src('dist/**/*.*')
    .pipe(zip('Product.zip'))
    .pipe(gulp.dest('.'))
    .pipe(notify('Files are compressed'));
  done();
});
