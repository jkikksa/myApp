const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

// module.exports = {
//   entry: './source/client/index.js',
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//       },
//       {
//         test: /\.css$/,
//         loader: 'style-loader!css-loader'
//       }
//     ]
//   }
// };

module.exports = {
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
        // include: [/node_modules\\antd/, /source/],
        // exclude: /node_modules/,
        use: ExtractTextPlugin.extract(['css-loader'])
        // use: [
        //   { loader: "style-loader" },
        //   { loader: "css-loader" }
        // ]
      }
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: 'style-loader!css-loader'
      //   })
      // }
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader'
      // }
    ]
  },
  plugins: [
    // new webpack.IgnorePlugin(/\.css$/),
    new ExtractTextPlugin('../public/styles.css'),
  ],
};
