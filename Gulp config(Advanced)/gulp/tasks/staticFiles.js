const { src, dest } = require('gulp');
const { images } = require('../config/paths');

const staticFiles = done => {
  src(images.srcImages).pipe(dest(images.tempImages));
  done();
};

module.exports = {
  staticFiles,
};
