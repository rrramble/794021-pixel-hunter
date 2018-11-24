// Экран управляющий игрой

import getQuestions from './data/mock-questions.js';
import game1image from './game-1-window.js';
import game2images from './game-2-window.js';
import game3images from './game-3-window.js';
import goBegin from './greeting-window.js';
import goStatistics from './stats-window';
import {getLevelWithResult} from './game-utils.js';

const QUESTIONS_IS_NOT_SHAFFLED = true;
const MAX_LIVES = 3;
const MAX_ANSWER_TIME = 30;
const SAME_SERIES_SET = true;

const GameTypes = {
  '1': {
    gameCb: game1image,
  },
  '2': {
    gameCb: game2images,
  },
  '3': {
    gameCb: game3images,
  },
};

const questions = getQuestions(QUESTIONS_IS_NOT_SHAFFLED);
let gameState;

const initializeGameState = () => {
  const levels = questions.map((question) => {
    return {
      secondsLeft: MAX_ANSWER_TIME,
      question,
    };
  });
  gameState = {
    currentLevel: 0,
    restLives: MAX_LIVES,
    levels,
  };
};

const updateGameState = () => {
  const level = gameState.levels[gameState.currentLevel];
  gameState.levels[gameState.currentLevel] = getLevelWithResult(level);
  if (++gameState.currentLevel < gameState.levels.length) {
    run(SAME_SERIES_SET);
  } else {
    goStatistics();
  }
};

const playFromStart = () => {
  initializeGameState();
  goBegin();
};

initializeGameState();

const run = (isTheSameSeriesSet) => {
  if (!isTheSameSeriesSet) {
    gameState.currentLevel = 0;
  }
  const question = gameState.levels[gameState.currentLevel].question;
  const gameCb = GameTypes[question.length].gameCb;
  gameCb(question, gameState, playFromStart, updateGameState);
};

export default run;
