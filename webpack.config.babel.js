const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const NpmInstallPlugin = require("npm-install-webpack-plugin");

module.exports = {
  entry: [
    'babel-polyfill',
    './reactapp/src/index.js'
  ],
  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './app.bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
        plugins: ['react-hot-loader/babel']
      }
    },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-flexbugs-fixes'),
                require('postcss-cssnext')(),
                require('autoprefixer')(
                  {
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  },
                )
              ]
            }
          }
        ]
        // fallback: [{
        //   loader: 'css-loader'
        // }]
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
          path.resolve(__dirname, 'reactapp'),
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
		      new ExtractTextPlugin({
            disable: process.env.NODE_ENV !== 'production',
		        filename: "styles.css",
            allChunks : true
		      }),
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
