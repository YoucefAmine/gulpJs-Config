const browserSync = require('browser-sync').create();

const { browserSyncConfig } = require('../config/pluginsConfig');

const server = done => {
  browserSync.init(browserSyncConfig);
  done();
};

const reload = done => {
  browserSync.reload();
  done();
};

module.exports = {
  server,
  reload,
};
