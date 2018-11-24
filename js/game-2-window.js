// Экран 'Игровой экран с двумя изображениями'

import GameWindow from './game-window.js';
import {changeWindow, getCountInputsChecked} from './utils.js';
import {getGameHeader, getGameField} from './game-headers.js';

const ANSWERS_COUNT = 2;
const PREVIOUS_BUTTON_SELECTOR = `.back`;
const ANSWERS_FORM_SELECTOR = `.game__content`;
const INPUTS_SELECTOR = `.game__content .game__option input`;

let answersFormNode;
let updateGameStateCb;
let playFromStartCb;

const verifyPlayFromStart = () => {
  playFromStartCb();
};

const verifyUserClick = () => {
  answersFormNode = document.querySelector(ANSWERS_FORM_SELECTOR);
  const inputNodes = [...answersFormNode.querySelectorAll(INPUTS_SELECTOR)];
  if (getCountInputsChecked(inputNodes) >= ANSWERS_COUNT) {
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
