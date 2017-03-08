const path = require('path');

module.exports = {
  locale: 'en_US',
  publicPath: path.join(__dirname, '../public'),
  buildPath: path.join(__dirname, '../build'),
  sessionDuration: 8,
  google: {
    clientId: '1013003508849-ke0dsjttftqcl0ee3jl7nv7av9iuij8p.apps.googleusercontent.com',
  },
};
