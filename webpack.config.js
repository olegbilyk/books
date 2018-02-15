const path = require('path')

module.exports = {
  context: path.resolve(__dirname, './src'),

  entry: {
    app: './app.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  devServer: {
    proxy: [{
      path: '/api/',
      target: 'http://localhost:3000'
    }],
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
