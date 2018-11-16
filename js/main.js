'use strict';

const TemplateGameWindowHtmlSelectors = [
  `#intro`,
  `#greeting`,
  `#rules`,
  `#game-1`,
  `#game-2`,
  `#game-3`,
  `#stats`
];

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
  readHtmlTemplates();
  showGameWindow(0);
  // insertInnerHtmlBeforeEnd(BODY_NODE, ADDITIONAL_HTML);
  insertInnerHtmlBeforeBegin(LAST_TEMPLATE_NODE, ADDITIONAL_HTML);
  setUserInteractionHandlers();
};

const readHtmlTemplates = () => {
  templateGameWindowNodes = TemplateGameWindowHtmlSelectors.map((selector) => {
    return document.querySelector(selector);
  });
};

const makeGameWindowFragment = (index) => {
  const fragment = document.createDocumentFragment();
  const cloned = templateGameWindowNodes[index].content.cloneNode(true);
  fragment.appendChild(cloned);
  return fragment;
};

const showGameWindow = (index = 0) => {
  const fragment = makeGameWindowFragment(index);
  deleteCurrentGameWindow();
  MAIN_NODE.appendChild(fragment);
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
  if (!isInRange(newPosition, 0, templateGameWindowNodes.length)) {
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

const isInRange = (value, min, max) => {
  return value >= min && value < max;
};

init();
