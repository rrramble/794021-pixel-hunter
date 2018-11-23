// Универсальный экран

export default class AbstractWindow {
  constructor(templates) {
    this._templates = [];
    templates.forEach((template) => {
      this._templates.push(template);
    });
  }

  pushEventListeners(htmlSelector, eventType, cb) {
    if (!this._eventListeners) {
      this._eventListeners = [];
    }
    this._eventListeners.push({htmlSelector, eventType, cb});
  }

  _addEventListeners() {
    this._eventListeners.forEach((item) => {
      item.htmlNodes = document.querySelectorAll(item.htmlSelector);
      if (item.htmlNodes) {
        Array.from(item.htmlNodes).forEach((node) => {
          node.addEventListener(item.eventType, item.cb);
        });
      }
    });
  }

  setRenderFunction(cb) {
    this._render = cb;
  }

  run() {
    this._templates.forEach((template, index) => {
      this._render(template, index !== 0);
    });
    this._addEventListeners();
  }
}
