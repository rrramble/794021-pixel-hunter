// Экран 'Интро'

import GameWindow from './game-window.js';
import {changeWindow} from './utils.js';
import nextWindow from './greeting-window.js';

const NEXT_BUTTON_SELECTOR = `.intro__asterisk`;
const data = {
  innerHtml: `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
  `,
};

const run = () => {
  const newWindow = new GameWindow(data);
  newWindow.pushEventListener(NEXT_BUTTON_SELECTOR, `click`, nextWindow);
  newWindow.setRenderFunction(changeWindow);
  return newWindow.render.bind(newWindow);
};

export default run();
