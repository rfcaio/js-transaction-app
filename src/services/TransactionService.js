
import HttpService from './HttpService'

class TransactionService {
  static _loadFromYear (year) {
    return HttpService.get(`/transactions/${year}`)
      .then(transactions => transactions)
      .catch(() => {
        throw Error(`A problem occurred and transactions from ${year} have been not loaded.`)
      })
  }

  static importAll () {
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
      .catch(({ message }) => {
        console.error(`TransactionService.getAll() => ${message}`)
        throw Error(message)
      })
  }
}

export default TransactionService
