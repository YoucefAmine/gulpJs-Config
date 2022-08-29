const { temp, dist } = require('../config/paths');
const { errorHandler } = require('../utils/errorHandler');

const pugConfig = { pretty: true };
const babelConfig = { presets: ['@babel/preset-env'] };
const delConfig = [temp, dist];
const plumbConfig = errorHandler;
const browserSyncConfig = {
  server: {
    baseDir: temp,
  },
  port: 8080,
};

module.exports = {
  pugConfig,
  babelConfig,
  delConfig,
  plumbConfig,
  browserSyncConfig,
};
