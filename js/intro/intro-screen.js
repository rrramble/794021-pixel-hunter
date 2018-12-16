// 'Intro' presenter

import IntroView from './intro-view.js';
import Application from '../application.js';

export default class IntroScreen {
  constructor() {
    this._view = new IntroView();
    this._view.cb = Application.showGreeting;
  }

  get element() {
    return this._view.element;
  }

}
