import webpack from 'webpack'
import merge from 'webpack-merge'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import common from './common.babel'

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    hotOnly: true,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      SHOPIFY_STORE_URL: JSON.stringify('https://ticketmailerdev.myshopify.com'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})
