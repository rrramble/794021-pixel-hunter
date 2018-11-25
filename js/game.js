// Game controller window

import getQuestions from './data/mock-questions.js';
import goBeginWindow from './greeting-window.js';
import goStatistics from './stats-window';
import GameData from './game-data.js';
import {isAnswered, isAnswerCorrect} from './game-utils.js';
import {isAnsweredYes} from './utils.js';

const QUESTIONS_IS_NOT_SHAFFLED = true;
const CONTINUE_STARTED_GAME = true;
const MILLISECONDS_TICK = 1000;
const CONFIRMATION_TEXT = `Вы уверены что хотите начать игру заново и сбросить результаты?`;

const updateGameStateCb = () => {
  gameData.setCurrentLevelAnswer(isAnswered(), isAnswerCorrect(gameData));
  gameData.increaseLevel();
  if (gameData.isGameFinished()) {
    clearTimeout(timerID);
    goStatistics();
  } else {
    run(CONTINUE_STARTED_GAME);
  }
};

const confirmNewUserPlayingCb = () => {
  if (isAnsweredYes(CONFIRMATION_TEXT)) {
    goBeginWindow();
  }
};

const run = (continueTheGame) => {
  if (!continueTheGame) {
    gameData.init(gameQuestions, updateGameStateCb);
    timerID = setInterval(gameData.tickSecond.bind(gameData), MILLISECONDS_TICK);
  }
  gameData.cb(gameData.currentQuestion, gameData, confirmNewUserPlayingCb, updateGameStateCb);
};


// Initializations0

const gameQuestions = getQuestions(QUESTIONS_IS_NOT_SHAFFLED);
const gameData = GameData;
let timerID;

export default run;
