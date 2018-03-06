const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devServer: {
    port: 12345,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8196,
              name: 'image/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8196,
              name: 'font/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'react-admin'
    }),
    new ExtractTextPlugin('style/index.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/[name].js'
    })
  ]
};
