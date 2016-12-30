var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
      bundle:['webpack-hot-middleware/client','./src/index']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVTOOLS__: !!process.env.DEBUG
    })
  ],
  resolve: {
    extensions: ['', '.js','.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],//因为hot-loader并不会刷新网页，而仅仅是替换你修改的部分，也就是without losing state。
      exclude: /node_modules/
    }]
  }
};
