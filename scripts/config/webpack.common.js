const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const { isDev, PROJECT_PATH } = require('../constant')
const WebpackBar = require('webpackbar')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssRegex = /\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/
const lessRegex = /\.(less)$/
const lessModuleRegex = /\.module\.less$/

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
    },
  ].filter(Boolean)
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      },
    )
  }
  return loaders
}

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_PATH, './dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.less'],
    alias: {
      Src: resolve(PROJECT_PATH, './src'),
      Components: resolve(PROJECT_PATH, './src/components'),
      Utils: resolve(PROJECT_PATH, './src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        //匹配哪些文件
        test: cssRegex,
        //使用哪些loader处理
        // use: [
        //   //use数组中loader执行顺序：从右到左从后到上
        //   //创建style标签，将js中的样式资源插入进行，添加到head中生效
        //   isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        //   //将css文件变成commonjs模块加载js中，里面内容是样式字符串
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       // 开启 module
        //       modules: true,
        //     },
        //   },
        //   'postcss-loader',
        // ],
        use: getStyleLoaders({
          importLoaders: 1,
          modules: true,
        }),
        exclude: [resolve(PROJECT_PATH, 'node_modules')],
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 1,
          },
          'less-loader',
        ),
      },
      {
        test: lessModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 1,
            // modules: true,
          },
          'less-loader',
        ),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 1,
          },
          'sass-loader',
        ),
      },
      {
        test: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 1,
            // modules: true,
          },
          'sass-loader',
        ),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './example/index.html'),
      filename: 'index.html',
      // cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
  ],
  // webpack 4 升级 webpack 5 出现的问题
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
}
