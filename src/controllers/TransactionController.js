
import TransactionModel from '../models/TransactionModel'

class TransactionController {
  constructor () {
    let getById = document.getElementById.bind(document)

    this._dateInput = getById('date')
    this._amountInput = getById('amount')
    this._valueInput = getById('value')
  }

  addTransaction (event) {
    event.preventDefault()

    console.log(new TransactionModel(
      new Date(this._dateInput.value.split('-')),
      this._amountInput.value,
      this._valueInput.value
    ))
  }
}

export default TransactionController
