// Экран 'Интро'

import {changeWindow} from './utils.js';
import greetingWindow from './greeting-window.js';

const NEXT_BUTTON_SELECTOR = `.intro__asterisk`;
let nextButtonNode;

const HTML_TEXT = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;

const addEventListeners = () => {
  addNextWindowListener();
};

const addNextWindowListener = () => {
  nextButtonNode = document.querySelector(NEXT_BUTTON_SELECTOR);
  nextButtonNode.addEventListener(`click`, () => {
    greetingWindow();
  });
};

const run = () => {
  changeWindow(HTML_TEXT);
  addEventListeners();
};

export default run;
