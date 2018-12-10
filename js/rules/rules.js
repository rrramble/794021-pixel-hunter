// 'Rules' window

import View from './rules-view.js';
import nextWindowCb from '../game/game.js';
import backWindowCb from '../greeting/greeting.js';
import {isUserNameValid} from '../game/game-utils.js';

import {changeWindow as renderCb, enableFormInput} from '../utils.js';

const SEND_BUTTON_SELECTOR = `.rules__button`;
let sendButtonNode;

const enableSendingUserName = (evt) => {
  enableFormInput(sendButtonNode, isUserNameValid(evt.srcElement.value));
};

const sendUserName = (evt) => {
  evt.preventDefault();
  nextWindowCb();
};

export default () => {
  const thisWindow = new View();
  renderCb(thisWindow.render(backWindowCb, enableSendingUserName, sendUserName));
  sendButtonNode = document.querySelector(SEND_BUTTON_SELECTOR);
};
