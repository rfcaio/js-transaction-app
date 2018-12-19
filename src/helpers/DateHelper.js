
class DateHelper {
  constructor () {
    throw Error('DateHelper => This class can not be instantiated.')
  }

  static dateToString (dateObject) {
    if (!(dateObject instanceof Date)) {
      throw Error('DateHelper.dateToString() => A valid date object should be passed.')
    }
    return `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`
  }

  static stringToDate (dateString) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      throw Error(`DateHelper.stringToDate() => The date (${dateString}) should be in yyyy-MM-dd format.`)
    }
    return new Date(dateString.split('-'))
  }
}

export default DateHelper
