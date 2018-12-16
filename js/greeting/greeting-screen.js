// 'Greeting' presenter

import GreetingView from './greeting-view.js';
import Application from '../application.js';

export default class IntroScreen {
  constructor() {
    this._view = new GreetingView();
    this._view.cb = Application.showRules;
  }

  get element() {
    return this._view.element;
  }

}
