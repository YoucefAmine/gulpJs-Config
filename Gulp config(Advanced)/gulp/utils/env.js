const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

module.exports = {
  NODE_ENV,
  isDev,
};
