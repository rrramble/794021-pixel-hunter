// Game controller window

import getQuestions from './data/mock-questions.js';
import goBeginWindow from './greeting-window.js';
import goStatistics from './stats-window';
import {getLevelWithResult} from './game-utils.js';
import GameData from './game-data.js';

const QUESTIONS_IS_NOT_SHAFFLED = true;
const CONTINUE_STARTED_GAME = true;
const SECONDS_TICK = 1;

const isAnswered = () => {
  return Math.random() < 0.85; // Mock result
}

const isAnswerCorrect = () => {
  return Math.random() < 0.85; // Mock result
}

const updateGameStateCb = () => {
  gameData.setCurrentLevelAnswer(isAnswered(), isAnswerCorrect());
  gameData.increaseLevel();
  if (gameData.isGameFinished()) {
    goStatistics();
    clearTimeout(timerID);
  } else {
    run(CONTINUE_STARTED_GAME);
  }
};

const confirmNewUserPlayingCb = () => {
  if (!shouldContinueWithCurrentGame) {   // Need a check to cancel current score
    goBeginWindow();
  }
};

const run = (continueTheGame) => {
  if (!continueTheGame) {
    gameData.init(gameQuestions, updateGameStateCb);
    timerID = setInterval(gameData.timeTick.bind(gameData), SECONDS_TICK * 1000);
  }
  gameData.cb(gameData.currentQuestion, gameData, confirmNewUserPlayingCb, updateGameStateCb);
};


// Initializations

const gameQuestions = getQuestions(QUESTIONS_IS_NOT_SHAFFLED);
const gameData = GameData;
let timerID;

export default run;
