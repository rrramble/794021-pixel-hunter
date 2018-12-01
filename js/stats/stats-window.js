// Экран 'Общая статистика по всем игрокам'

import {getTemplateHeaderNode, getTemplateFieldNode} from './stats-template.js';

import backWindowCb from '../greeting/greeting-window.js';
import AbstractWindow from '../abstract-window.js';
import {changeWindow} from '../utils.js';

const renderWindow = (gameState) => {
  const thisWindow = new AbstractWindow(changeWindow);
  const nodes = [
    getTemplateHeaderNode(backWindowCb),
    getTemplateFieldNode(gameState),
  ];
  thisWindow.renderNodes(nodes);
};

export default renderWindow;
