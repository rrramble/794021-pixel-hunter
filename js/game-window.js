// Универсальный экран

export default class GameWindow {
  constructor(data) {
    this.innerHtml = data.innerHtml;
    this.eventListeners = [];
  }

  pushEventListener(htmlSelector, eventType, cb) {
    this.eventListeners.push({htmlSelector, eventType, cb});
  }

  _addEventListeners() {
    this.eventListeners.forEach((el) => {
      el.htmlNode = document.querySelector(el.htmlSelector);
      if (el.htmlNode) {
        el.htmlNode.addEventListener(el.eventType, el.cb);
      }
    });
  }

  setRenderFunction(cb) {
    this._renderFunction = cb;
  }

  render() {
    this._renderFunction(this.innerHtml);
    this._addEventListeners();
  }
}
