const gUtil = require('gulp-util');
const { NODE_ENV } = require('../utils/env');

const starterMsg = done => {
  gUtil.log(gUtil.colors.bgBlue(`⭐ Starting in ${NODE_ENV} mode`));
  done();
};

module.exports = {
  starterMsg,
};
