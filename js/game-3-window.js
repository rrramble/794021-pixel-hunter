// Экран 'Игровой экран с тремя изображениями'

import GameWindow from './game-window.js';
import {changeWindow, hasEventTargetClassName} from './utils.js';
import {getGameHeader, getGameField} from './game-headers.js';

const ANSWERS_COUNT = 3;
const PREVIOUS_BUTTON_SELECTOR = `.back`;
const INPUTS_SELECTOR = `.game__option`;
const INPUTS_CLASS_NAME = `game__option`;

let updateGameStateCb;
let playFromStartCb;

const verifyPlayFromStart = () => {
  playFromStartCb();
};

const verifyUserClick = (evt) => {
  if (hasEventTargetClassName(evt, INPUTS_CLASS_NAME)) {
    updateGameStateCb();
  }
};

const run = (question, gameState, playFromStart, updateGameState) => {
  updateGameStateCb = updateGameState;
  playFromStartCb = playFromStart;
  const thisWindow = new GameWindow(
      [getGameHeader(gameState), getGameField(gameState, ANSWERS_COUNT)]
  );
  thisWindow.pushEventListeners(PREVIOUS_BUTTON_SELECTOR, `click`, verifyPlayFromStart);
  thisWindow.pushEventListeners(INPUTS_SELECTOR, `click`, verifyUserClick);
  thisWindow.setRenderFunction(changeWindow);
  thisWindow.setData(question);
  thisWindow.run();
};

export default run;
