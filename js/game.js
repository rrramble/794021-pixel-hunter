// Game controller window

import getQuestions from './data/mock-questions.js';
import game1image from './game-1-window.js';
import game2images from './game-2-window.js';
import game3images from './game-3-window.js';
import goBeginWindow from './greeting-window.js';
import goStatistics from './stats-window';
import {getLevelWithResult} from './game-utils.js';

const QUESTIONS_IS_NOT_SHAFFLED = true;
const MAX_LIVES = 3;
const MAX_ANSWER_TIME = 30;
const SAME_SERIES_SET = true;

const GameTypes = {
  '1': {
    GAME_CB: game1image,
  },
  '2': {
    GAME_CB: game2images,
  },
  '3': {
    GAME_CB: game3images,
  },
};

let gameState;


// Functions

const initializeGameState = (questions) => {
  const levels = questions.map((question) => {
    return {
      secondsLeft: MAX_ANSWER_TIME,
      question,
    };
  });
  const state = {
    MAX_LIVES,
    currentLevel: 0,
    restLives: MAX_LIVES,
    levels,
  };
  return state;
};

const updateGameStateCb = () => {
  const level = gameState.levels[gameState.currentLevel];
  gameState.levels[gameState.currentLevel] = getLevelWithResult(level);
  if (++gameState.currentLevel < gameState.levels.length) {
    run(SAME_SERIES_SET);
  } else {
    goStatistics();
  }
};

const confirmNewUserPlayingCb = () => {
  if (!shouldContinueWithCurrentGame) {   // Need a check to cancel current score
    goBeginWindow();
  }
};

const run = (isTheSameSeriesSet) => {
  if (!isTheSameSeriesSet) {
    gameState = initializeGameState(gameQuestions);
  }
  const question = gameState.levels[gameState.currentLevel].question;
  const gameCb = GameTypes[question.length].GAME_CB;
  gameCb(question, gameState, confirmNewUserPlayingCb, updateGameStateCb);
};


// Initialization

const gameQuestions = getQuestions(QUESTIONS_IS_NOT_SHAFFLED);
export default run;
