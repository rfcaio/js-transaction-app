const path = require('path')

module.exports = {
  devServer: {
    before: function (app, server) {
      app.get('/transactions', function (req, res) {
        res.json([
          { date: '1958-01-30', amount: 60, value: 500 },
          { date: '1959-07-11', amount: 59, value: 500 },
          { date: '1992-04-09', amount: 26, value: 500 },
          { date: '1995-11-03', amount: 23, value: 500 }
        ])
      })
    },
    contentBase: './dist',
    port: 8001
  },
  devtool: 'inline-source-map',
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.html$/, use: ['html-loader'] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, use: ['file-loader'] }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  watch: true
}
