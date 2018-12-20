// View of an Error window

import AbstractView from './abstract-view.js';
import {changeWindow, removeSelector} from '../utils.js';

export default class ErrorView extends AbstractView {
  constructor() {
    super();
    this.start = (message) => {
      this._start(message);
    };
  }

  set message(message) {
    this._element = undefined;
    if (message) {
      this._message = message;
    }
  }

  _start(message) {
    if (message) {
      this.message = message;
    }
    changeWindow([this.element], true);
  }

  get template() {
    return `
      <section class="modal" id="modal__error">
        <div class="modal__inner">
          <h2 class="modal__title">Произошла ошибка!</h2>
          <p class="modal__text modal__text--error">${this._message}</p>
        </div>
      </section>
    `;
  }

}
