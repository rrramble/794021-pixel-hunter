// View class of 'Rules' window

import AbstractView from '../utils/abstract-view.js';
import {makeDomNode} from '../utils.js';

const EventListeners = [{
  SELECTOR: `.back`,
  TYPE: `click`,
}, {
  SELECTOR: `.rules__input`,
  TYPE: `keyup`,
}, {
  SELECTOR: `.rules__button`,
  TYPE: `click`,
}];

export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
      </header>
      <section class="rules">
        <h2 class="rules__title">Правила</h2>
        <ul class="rules__description">
          <li>Угадай 10 раз для каждого изображения фото
            <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
            <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
          <li>Фотографиями или рисунками могут быть оба изображения.</li>
          <li>На каждую попытку отводится 30 секунд.</li>
          <li>Ошибиться можно не более 3 раз.</li>
        </ul>
        <p class="rules__ready">Готовы?</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </section>
    `;
  }

  render(cb1, cb2, cb3) {
    const eventListeners = [{
      selector: EventListeners[0].SELECTOR,
      type: EventListeners[0].TYPE,
      cb: cb1,
    }, {
      selector: EventListeners[1].SELECTOR,
      type: EventListeners[1].TYPE,
      cb: cb2,
    }, {
      selector: EventListeners[2].SELECTOR,
      type: EventListeners[2].TYPE,
      cb: cb3,
    }];
    return makeDomNode(this.template, eventListeners);
  }
}
