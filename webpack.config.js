const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');

const srcPath    = path.join(__dirname, 'app');
const nodeEnv    = process.env.NODE_ENV;
const production = nodeEnv && nodeEnv.indexOf('prod') > -1;

const devTools = !production;

const dstPath    = 'distrib';
const fontsPath  = '/fonts/';
const imagesPath = '/images/';

const common = require(`${ srcPath }/vendors`);

const webpackConfig = module.exports = {
  target : 'web',
  entry  : {
    module: path.join(srcPath, 'app.module.js'),
    common
  },
  resolve: {
    root      : srcPath,
    alias     : {
      components: 'components',
      styles    : 'components/styles'
    },
    extensions: ['', '.js'],

    modulesDirectories: ['node_modules', 'app']
  },
  output : {
    path      : path.join(__dirname, dstPath),
    filename  : '[name].js'
  },

  module : {
    loaders: [
      {
        test   : /^((?!\.min).)*\.js$/,
        exclude: /node_modules/,
        loaders: [
          'ng-annotate',
          'babel'
        ]
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract([
          'css'
        ])
      },
      {
        test  : /\.less$/,
        loader: ExtractTextPlugin.extract([
          `css?minimize${ production ? '' : '&sourceMap' }`,
          `less${ production ? '' : '?sourceMap' }`
        ])
      },
      { //simple tpls will be accessible through html string
        test   : /^((?!tpl).)*\.html$/,
        loaders: ['html'],
        exclude: 'index.html'
      },
      { // templates through template cache
        test  : /\.tpl\.html$/,
        loader: `ngtemplate?relativeTo=${ (path.resolve(__dirname, './app')) }/!html`
      },
      {
        test  : /\.woff(\?.*)?$/,
        loader: `url?prefix=fonts/&name=${ fontsPath }[name].[ext]&limit=10000&mimetype=application/font-woff`
      },
      {
        test  : /\.woff2(\?.*)?$/,
        loader: `url?prefix=fonts/&name=${ fontsPath }[name].[ext]&limit=10000&mimetype=application/font-woff2`
      },
      {
        test  : /\.ttf(\?.*)?$/,
        loader: `url?prefix=fonts/&name=${ fontsPath }[name].[ext]&limit=10000&mimetype=application/octet-stream`
      },
      {
        test  : /\.eot(\?.*)?$/,
        loader: `file?prefix=fonts/&name=${ fontsPath }[name].[ext]`
      },
      {
        test  : /\.svg(\?.*)?$/,
        loader: `url-loader?&name=${ imagesPath }[name].[ext]&limit=10000&mimetype=image/svg+xml`
      },
      {
        test  : /\.(png|jpg)$/,
        loader: `url-loader?&name=${ imagesPath }[name].[ext]&limit=10000`
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject  : true,
      hash    : true,
      template: 'app/index.html'
    }),
    new ExtractTextPlugin('[name].css')
  ]
};

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common', 'common.js');

webpackConfig.plugins.push(commonChunkPlugin);

if (production) {
  webpackConfig.output.publicPath = 'angular_pokemon/';

  //Add minifying
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      unused   : true,
      dead_code: true
    }
  }));
}

if (devTools) {
  // Add debug tools
  Object.assign(webpackConfig, {
    debug    : true,
    devtool  : 'source-map',
    devServer: {
      contentBase       : `./${ dstPath }`,
      historyApiFallback: true,
      port              : 9001
    }
  });

  webpackConfig.plugins.push(new OpenBrowserPlugin({
    url: 'http://localhost:9001'
  }));
}
