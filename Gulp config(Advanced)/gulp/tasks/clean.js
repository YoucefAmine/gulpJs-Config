const del = require('del');
const notifier = require('node-notifier');
const gUtil = require('gulp-util');

const { delConfig } = require('../config/pluginsConfig');

const cleanUp = async done => {
  const deletedDirectoryPaths = await del(delConfig);
  notifier.notify('Folders were successfully deleted ☑️');
  gUtil.log(
    gUtil.colors.bgRed('⚠️ Directories that would be deleted: \n'),
    '✔️  ',
    gUtil.colors.red(deletedDirectoryPaths.join('\n'))
  );
  done();
};

module.exports = {
  cleanUp,
};
