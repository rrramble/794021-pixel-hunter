// Game controller window

import GameData from './game-data.js';
import gameWindow from './game-window.js';
import {isAnswered, isAnswerCorrect} from './game-utils.js';

import getQuestions from '../data/mock-questions.js';
import goBeginWindow from '../greeting/greeting-window.js';
import goStatistics from '../stats/stats-window';
import {isAnsweredYes} from '../utils.js';

const QUESTIONS_IS_NOT_SHAFFLED = true;
const CONTINUE_STARTED_GAME = true;
const MILLISECONDS_TICK = 1000;
const CONFIRMATION_TEXT = `Вы уверены что хотите начать игру заново и сбросить результаты?`;
const gameQuestions = getQuestions(QUESTIONS_IS_NOT_SHAFFLED);
const gameData = GameData;
let timerID;

const confirmCancellingGame = () => {
  if (isAnsweredYes(CONFIRMATION_TEXT)) {
    clearTimeout(timerID);
    goBeginWindow();
  }
};

const updateGameState = () => {
  gameData.setCurrentLevelAnswer(isAnswered(), isAnswerCorrect(gameData));
  gameData.increaseLevel();
  clearTimeout(timerID);
  if (gameData.isGameFinished()) {
    goStatistics(gameData);
  } else {
    run(CONTINUE_STARTED_GAME);
  }
};

const run = (isToBeContinued) => {
  if (!isToBeContinued) {
    gameData.init(gameQuestions, updateGameState);
  }
  timerID = setInterval(gameData.tickSecond.bind(gameData), MILLISECONDS_TICK);
  gameWindow(gameData, confirmCancellingGame, updateGameState);
};

export default run;
