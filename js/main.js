import {isInRange, makeDocumentFragmentFromText} from './utils.js';
import introWindow from './intro-window.js';
import rulesWindow from './rules-window.js';
import greetingWindow from './greeting-window.js';
import game1Window from './game-1-window.js';
import game2Window from './game-2-window.js';
import game3Window from './game-3-window.js';
import statsWindow from './stats-window.js';

const TemplateGameWindowHtmlSelectors = [
  `#intro`,
  `#greeting`,
  `#rules`,
  `#game-1`,
  `#game-2`,
  `#game-3`,
  `#stats`
];

let windowNodes = [];

const KeyCodes = {
  LEFT: 37,
  RIGHT: 39
};

const MAIN_NODE = document.querySelector(`#main`);
const LAST_TEMPLATE_NODE = document.querySelector(`script:last-child`);

const ArrowButtons = {
  LEFT_SELECTOR: `.arrows__btn:first-of-type`,
  RIGHT_SELECTOR: `.arrows__btn:last-of-type`
};

const ADDITIONAL_HTML = `
<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>
`;


let templateGameWindowNodes;
let currentGameWindow;

const init = () => {
  makeWindowNodes();
  showGameWindow(0);
  insertInnerHtmlBeforeBegin(LAST_TEMPLATE_NODE, ADDITIONAL_HTML);
  setUserInteractionHandlers();
};

const makeWindowNodes = () => {
  windowNodes.push(introWindow);
  windowNodes.push(greetingWindow);
  windowNodes.push(rulesWindow);
  windowNodes.push(game1Window);
  windowNodes.push(game2Window);
  windowNodes.push(game3Window);
  windowNodes.push(statsWindow);
};

const showGameWindow = (index) => {
  deleteCurrentGameWindow();
  MAIN_NODE.appendChild(windowNodes[index]);
  currentGameWindow = index;
};

const deleteCurrentGameWindow = () => {
  for (let i = MAIN_NODE.children.length; i--;) {
    MAIN_NODE.children[i].remove();
  }
};

const moveGameWindow = (increment) => {
  if (!increment) {
    return;
  }
  const newPosition = currentGameWindow + increment;
  if (!isInRange(newPosition, 0, windowNodes.length)) {
    return;
  }
  showGameWindow(newPosition);
};

const moveGameWindowBack = () => {
  moveGameWindow(-1);
};

const moveGameWindowForward = () => {
  moveGameWindow(+1);
};

const setUserInteractionHandlers = () => {
  setKeyboardArrowHandlers();
  setButtonsArrowHandlers();
};

const setKeyboardArrowHandlers = () => {
  window.addEventListener(`keydown`, onKeyDown);
};

const setButtonsArrowHandlers = () => {
  const leftNode = document.querySelector(ArrowButtons.LEFT_SELECTOR);
  leftNode.addEventListener(`click`, moveGameWindowBack);

  const rightNode = document.querySelector(ArrowButtons.RIGHT_SELECTOR);
  rightNode.addEventListener(`click`, moveGameWindowForward);
};

const onKeyDown = (evt) => {
  if (evt.keyCode === KeyCodes.LEFT) {
    moveGameWindowBack();
  }
  if (evt.keyCode === KeyCodes.RIGHT) {
    moveGameWindowForward();
  }
};

const insertInnerHtmlBeforeBegin = (node, htmlText) => {
  node.insertAdjacentHTML(`beforebegin`, htmlText);
};

init();
