// Экран 'Интро' (Intro window)

import getTemplateNode from './intro-template.js';

import AbstractWindow from '../abstract-window.js';
import {changeWindow as renderCb} from '../utils.js';
import nextWindowCb from '../greeting/greeting-window.js';

const renderWindow = () => {
  const thisWindow = new AbstractWindow(renderCb);
  thisWindow.renderNodes([getTemplateNode(nextWindowCb)]);
};

export default renderWindow;
