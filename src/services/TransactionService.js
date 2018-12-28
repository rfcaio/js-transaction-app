
import HttpService from './HttpService'

class TransactionService {
  static _fromYear (year) {
    return HttpService.get(`/transactions/${year}`)
      .then(transactions => transactions)
      .catch(() => {
        throw Error(`A problem occurred and transactions from ${year} have been not loaded.`)
      })
  }

  static from2014 () {
    return TransactionService._fromYear('2014')
  }

  static from2015 () {
    return TransactionService._fromYear('2015')
  }

  static from2016 () {
    return TransactionService._fromYear('2016')
  }

  static getAll () {
    return Promise.all([
      TransactionService.from2016(),
      TransactionService.from2015(),
      TransactionService.from2014()
    ])
      .then(
        transactions => transactions.reduce(
          (transactionList, transactionsFromYear) => [...transactionList, ...transactionsFromYear], []
        )
      )
      .catch(error => {
        throw Error(error)
      })
  }
}

export default TransactionService
