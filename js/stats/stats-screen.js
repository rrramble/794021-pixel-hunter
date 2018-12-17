// 'Statistics' presenter

import StatsView from './stats-view.js';
import Application from '../application.js';

export default class StatsScreen {
  constructor(gameState) {
    this._view = new StatsView(gameState);
    this._view.onCancelGameClick = Application.showGreeting;
  }

  get element() {
    return this._view.element;
  }

  addEarlierStatistics(statistics) {
    this._view.addEarlierStatistics(statistics);
  }

}
