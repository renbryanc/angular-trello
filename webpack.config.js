let webpack = require('webpack');
let path = require('path');

module.exports = {
  context: __dirname + '/src/app',
  entry: {
    app: './app.js',
    vendor: ['angular', 'angular-route', 'jquery']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          { loader: 'jshint-loader' }
        ]
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
    new webpack.ProvidePlugin({'window.jQuery': 'jquery'})
  ]
};
