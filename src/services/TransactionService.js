
class TransactionService {
  static import (fn) {
    let xhr = new window.XMLHttpRequest()
    xhr.open('GET', '/transactions/')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        fn(null, JSON.parse(xhr.responseText))
      } else if (xhr.status !== 200) {
        fn('A problem occurred and transactions have been not loaded.')
      }
    }
    xhr.send()
  }
}

export default TransactionService
