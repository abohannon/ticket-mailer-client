import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './common.babel'

export default merge(common, {
  mode: 'production',
  devtool: 'cheap-source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      minSize: 30000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      SHOPIFY_STORE_URL: JSON.stringify('https://showstubs.myshopify.com'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})
