// Game controller window

import getQuestions from './data/mock-questions.js';
import goBeginWindow from './greeting-window.js';
import goStatistics from './stats-window';
import GameData from './game-data.js';
import game1image from './game-1-window.js';
import game2images from './game-2-window.js';
import game3images from './game-3-window.js';
import {isAnswered, isAnswerCorrect} from './game-utils.js';
import {isAnsweredYes} from './utils.js';

const QUESTIONS_IS_NOT_SHAFFLED = true;
const CONTINUE_STARTED_GAME = true;
const MILLISECONDS_TICK = 1000;
const CONFIRMATION_TEXT = `Вы уверены что хотите начать игру заново и сбросить результаты?`;

const GameType = {
  '1': {
    cb: game1image,
  },
  '2': {
    cb: game2images,
  },
  '3': {
    cb: game3images,
  },
};

const confirmCancellingGame = () => {
  if (isAnsweredYes(CONFIRMATION_TEXT)) {
    goBeginWindow();
  }
};

const updateGameState = () => {
  gameData.setCurrentLevelAnswer(isAnswered(), isAnswerCorrect(gameData));
  gameData.increaseLevel();
  clearTimeout(timerID);
  if (gameData.isGameFinished()) {
    goStatistics();
  } else {
    run(CONTINUE_STARTED_GAME);
  }
};

const run = (continueTheGame) => {
  if (!continueTheGame) {
    gameData.init(gameQuestions, updateGameState);
  }
  timerID = setInterval(gameData.tickSecond.bind(gameData), MILLISECONDS_TICK);
  GameType[gameData.currentQuestionImageCount].cb(gameData.currentQuestion, gameData, confirmCancellingGame, updateGameState);
};


// Initializations

const gameQuestions = getQuestions(QUESTIONS_IS_NOT_SHAFFLED);
const gameData = GameData;
let timerID;

export default run;
