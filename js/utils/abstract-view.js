// Универсальный экран 'View'

export default class AbstractView {
  constructor() {
  }

  bind() {
  }

  get element() {
    if (!this._element) {
      this._element = this.render(this.template);
      this._element = this.bind(this._element);
    }
    return this._element;
  }

  get template() {
    throw new Error(`The method should be overriden.`);
  }

  render() {
  }

}
