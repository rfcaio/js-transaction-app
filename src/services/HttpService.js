
class HttpService {
  static _handleErrors (response) {
    if (response.ok) {
      return response
    }
    console.error(`HttpService => ${response.statusText}.`)
    throw Error(response.statusText)
  }

  static get (url) {
    return window.fetch(url)
      .then(response => HttpService._handleErrors(response))
      .then(response => response.json())
  }
}

export default HttpService
