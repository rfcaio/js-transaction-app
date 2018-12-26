
import DateHelper from '../helpers/DateHelper'
import View from './View'

class TransactionView extends View {
  template ({ transactions, volume }) {
    let body = transactions.map(transaction => `
      <tr>
        <td>${DateHelper.dateToString(transaction.date)}</td>
        <td>${transaction.amount}</td>
        <td>${transaction.value}</td>
        <td>${transaction.volume}</td>
      </tr>
    `).join('')

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
              <b>${volume}</b>
            </td>
          </tr>
        </tfoot>
      </table>
    `
  }
}

export default TransactionView
