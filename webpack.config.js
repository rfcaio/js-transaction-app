const path = require('path')

module.exports = {
  devServer: {
    before: (app, server) => {
      app.get('/transactions/2014', (req, res) => {
        res.json([
          { date: '2014-04-01', amount: 4, value: 200 },
          { date: '2014-03-01', amount: 5, value: 575 },
          { date: '2014-02-01', amount: 6, value: 250 },
          { date: '2014-01-01', amount: 6, value: 125 }
        ])
      })

      app.get('/transactions/2015', (req, res) => {
        res.json([
          { date: '2015-04-01', amount: 3, value: 250 },
          { date: '2015-03-01', amount: 4, value: 500 },
          { date: '2015-02-01', amount: 5, value: 175 },
          { date: '2015-01-01', amount: 6, value: 150 }
        ])
      })

      app.get('/transactions/2016', (req, res) => {
        res.json([
          { date: '2016-04-01', amount: 8, value: 275 },
          { date: '2016-03-01', amount: 8, value: 125 },
          { date: '2016-02-01', amount: 8, value: 175 },
          { date: '2016-01-01', amount: 8, value: 675 }
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
