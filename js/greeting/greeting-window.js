// Экран 'Приветствие' (Greeting window)

import getTemplateNode from './greeting-template.js';

import AbstractWindow from '../abstract-window.js';
import nextWindowCb from '../rules/rules-window.js';
import {changeWindow as renderCb} from '../utils.js';

const renderWindow = () => {
  const thisWindow = new AbstractWindow(renderCb);
  thisWindow.renderNodes([getTemplateNode(nextWindowCb)]);
};

export default renderWindow;
