const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    ga: './src/ga.js',
    main: './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
            keep_infinity: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
          mangle: { toplevel: true },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
    }),
    new CopyWebpackPlugin(['src/tileset.png']),
  ],
};