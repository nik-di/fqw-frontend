const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => {
  const isDev = env.NODE_ENV === 'development';

  return ({
    entry: {
      main: './src/pages/main/index.js',
      articles: './src/pages/articles/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? '[name].[hash].js' : '[name].[chunkhash].js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: "babel-loader" }
        },
        {
          test: /\.css$/,
          use: [
            isDev ?
              { loader: 'style-loader' } :
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../../'
                }
              },
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg|ico|cur)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images',
                esModule: false,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                disable: true,
              },
            }
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts',
                esModule: false,
                publicPath: './fonts'
              },
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './styles/[name]/[name].[contenthash].css'
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default'],
        },
        canPrint: true
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/pages/main/index.html',
        filename: 'main.html',
        chunks: ['main']
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/pages/articles/index.html',
        filename: 'articles.html',
        chunks: ['articles']
      }),
      new WebpackMd5Hash(),
    ]
  });
};
