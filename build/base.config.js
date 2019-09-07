const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './client/index.tsx',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    enforceExtension: false,
  },
  devServer: {
    port: 9000,
    noInfo: true,
    open: 'Google Chrome',
    // host: process.env.HOST || '0.0.0.0',
    after: function(app, server) {
      console.log('>>>>>>>>>after');
    },
    allowedHosts: ['http://localhost:3000'], // 设置白名单
    proxy: {
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
              // localIndexName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'less-loader',
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/template/index.html',
    }),
  ],
};
