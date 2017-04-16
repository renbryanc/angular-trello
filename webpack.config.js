var webpack = require('webpack');
module.exports = {
  context: __dirname + '/app',
  entry: {
    app: './app.js',
    vendor: ['angular', 'angular-route', 'jquery']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
    new webpack.ProvidePlugin({'window.jQuery': 'jquery'})
  ]
};
