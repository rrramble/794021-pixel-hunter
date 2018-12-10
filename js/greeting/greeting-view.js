// View class of 'Intro' window

import AbstractView from '../utils/abstract-view.js';
import {makeDomNode} from '../utils.js';

const EventListener = {
  SELECTOR: `.greeting__continue`,
  TYPE: `click`,
};

export default class GreetingView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="greeting central--blur">
      <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
      <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
      <div class="greeting__challenge">
        <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
        <p class="greeting__challenge-text">Правила игры просты:</p>
        <ul class="greeting__challenge-list">
          <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
          <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
          <li>Фотореализм обманчив и коварен.</li>
          <li>Помни, главное — смотреть очень внимательно.</li>
        </ul>
      </div>
      <button class="greeting__continue" type="button">
        <span class="visually-hidden">Продолжить</span>
        <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-right"></use>
        </svg>
      </button>
    </section>
    `;
  }

  render(cb) {
    const eventListeners = [{
      selector: EventListener.SELECTOR,
      type: EventListener.TYPE,
      cb,
    }];
    return makeDomNode(this.template, eventListeners);
  }
} // Class
