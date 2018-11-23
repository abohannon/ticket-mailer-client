import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const root = process.cwd()
const src = path.join(root, 'src')
const build = path.join(root, 'build')

export default {
  entry: {
    bundle: [
      '@babel/polyfill',
      './src/index.js',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: build,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(['build'], { root }),
    new HtmlWebpackPlugin({
      title: 'Caching',
      inject: true,
      template: 'public/index.html',
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
}
