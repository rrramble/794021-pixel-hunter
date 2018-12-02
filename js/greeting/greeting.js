// 'Greeting' window

import View from './greeting-view.js';
import nextWindowCb from '../rules/rules-window.js';
import {changeWindow as renderCb} from '../utils.js';

export default () => {
  const thisWindow = new View();
  renderCb(thisWindow.render(nextWindowCb));
};
