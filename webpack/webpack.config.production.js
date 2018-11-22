import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './common.babel'

export default merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      SHOPIFY_STORE_URL: JSON.stringify('https://showstubs.myshopify.com'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})
