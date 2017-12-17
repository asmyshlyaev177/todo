const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const NpmInstallPlugin = require("npm-install-webpack-plugin");

module.exports = {
  entry: [
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
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
	  inline: true,
	  disableHostCheck: true,
	  contentBase: './public',
	  historyApiFallback: true
	}

};
