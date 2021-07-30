const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
  optimization: {
    // 第三方依赖打出来独立 chunk
    splitChunks: {
      chunks: 'all',
      name(module, chunks, cacheGroupKey) {
        const moduleFileName = module
          .identifier()
          .split('/')
          .reduceRight((item) => item)
        const allChunksNames = chunks.map((item) => item.name).join('~')
        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`
      },
    },
    // true 压缩js 代码
    minimize: true,
    minimizer: [
      // js压缩
      new TerserPlugin({
        // extractComments 设为 false 意味着去除所有注释，除了有特殊标记的注释，比如 @preserve 标记
        extractComments: false,
        terserOptions: {
          // pure_funcs 可以设置我们想要去除的函数，比如我就将代码中所有 console.log 去除
          compress: { pure_funcs: ['console.log'] },
        },
      }),
      // css 压缩
      new OptimizeCSSAssetsPlugin(),
    ].filter(Boolean),
  },
})
