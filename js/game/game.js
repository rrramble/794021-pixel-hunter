// Game controller window

import GameView from './game-view.js';
import GameData from './game-data.js';

import {getAnswers} from './game-utils.js';
import getQuestions from '../data/mock-questions.js';
import goBeginWindow from '../greeting/greeting.js';
import goStatistics from '../stats/stats.js';
import {changeWindow, getCountInputsChecked, isAnsweredYes} from '../utils.js';

const QUESTIONS_IS_NOT_SHAFFLED = true;
const CONTINUE_STARTED_GAME = true;
const MILLISECONDS_TICK = 1000;
const GAME_CANCELLING_CONFIRMATION_TEXT = `Вы уверены что хотите начать игру заново и сбросить результаты?`;
const INPUTS_SELECTOR = `.game__content .game__option input`;

const gameQuestions = getQuestions(QUESTIONS_IS_NOT_SHAFFLED);
const gameData = GameData;
let timerID;

const confirmCancellingGame = () => {
  if (isAnsweredYes(GAME_CANCELLING_CONFIRMATION_TEXT)) {
    clearTimeout(timerID);
    goBeginWindow();
  }
};

const processAnswer = (evt) => {
  clearTimeout(timerID);
  gameData.setCurrentLevelAnswer(getAnswers(evt, gameData.currentQuestionImageCount));
  gameData.increaseLevel();
  if (gameData.isGameFinished()) {
    goStatistics(gameData);
    return;
  } else {
    run(CONTINUE_STARTED_GAME);
  }
};

const verifyUserAnswerClick = (evt) => {
  const inputNodes = [...document.querySelectorAll(INPUTS_SELECTOR)];
  if (
    (inputNodes.length && isAllInputsSelected(inputNodes)) ||
    !inputNodes.length) {
    processAnswer(evt);
  }
};

const isAllInputsSelected = (inputNodes) => {
  return getCountInputsChecked(inputNodes) >= gameData.currentQuestionImageCount;
};

const run = (isToBeContinued) => {
  if (!isToBeContinued) {
    gameData.init(gameQuestions, processAnswer);
  }
  timerID = setInterval(gameData.tickSecond.bind(gameData), MILLISECONDS_TICK);

  const thisWindow = new GameView(gameData);
  thisWindow.onAnswerClick = verifyUserAnswerClick;
  thisWindow.onCancelGameClick = confirmCancellingGame;
  changeWindow(thisWindow.element);
};

export default run;
