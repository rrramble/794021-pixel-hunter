// Экран 'Правила игры'

import getTemplateNode from './rules-template.js';

import AbstractWindow from '../abstract-window.js';
import backWindowCb from '../greeting/greeting.js';
import nextWindowCb from '../game/game.js';
import {changeWindow as renderCb, enableFormInput} from '../utils.js';

const SEND_BUTTON_SELECTOR = `.rules__button`;
let sendButtonNode;

const verifyName = (evt) => {
  const isInputNameValid = (inputNode) => {
    return !!inputNode.value;
  };

  if (!sendButtonNode) {
    sendButtonNode = document.querySelector(SEND_BUTTON_SELECTOR);
  }
  enableFormInput(sendButtonNode, isInputNameValid(evt.srcElement));
};

const sendForm = (evt) => {
  evt.preventDefault();
  sendButtonNode = undefined;
  nextWindowCb();
};

const renderWindow = () => {
  const thisWindow = new AbstractWindow(renderCb);
  const nodes = [getTemplateNode([backWindowCb, verifyName, sendForm])];
  thisWindow.renderNodes(nodes);
};

export default renderWindow;
