const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
//require('webpack-jquery-ui/css');
module.exports = {
  entry: './src/client/index.js',
  output: {
    libraryTarget: 'var',
    library: 'Client'
  },

  mode: 'development',
  devtool: 'source-map',
  resolve: {
    alias: {
      jquery: 'jquery/dist/jquery.min.js',
      'jquery-ui': 'jquery-ui/ui/widgets/datepicker.js',
      'jquery-ui-css': 'jquery-ui-dist/jquery-ui.min.css',
      skycons: 'skycons/skycons.js',
      
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
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader?name=media/[name].[ext]']
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
      
 
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

    new FaviconsWebpackPlugin({logo: './src/client/favicon.png',inject: true,}),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    })
  ]
};
