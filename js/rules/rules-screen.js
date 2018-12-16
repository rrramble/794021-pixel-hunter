// 'Rules' presenter

import View from './rules-view.js';
import Application from '../application.js';

import {isUserNameValid} from '../game/game-utils.js';
import {enableFormInput} from '../utils.js';

const SEND_BUTTON_SELECTOR = `.rules__button`;

export default class RulesScreen {
  constructor() {
    this._view = new View();
    this._view.onBackScreenSelect = Application.showGreeting;
    this._view.onUsernameInput = this._checkUsernameValidity.bind(this);
    this._view.onSendUsername = this._sendUsername.bind(this);
  }

  _checkUsernameValidity(evt) {
    this._username = evt.srcElement.value;
    enableFormInput(this._sendButtonNode, isUserNameValid(this._username));
  }

  get element() {
    const element = this._view.element;
    if (!this._sendButtonNode) {
      this._sendButtonNode = element.querySelector(SEND_BUTTON_SELECTOR);
    }
    return element;
  }

  _sendUsername(evt) {
    evt.preventDefault();
    Application.showGame(this._username);
  }

}
