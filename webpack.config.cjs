const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: 'build',
    },
    compress:true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.mp3$/,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
};
