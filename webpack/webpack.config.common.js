import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const root = process.cwd()
const src = path.join(root, 'src')
const build = path.join(root, 'build')

// For caching
const vendor = [
  'react',
  'react-dom',
  'react-router',
  'react-redux',
  'redux',
]

export default {
  entry: {
    bundle: [
      '@babel/polyfill',
      './src/index.js',
    ],
    vendor,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          babelrc: true,
          presets: [
            ['@babel/preset-env', {
              modules: false,
            }],
            '@babel/react',
          ],
          env: {
            test: {
              presets: [['@babel/preset-env'], '@babel/react'],
            },
          },
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
    filename: '[hash].bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
  ],
}
