// Экран управляющий игрой

import getQuestions from './data/mock-questions.js';
import game1image from './game-1-window.js';
import game2images from './game-2-window.js';
import game3images from './game-3-window.js';
import goBegin from './greeting-window.js';
import goStatistics from './stats-window';

const QUESTIONS_IS_NOT_SHAFFLED = true;
const MAX_LIVES = 3;
const MAX_ANSWER_TIME = 30;
const SAME_SERIES = true;

const GameTypes = {
  '1': game1image,
  '2': game2images,
  '3': game3images,
};

const questions = getQuestions(QUESTIONS_IS_NOT_SHAFFLED);
let gameState;

const initializeGameState = () => {
  const levels = questions.map((question) => {
    return {
      timeLeft: MAX_ANSWER_TIME,
      question,
    };
  });
  gameState = {
    currentLevel: 0,
    restLives: MAX_LIVES,
    levels,
  };
};

initializeGameState();

const updateGameState = () => {
  gameState.currentLevel++;
  // calculate the score
  // calculate rest lives
  if (gameState.currentLevel < gameState.levels.length) {
    run(SAME_SERIES);
  } else {
    goStatistics();
  }
};

const playFromStart = () => {
  initializeGameState();
  goBegin();
};

const run = (isTheSameSeries) => {
  if (!isTheSameSeries) {
    gameState.currentLevel = 0;
  }
  const gameCb = GameTypes[gameState.levels[gameState.currentLevel].question.length];
  const question = gameState.levels[gameState.currentLevel].question;
  gameCb(question, gameState, playFromStart, updateGameState);
};

export default run;
