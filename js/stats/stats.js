// Экран 'Общая статистика по всем игрокам'

import StatsView from './stats-view.js';

import backWindowCb from '../greeting/greeting.js';
import {changeWindow} from '../utils.js';

export default (gameState) => {
  const thisWindow = new StatsView(gameState);
  thisWindow.onCancelGameClick = backWindowCb;
  changeWindow(thisWindow.element);
};
