const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    port: 8088,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/manage': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      }
      // '/manage': 'http://admintest.happymmall.com'//此种写法报错？
    }
    // open: true
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.less'],
    alias: {
      container: path.resolve(__dirname, 'src/container'),
      component: path.resolve(__dirname, 'src/component'),
      public: path.resolve(__dirname, 'src/public'),
      api: path.resolve(__dirname, 'src/api')
    }
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
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader:'less-loader',
              options:{
                modifyVars:{
                  "@icon-url":'/font/antd'
                }
              }
            }
          ]
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
      title: 'React-Antd',
      favicon: './src/favicon.ico'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
      // filename: 'js/[name].js'
    }),
    new ExtractTextPlugin('styles.css')
  ]
};
