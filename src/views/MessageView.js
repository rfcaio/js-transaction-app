
import View from './View'

class MessageView extends View {
  template (message) {
    return `<div class="alert alert-info">${message}</div>`
  }
}

export default MessageView
