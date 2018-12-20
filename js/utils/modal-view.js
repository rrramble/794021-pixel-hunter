// Универсальный экран 'View'

import AbstractView from './abstract-view.js';

const EventListeners = [{
  SELECTOR: `.modal__close`,
  TYPE: `click`,
}, {
  SELECTOR: `.modal__btn--ok`,
  TYPE: `click`,
}, {
  SELECTOR: `.modal__btn--cancel`,
  TYPE: `click`,
}];

export default class ModalView extends AbstractView {
  constructor() {
    super();
  }

  bind(node) {
    node.querySelector(EventListeners[0].SELECTOR).
      addEventListener(EventListeners[0].TYPE, this.onCancel);

    node.querySelector(EventListeners[1].SELECTOR).
      addEventListener(EventListeners[1].TYPE, this.onOk);

    node.querySelector(EventListeners[2].SELECTOR).
      addEventListener(EventListeners[2].TYPE, this.onCancel);

    return node;
  }

  onOk() {
  }

  onCancel() {
  }

  get template() {
    return `
      <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn modal__btn--ok">Ок</button>
            <button class="modal__btn modal__btn--cancel">Отмена</button>
          </div>
        </form>
      </section>
    `;
  }

}
