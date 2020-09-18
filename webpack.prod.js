const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
  //entry: './src/client/index.js',
  entry: './src/client/index.js',
  output: {
    libraryTarget: 'var',
    library: 'Client',
    
  },
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  resolve: {
    alias: {
      jquery: 'jquery/dist/jquery.min.js',
      'jquery-ui': 'jquery-ui/ui/widgets/datepicker.js',
      'jquery-ui-css': 'jquery-ui-dist/jquery-ui.min.css',
      skycons: 'skycons/skycons.js'
    }
  },

  module: {
    rules: [
      {
        test: '/.js$/',
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },

      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader?name=media/[name].[ext]']
      } 
    ]
    
  },
  plugins: [
    /* Use the ProvidePlugin constructor to inject jquery implicit globals */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': "jquery'",
      'window.$': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new WorkboxPlugin.GenerateSW()
  ]
};
