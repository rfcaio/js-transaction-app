const path = require('path')

module.exports = {
  devServer: {
    before: (app, server) => {
      app.get('/transactions/2014', (req, res) => {
        res.json([
          { _date: new Date(2014, 4, 1), _amount: 4, _value: 200 },
          { _date: new Date(2014, 3, 1), _amount: 5, _value: 575 },
          { _date: new Date(2014, 2, 1), _amount: 6, _value: 250 },
          { _date: new Date(2014, 1, 1), _amount: 6, _value: 125 }
        ])
      })

      app.get('/transactions/2015', (req, res) => {
        res.json([
          { _date: new Date(2015, 4, 1), _amount: 3, _value: 250 },
          { _date: new Date(2015, 3, 1), _amount: 4, _value: 500 },
          { _date: new Date(2015, 2, 1), _amount: 5, _value: 175 },
          { _date: new Date(2015, 1, 1), _amount: 6, _value: 150 }
        ])
      })

      app.get('/transactions/2016', (req, res) => {
        res.json([
          { _date: new Date(2016, 4, 1), _amount: 8, _value: 275 },
          { _date: new Date(2016, 3, 1), _amount: 8, _value: 125 },
          { _date: new Date(2016, 2, 1), _amount: 8, _value: 175 },
          { _date: new Date(2016, 1, 1), _amount: 8, _value: 675 }
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
