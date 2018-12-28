
class HttpService {
  static get (url) {
    return new Promise((resolve, reject) => {
      let xhr = new window.XMLHttpRequest()
      xhr.open('GET', url)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status !== 200) {
          reject(Error('A problem occurred.'))
        }
      }
      xhr.send()
    })
  }
}

export default HttpService
