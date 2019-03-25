const path = require('path');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = function (env) {
  const devMode = Boolean(env && env.dev);
  return {
    devServer: {
      historyApiFallback: true
    },
    devtool: devMode ? 'inline-source-map' : 'hidden-source-map',
    entry: {
      client: path.resolve(__dirname, 'src/client/index.tsx')
    },
    mode: devMode ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-modules-typescript-loader',
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                modules: true
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          include: path.resolve(__dirname, 'src/client')
        }
      ]
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
          }
        }
      }
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[id].[contenthash:8].js',
      publicPath: '/'
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new HtmlWebpackPlugin(),
      !devMode && new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].[contenthash:8].css'
      }),
      new StatsWebpackPlugin('stats-client.json')
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    target: 'web'
  };
}
