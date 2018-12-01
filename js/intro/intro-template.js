// Template for the 'Intro' window

import {makeDomNode} from '../utils.js';

const NEXT_BUTTON_SELECTOR = `.intro__asterisk`;

const getTemplate = () => {
  return `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
  `;
};

const getTemplateNode = (nextWindowCb) => {
  const eventListeners = [{
    selector: NEXT_BUTTON_SELECTOR,
    type: `click`,
    cb: nextWindowCb,
  }];

  return makeDomNode(getTemplate(), eventListeners);
};

export default getTemplateNode;
