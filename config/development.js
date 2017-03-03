const server = { host: '0.0.0.0', port: 3004 };
const serverUrl = `http://${server.host}:${server.port}`;
module.exports = {
  // devtool: 'eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/socket.io': {
        ws: true,
        target: serverUrl,
        secure: false,
      },
      '/api': {
        target: serverUrl,
        secure: false,
      }
    },
  },
  server: server,
  db: {
    host: '0.0.0.0',
    port: 27017,
    options:{
      auto_reconnect: true,
      poolSize: 10, 
      w: 1, 
      strict: true, 
      native_parser: true
    },
    database: 'timetrack',
  },
}
