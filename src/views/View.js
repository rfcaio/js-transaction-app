
class View {
  constructor (element) {
    this._element = element
  }

  template (model) {
    throw Error('View.template() => You should implement this method.')
  }

  update (model) {
    this._element.innerHTML = this.template(model)
  }
}

export default View
