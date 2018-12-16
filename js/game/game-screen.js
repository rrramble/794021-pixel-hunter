// Game presenter

import GameView from './game-view.js';
import Application from '../application.js';
import {changeWindow, getCountInputsChecked, isAnsweredYes} from '../utils.js';
import {getAnswers} from './game-utils.js';

const CONTINUE_STARTED_GAME = true;
const MILLISECONDS_TICK = 1000;
const GAME_CANCELLING_CONFIRMATION_TEXT = `Вы уверены что хотите начать игру заново и сбросить результаты?`;
const INPUTS_SELECTOR = `.game__content .game__option input`;

export default class GameScreen {
  constructor(gameModel) {
    this._processAnswer = (evt) => {
      clearTimeout(this._timerID);
      this._gameModel.setCurrentLevelAnswer(getAnswers(evt, this._gameModel.currentQuestionImageCount));
      this._gameModel.increaseLevel();
      if (this._gameModel.isGameFinished()) {
        Application.showStats(this._gameModel);
        return;
      } else {
        this.start(CONTINUE_STARTED_GAME);
      }
    };
    this._gameModel = gameModel;
    this._gameModel.init(this._processAnswer);
    this._view = new GameView(this._gameModel);
    this._timerID = null;
  }

  _confirmCancellingGame() {
    if (isAnsweredYes(GAME_CANCELLING_CONFIRMATION_TEXT)) {
      clearTimeout(this._timerID);
      Application.showGreeting();
    }
  }

  get element() {
    return this._view.element;
  }

  _isAllInputsSelected(inputNodes) {
    return getCountInputsChecked(inputNodes) >= this._gameModel.currentQuestionImageCount;
  }

  start(isToBeContinued) {
    if (!isToBeContinued) {
      this._gameModel.init(this._gameQuestions, this._processAnswer);
    }
    this._timerID = setInterval(this._gameModel.tickSecond.bind(this._gameModel), MILLISECONDS_TICK);

    const view = new GameView(this._gameModel);
    view.onAnswerClick = this._verifyUserAnswerClick.bind(this);
    view.onCancelGameClick = this._confirmCancellingGame.bind(this);
    changeWindow(view.element);
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
