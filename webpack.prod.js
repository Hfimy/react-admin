const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const vendors = Object.keys(require('./package.json').dependencies);
module.exports = {
  entry: {
    main: './src/index.js',
    vendor: vendors
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '//deploy.com/react-admin/dist/'
  },
  devtool: false,
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
            'less-loader'
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'React-Antd',
      favicon: './src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
      // filename: 'js/[name].js'
    }),
    new ExtractTextPlugin('styles.[chunkhash:8].css'),
    new UglifyjsWebpackPlugin({
      uglifyOptions: {
        output: {
          beautify: false,
          comments: false
        },
        warnings: false
      }
    })
  ]
};
