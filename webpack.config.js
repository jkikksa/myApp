const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = [{
  // client
  entry: './source/client/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
},
{
  // server
  entry: './source/app.js',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: path.resolve(__dirname, 'source'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(['css-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../public/css/common.css'),
  ],
}];
