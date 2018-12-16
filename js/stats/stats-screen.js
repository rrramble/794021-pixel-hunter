// 'Statistics' presenter

import StatsView from './stats-view.js';

import backWindowCb from '../greeting/greeting.js';
import {changeWindow} from '../utils.js';

export default class StatsScreen {
  constructor(gameState) {
    this._view = new StatsView(gameState);
    this._view.onCancelGameClick = Application.showGreeting;
  };

  get element() {
    return this._view.element;
  }

}
