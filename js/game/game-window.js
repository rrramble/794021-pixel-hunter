// Экран 'Игровой экран'

import {getGameHeaderNode, getGameFieldNode} from './game-template.js';

import GameWindow from '../abstract-window.js';
import {changeWindow, getCountInputsChecked} from '../utils.js';

const INPUTS_SELECTOR = `.game__content .game__option input`;

let updateGameStateCb;
let playFromStartCb;
let thisGameState;

const verifyPlayFromStart = () => {
  playFromStartCb();
};

const verifyUserClick = () => {
  const inputNodes = [...document.querySelectorAll(INPUTS_SELECTOR)];
  if (
    (inputNodes.length && isAllInputsSelected(inputNodes)) ||
    !inputNodes.length) {
    updateGameStateCb();
  }
};

const isAllInputsSelected = (inputNodes) => {
  return getCountInputsChecked(inputNodes) >= thisGameState.currentQuestionImageCount;
};

const run = (gameState, playFromStart, updateGameState) => {
  thisGameState = gameState;
  updateGameStateCb = updateGameState;
  playFromStartCb = playFromStart;

  const thisWindow = new GameWindow(changeWindow);
  const nodes = [
    getGameHeaderNode(gameState, verifyPlayFromStart),
    getGameFieldNode(gameState, verifyUserClick)
  ];
  thisWindow.renderNodes(nodes);
};

export default run;
