const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const { websocketPort } = require('./config/config.json');

const devMode = process.env.NODE_ENV !== 'production';


module.exports = {
  entry: './client/main.jsx',
  output: {
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|woff(2)?|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    proxy: {
      '/cable': {
        target: `ws://localhost:${websocketPort}`,
        ws: true,
      },
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.ejs',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, './logo.png'),
      inject: true,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.output.path = path.resolve(__dirname, './public');
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production',
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
} else {
  module.exports.devtool = 'cheap-module-eval-source-map';
}
