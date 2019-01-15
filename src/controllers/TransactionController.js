
import Bind from '../helpers/Bind'
import ConnectionFactory from '../services/ConnectionFactory'
import DateHelper from '../helpers/DateHelper'
import MessageModel from '../models/MessageModel'
import MessageView from '../views/MessageView'
import TransactionDAO from '../dao/TransactionDAO'
import TransactionListModel from '../models/TransactionListModel'
import TransactionModel from '../models/TransactionModel'
import TransactionService from '../services/TransactionService'
import TransactionView from '../views/TransactionView'

class TransactionController {
  constructor () {
    let getById = document.getElementById.bind(document)

    this._selectedColumn = ''
    this._dateInput = getById('date')
    this._amountInput = getById('amount')
    this._valueInput = getById('value')
    this._messageModel = new Bind(new MessageModel(), new MessageView(getById('message-view')), 'message')
    this._transactionList = new Bind(
      new TransactionListModel(),
      new TransactionView(getById('transaction-view')),
      'add',
      'deleteAll',
      'reverseTransactions',
      'sortTransactions'
    )

    ConnectionFactory.getConnection()
      .then(connection => new TransactionDAO(connection))
      .then(transactionDAO => transactionDAO.list())
      .then(transactions => {
        transactions.forEach(transaction => this._transactionList.add(transaction))
      })
      .catch(error => {
        console.error(error)
        this._messageModel.message = 'Could not load transactions.'
      })
  }

  _createTransaction () {
    return new TransactionModel(
      DateHelper.stringToDate(this._dateInput.value),
      parseInt(this._amountInput.value, 10),
      parseFloat(this._valueInput.value)
    )
  }

  _restartForm () {
    this._dateInput.value = ''
    this._amountInput.value = 1
    this._valueInput.value = 0
    this._dateInput.focus()
  }

  addTransaction (event) {
    event.preventDefault()
    let transaction = this._createTransaction()
    ConnectionFactory.getConnection()
      .then(connection => new TransactionDAO(connection))
      .then(transactionDAO => transactionDAO.add(transaction))
      .then(() => {
        this._transactionList.add(transaction)
        this._messageModel.message = 'Transaction added with success.'
        this._restartForm()
      })
      .catch(error => {
        this._messageModel.message = error
      })
  }

  importTransactions () {
    TransactionService.importAll()
      .then(transactions => {
        transactions.forEach(({ date, amount, value }) => {
          this._transactionList.add(new TransactionModel(DateHelper.stringToDate(date), amount, value))
        })
        this._messageModel.message = 'Transactions loaded with success.'
      })
      .catch(({ message }) => {
        this._messageModel.message = message
      })
  }

  deleteTransactions () {
    ConnectionFactory.getConnection()
      .then(connection => new TransactionDAO(connection))
      .then(transactionDAO => transactionDAO.remove())
      .then(message => {
        this._messageModel.message = message
        this._transactionList.deleteAll()
      })
      .catch(error => {
        this._messageModel.message = error
      })
  }

  orderBy (columnName) {
    if (this._selectedColumn === columnName) {
      this._transactionList.reverseTransactions()
    } else {
      this._transactionList.sortTransactions((a, b) => a[columnName] - b[columnName])
      this._selectedColumn = columnName
    }
  }
}

export default TransactionController
