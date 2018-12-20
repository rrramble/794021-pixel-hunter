// View of the 'Intro' window

import AbstractView from '../utils/abstract-view.js';
import {makeDomNode} from '../utils.js';

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get element() {
    return this._render();
  }

  _render() {
    return makeDomNode(this.template);
  }

  get template() {
    return `
      <section class="intro">
        <p class="intro__motto">Загрузка...</p>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>
    `;
  }

}
