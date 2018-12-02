// View class of 'Intro' window

import AbstractView from '../utils/abstract-view.js'
import {makeDomNode} from '../utils.js';

const EventListener = {
  SELECTOR: `.intro__asterisk`,
  TYPE: `click`,
};

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
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
  };

}
