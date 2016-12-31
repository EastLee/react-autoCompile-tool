var http = require('http');

var express = require('express');

var app = express();

app.use(require('morgan')('short'));

(function initWebpack() {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, { //编译bundle
    noInfo: false,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler,{ //热替换最新的bundle
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
  //监听编译事件，并且会实时通知客户端，当客户端得到编译的通知会检查本地代码是否需要更新，如果没有更新，就会重新加载
})();

app.get('/', function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});
if (require.main === module) {
  var server = http.createServer(app);
  server.listen(process.env.PORT || 3000, function onListen() {
    var address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
  });
}
