// Game presenter

import GameHeaderView from './game-header-view.js';
import GameFieldView from './game-field-view.js';
import ModalView from '../utils/modal-view.js';

import Application from '../application.js';
import {changeWindow, replaceChildNode, getCountInputsChecked} from '../utils.js';
import {getAnswers} from './game-utils.js';

const CONTINUE_STARTED_GAME = true;
const MILLISECONDS_TICK = 1000;
const INPUTS_SELECTOR = `.game__content .game__option input`;

export default class GameScreen {
  constructor(gameModel) {
    this._gameModel = gameModel;
    this._timerID = null;
    this._reinitHeaderView();
    this._reinitFieldView();

    this._gameModel.onTickSecond = () => {
      this._headerView.updateTime();
      replaceChildNode(this._headerView.element, 0);
    };

    this._gameModel.onTimeElapsed = () => {
      this._processAnswer();
    };

  }

  _reinitHeaderView() {
    this._headerView = new GameHeaderView(this._gameModel);
    this._headerView.onCancelGameClick = () => {
      this._confirmCancellingGame();
    };
  }

  _reinitFieldView() {
    this._fieldView = new GameFieldView(this._gameModel);
    this._fieldView.onAnswerClick = (evt) => {
      this._verifyUserAnswerClick(evt);
    };
  }

  _confirmCancellingGame() {
    const modalView = new ModalView();
    modalView.onOk = () => {
      clearTimeout(this._timerID);
      modalView.clear();
      Application.showGreeting();
    };
    modalView.onCancel = () => modalView.clear();
    changeWindow([modalView.element], true);
  }

  get elements() {
    return [
      this._headerView.element,
      this._fieldView.element
    ];
  }

  _isAllInputsSelected(inputNodes) {
    return getCountInputsChecked(inputNodes) >= this._gameModel.currentAnswersImageCount;
  }

  _processAnswer(evt) {
    clearTimeout(this._timerID);
    const answers = getAnswers(evt, this._gameModel.currentAnswersImageCount);
    this._gameModel.pushCurrentLevelAnswer(answers);
    this._gameModel.increaseLevel();
    if (this._gameModel.isGameFinished()) {
      Application.showStats(this._gameModel);
      return;
    }
    this.start(CONTINUE_STARTED_GAME);
  }

  start(isToBeContinued) {
    if (isToBeContinued) {
      this._reinitHeaderView();
      this._reinitFieldView();
    } else {
      this._gameModel.reinit();
    }

    changeWindow(this.elements);

    this._timerID = setInterval(() => {
      this._gameModel.tickSecond();
    }, MILLISECONDS_TICK);
  }

  _verifyUserAnswerClick(evt) {
    const inputNodes = [...document.querySelectorAll(INPUTS_SELECTOR)];
    if (
      (inputNodes.length && this._isAllInputsSelected(inputNodes)) ||
      !inputNodes.length) {
      this._processAnswer(evt);
    }
  }

}
