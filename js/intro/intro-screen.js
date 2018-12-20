// Presenter of the 'Intro' window

import IntroView from './intro-view.js';

export default class IntroScreen {
  constructor() {
    this._view = new IntroView();
  }

  get element() {
    return this._view.element;
  }

}
