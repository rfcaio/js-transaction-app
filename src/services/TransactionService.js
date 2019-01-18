
import ConnectionFactory from './ConnectionFactory'
import HttpService from './HttpService'
import TransactionDAO from '../dao/TransactionDAO'

class TransactionService {
  static _loadFromYear (year) {
    return HttpService.get(`/transactions/${year}`)
      .then(transactions => transactions)
      .catch(() => {
        throw Error(`A problem occurred and transactions from ${year} have been not loaded.`)
      })
  }

  static create (transaction) {
    return ConnectionFactory.getConnection()
      .then(connection => new TransactionDAO(connection))
      .then(transactionDAO => transactionDAO.create(transaction))
      .then(() => {
        return 'Transaction created with success.'
      })
      .catch(error => {
        console.error(`TransactionService.create() => ${error}`)
        throw Error('Could not create transaction.')
      })
  }

  static deleteAll () {
    return ConnectionFactory.getConnection()
      .then(connection => new TransactionDAO(connection))
      .then(transactionDAO => transactionDAO.deleteAll())
      .then(() => {
        return 'All transactions deleted with success.'
      })
      .catch(error => {
        console.error(`TransactionService.delete() => ${error}`)
        throw Error('Could not delete transactions.')
      })
  }

  static importAll (transactionList) {
    return Promise.all([
      TransactionService._loadFromYear('2014'),
      TransactionService._loadFromYear('2015'),
      TransactionService._loadFromYear('2016')
    ])
      .then(
        transactions => transactions.reduce(
          (transactionList, transactionsFromYear) => [...transactionList, ...transactionsFromYear], []
        )
      )
      .then(transactions => {
        return transactions.filter(transaction => {
          return transactionList.every(
            _transaction => JSON.stringify(_transaction) !== JSON.stringify(transaction)
          )
        })
      })
      .catch(({ message }) => {
        console.error(`TransactionService.importAll() => ${message}`)
        throw Error(message)
      })
  }

  static list () {
    return ConnectionFactory.getConnection()
      .then(connection => new TransactionDAO(connection))
      .then(transactionDAO => transactionDAO.list())
      .catch(error => {
        console.error(`TransactionService.list() => ${error}`)
        throw Error('Could not list transactions.')
      })
  }
}

export default TransactionService
