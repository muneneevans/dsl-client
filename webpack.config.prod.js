// webpack.config.prod.js  
const path = require('path')  
const webpack = require('webpack')

var DIST_DIR = path.resolve(__dirname,"dist");
var SRC_DIR = path.resolve(__dirname, "src");

export default {  
  devtool: 'source-map',

  entry: SRC_DIR + "/app/index.js",

  output: {
    path: DIST_DIR + "/app",
    filename: 'bundle.js',
    publicPath: '/app/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_HOST': 'https://41.89.94.68:8000'
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'src', 'styles') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'}
    ]
  }
}