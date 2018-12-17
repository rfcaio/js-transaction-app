import 'bootstrap/dist/css/bootstrap.css'

import TransactionController from './controllers/TransactionController'

let transactionController = new TransactionController()

document.querySelector('form').addEventListener('submit', event => {
  transactionController.addTransaction(event)
})
