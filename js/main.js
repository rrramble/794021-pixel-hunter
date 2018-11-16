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

let templateGameWindowNodes;
let currentGameWindow;

const init = () => {
  readHtmlTemplates();
  showGameWindow(0);
  setUserInteractionHandlers();
}

const readHtmlTemplates = () => {
  templateGameWindowNodes = TemplateGameWindowHtmlSelectors.map((selector) => {
    return document.querySelector(selector);
  });
}

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
}

const deleteCurrentGameWindow = () => {
  for (let i = MAIN_NODE.children.length; i--;) {
    MAIN_NODE.children[i].remove();
  };
}

const moveGameWindow = (increment) => {
  if (!increment) {
    return;
  }
  const newPosition = currentGameWindow + increment;
  if (!isInRange(newPosition, 0, templateGameWindowNodes.length)) {
    return;
  }
  showGameWindow(newPosition);
}

const moveGameWindowBack = () => {
  moveGameWindow(-1);
}

const moveGameWindowForward = () => {
  moveGameWindow(+1);
}

const setUserInteractionHandlers = () => {
  setKeyboardArrowHandlers();
};

const setKeyboardArrowHandlers = () => {
  window.addEventListener(`keydown`, onKeyDown);
};

const onKeyDown = (evt) => {
  if (evt.keyCode === KeyCodes.LEFT) {
    moveGameWindowBack();
  }
  if (evt.keyCode === KeyCodes.RIGHT) {
    moveGameWindowForward();
  }
}

const isInRange = (value, min, max) => {
  return value >= min && value < max;
}

init();
