// Presenter of the 'Statistics' window

import StatsView from './stats-view.js';
import Application from '../application.js';

export default class StatsScreen {
  constructor(gameState) {
    this._view = new StatsView(gameState);
    this._view.onCancelGameClick = Application.showGreeting;
  }

  addEarlierStatistics(statistics) {
    this._view.addEarlierStatistics(statistics);
  }

  get element() {
    return this._view.element;
  }

}
