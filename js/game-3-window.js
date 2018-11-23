// Экран 'Игровой экран с тремя изображениями'

import GameWindow from './game-window.js';
import {changeWindow, hasEventTargetClassName} from './utils.js';

const PREVIOUS_BUTTON_SELECTOR = `.back`;
const INPUTS_SELECTOR = `.game__option`;
const INPUTS_CLASS_NAME = `game__option`;

let updateGameStateCb;
let playFromStartCb;

const GAME_TEMPLATE = `
  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;

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
  const thisWindow = new GameWindow([GAME_TEMPLATE]);

  thisWindow.pushEventListeners(PREVIOUS_BUTTON_SELECTOR, `click`, verifyPlayFromStart);
  thisWindow.pushEventListeners(INPUTS_SELECTOR, `click`, verifyUserClick);
  thisWindow.setRenderFunction(changeWindow);
  thisWindow.setData(question);
  thisWindow.run();
};

export default run;
