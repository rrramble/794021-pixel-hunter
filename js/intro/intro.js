// 'Intro' window

import IntroView from './intro-view.js';
import {changeWindow as renderCb} from '../utils.js';
import nextWindowCb from '../greeting/greeting-window.js';

export default () => {
  const thisWindow = new IntroView();
  renderCb(thisWindow.render(nextWindowCb));
};
