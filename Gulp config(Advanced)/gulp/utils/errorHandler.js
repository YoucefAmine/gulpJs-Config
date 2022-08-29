const gUtil = require('gulp-util');
const notifier = require('node-notifier');

function errorHandler(err) {
  gUtil.log(gUtil.colors.red(err.message));
  notifier.notify({
    title: '⚠️ Gulp error in ' + err.plugin,
    message: err.message,
  });
  gUtil.beep();
}

module.exports = {
  errorHandler,
};
