import webpack from 'webpack'
import merge from 'webpack-merge'
import path from 'path'
import common from './common.babel'

const root = process.cwd()
const build = path.join(root, 'build')

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: build,
    compress: true,
    port: 3000,
    hotOnly: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      SHOPIFY_STORE_URL: JSON.stringify('https://ticketmailerdev.myshopify.com'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})
