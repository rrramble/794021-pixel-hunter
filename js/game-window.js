// Универсальный экран

export default class GameWindow {
  constructor(data) {
    this.innerHtml = data.innerHtml;
    this.eventListeners = [];
  }

  pushEventListener(htmlSelector, eventType, cb) {
    this.eventListeners.push({htmlSelector, eventType, cb});
  }

  addEventListeners() {
    this.eventListeners.forEach((el) => {
      el.htmlNode = document.querySelector(el.htmlSelector);
      if (el.htmlNode) {
        el.htmlNode.addEventListener(el.eventType, el.cb);
      }
    });
  }

  setRenderFunction(cb) {
    this.renderFunction = cb;
  }

  render() {
    this.renderFunction(this.innerHtml);
    this.addEventListeners();
  }
}
