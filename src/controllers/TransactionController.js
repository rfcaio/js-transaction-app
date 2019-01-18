
import Bind from '../helpers/Bind'
import DateHelper from '../helpers/DateHelper'
import MessageModel from '../models/MessageModel'
import MessageView from '../views/MessageView'
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
    this._init()
  }

  _create () {
    return new TransactionModel(
      DateHelper.stringToDate(this._dateInput.value),
      parseInt(this._amountInput.value, 10),
      parseFloat(this._valueInput.value)
    )
  }

  _importAll () {
    TransactionService.importAll(this._transactionList.transactions)
      .then(transactions => {
        transactions.forEach(({ _date, _amount, _value }) => {
          this._transactionList.add(new TransactionModel(new Date(_date), _amount, _value))
        })
      })
      .catch(({ message }) => {
        this._messageModel.message = message
      })
  }

  _init () {
    TransactionService.list()
      .then(transactions => {
        transactions.forEach(transaction => this._transactionList.add(transaction))
      })
      .catch(({ message }) => {
        this._messageModel.message = message
      })

    window.setInterval(() => {
      this._importAll()
    }, 3000)
  }

  _restartForm () {
    this._dateInput.value = ''
    this._amountInput.value = 1
    this._valueInput.value = 0
    this._dateInput.focus()
  }

  create (event) {
    event.preventDefault()
    let transaction = this._create()
    TransactionService.create(transaction)
      .then(message => {
        this._transactionList.add(transaction)
        this._messageModel.message = message
        this._restartForm()
      })
      .catch(({ message }) => {
        this._messageModel.message = message
      })
  }

  deleteAll () {
    TransactionService.deleteAll()
      .then(message => {
        this._messageModel.message = message
        this._transactionList.deleteAll()
      })
      .catch(({ message }) => {
        this._messageModel.message = message
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
