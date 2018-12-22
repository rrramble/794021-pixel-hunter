// Универсальный экран 'View'

import {makeDomNode} from '../utils.js';

export default class AbstractView {
  constructor() {
  }

  bind(node) {
    return node;
  }

  get element() {
    if (!this._element) {
      this._element = this.bind(this.render());
    }
    return this._element;
  }

  render() {
    return makeDomNode(this.template);
  }

  get template() {
    throw new Error(`The method should be overriden.`);
  }

}
