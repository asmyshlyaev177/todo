const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const NpmInstallPlugin = require("npm-install-webpack-plugin");

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './app.bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        'react-hot-loader/webpack',
        'babel-loader'
      ]
    },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: { sourceMap: true }
            }],
            fallback: [{
              loader: 'style-loader',
              options: { sourceMap: true }
            }]
          })
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
    ]
      },
      resolve: {
        modules: [
          path.resolve(__dirname, 'src'),
          'node_modules'
        ],
        extensions: ['*', '.js', '.jsx', '.css'],
      },

      plugins: (function() {
        let plugins = [];

        plugins.push(
          new NpmInstallPlugin(),
          new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
          }),
		      new ExtractTextPlugin("styles.css"),
          new webpack.HotModuleReplacementPlugin(),
		      new webpack.NoEmitOnErrorsPlugin()
        )

        if (process.env.NODE_ENV === 'production') {
          plugins.push(
            new MinifyPlugin({}, {sourceMap: null}),
            new OptimizeCssAssetsPlugin({
              assetNameRegExp: /\.css$/g,
              cssProcessor: require('cssnano'),
              cssProcessorOptions: { discardComments: { removeAll: true } },
              canPrint: true
            })
          )
        }

        return plugins;
	    }()),


	    devServer: {
	      hot: true,
	      port: 8000,
	      inline: true,
	      disableHostCheck: true,
	      contentBase: './public',
	      historyApiFallback: true
	    }

  };
