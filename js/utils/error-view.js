// View of 'Error' window

import AbstractView from './abstract-view.js';
import {changeWindow, removeSelector} from '../utils.js';

const MODAL_CLASS = `modal__error`;
const SHOW_DURATION = 2000;

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

  clear() {
    removeSelector(`.${MODAL_CLASS}`);
    this._isShown = false;
  }

  show() {
    this._isShown = true;
    changeWindow([this.element], true);
    setTimeout(this.clear.bind(this), SHOW_DURATION);
  }

  _start(message) {
    if (message) {
      this.message = message;
    }
    if (!this._isShown === true) {
      this.show();
    }
  }

  get template() {
    return `
      <section class="modal ${MODAL_CLASS}">
        <div class="modal__inner">
          <h2 class="modal__title">Произошла ошибка!</h2>
          <p class="modal__text modal__text--error">${this._message}</p>
        </div>
      </section>
    `;
  }

}
