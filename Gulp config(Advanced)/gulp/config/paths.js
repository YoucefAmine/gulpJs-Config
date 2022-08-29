module.exports = {
  src: 'src/**/*',
  temp: 'temp',
  dist: 'dist',
  templates: {
    srcHtml: 'src/pug/**/*.pug',
    tempHtml: 'temp/index.html',
    distHtml: 'dist/index.html',
  },
  styles: {
    srcStyles: 'src/scss/**/*.{scss,sass}',
    tempStyles: 'temp/css',
    distStyles: 'dist/css',
    injectTempStyles: 'temp/css/*.css',
    injectDistStyles: 'dist/css/*.min.css',
  },
  scripts: {
    srcScripts: 'src/js/**/*.js',
    tempScripts: 'temp/js',
    distScripts: 'dist/js',
    injectTempScripts: 'temp/js/*.js',
    injectDistScripts: 'dist/js/*.min.js',
  },
  images: {
    srcImages: 'src/images/**/*.{png,svg,jpg}',
    tempImages: 'temp/images',
    distImages: 'dist/images',
  },
};
