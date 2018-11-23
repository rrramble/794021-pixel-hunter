// Экран 'Игровой экран с двумя изображениями'

import GameWindow from './game-window.js';
import {changeWindow, getCountInputsChecked} from './utils.js';

const ANSWERS_COUNT = 2;
const PREVIOUS_BUTTON_SELECTOR = `.back`;
const ANSWERS_FORM_SELECTOR = `.game__content`;
const INPUTS_SELECTOR = `.game__content .game__option input`;

let answersFormNode;
let updateGameStateCb;
let playFromStartCb;

const GAME_TEMPLATE = `
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;

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
  const thisWindow = new GameWindow([GAME_TEMPLATE]);

  thisWindow.pushEventListeners(PREVIOUS_BUTTON_SELECTOR, `click`, verifyPlayFromStart);
  thisWindow.pushEventListeners(INPUTS_SELECTOR, `click`, verifyUserClick);
  thisWindow.setRenderFunction(changeWindow);
  thisWindow.setData(question);
  thisWindow.run();
};

export default run;
