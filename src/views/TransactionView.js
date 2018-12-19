
import DateHelper from '../helpers/DateHelper'

class TransactionView {
  constructor (element) {
    this._element = element
  }

  _template (transactionModel) {
    let body = transactionModel.map(transaction => `
      <tr>
        <td>${DateHelper.dateToString(transaction.date)}</td>
        <td>${transaction.amount}</td>
        <td>${transaction.value}</td>
        <td>${transaction.volume}</td>
      </tr>
    `).join('')

    let total = transactionModel.reduce((total, { volume }) => total + volume, 0)

    return `
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>DATE</th>
            <th>AMOUNT</th>
            <th>VALUE</th>
            <th>VOLUME</th>
          </tr>
        </thead>

        <tbody>${body}</tbody>

        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td>
              <b>${total}</b>
            </td>
          </tr>
        </tfoot>
      </table>
    `
  }

  update (transactionModel) {
    this._element.innerHTML = this._template(transactionModel)
  }
}

export default TransactionView
