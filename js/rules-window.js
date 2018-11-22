// Экран 'Правила игры'

import GameWindow from './game-window.js';
import {changeWindow, enableFormInput} from './utils.js';
import backWindow from './greeting-window.js';
import nextWindow from './game-1-window.js';

const PREVIOUS_BUTTON_SELECTOR = `.back`;
const NAME_INPUT_SELECTOR = `.rules__input`;
const SEND_BUTTON_SELECTOR = `.rules__button`;

const data = {
  innerHtml: `
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
  `
};

let sendButtonNode;

const verifyName = (evt) => {
  if (!sendButtonNode) {
    sendButtonNode = document.querySelector(SEND_BUTTON_SELECTOR);
  }
  enableFormInput(sendButtonNode, isInputNameValid(evt.srcElement));
};

const sendForm = (evt) => {
  evt.preventDefault();
  sendButtonNode = undefined;
  nextWindow();
};

const isInputNameValid = (inputNode) => {
  return !!inputNode.value;
};

const run = () => {
  const newWindow = new GameWindow(data);
  newWindow.pushEventListener(PREVIOUS_BUTTON_SELECTOR, `click`, backWindow);
  newWindow.pushEventListener(NAME_INPUT_SELECTOR, `keyup`, verifyName);
  newWindow.pushEventListener(SEND_BUTTON_SELECTOR, `click`, sendForm);
  newWindow.setRenderFunction(changeWindow);
  return newWindow.render.bind(newWindow);
};

export default run();
