
import View from './View'

class MessageView extends View {
  template ({ message }) {
    return message === '' ? '' : `<div>${message}</div>`
  }
}

export default MessageView
