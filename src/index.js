import 'bootstrap/dist/css/bootstrap.css'

import TransactionModel from './models/TransactionModel'

let t = new TransactionModel(new Date('2015-12-8'), 4, 150)

console.log(t.date)
