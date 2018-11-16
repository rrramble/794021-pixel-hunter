const TemplateGameWindowHtmlSelectors = [
  `#intro`,
  `#greeting`,
  `#rules`,
  `#game-1`,
  `#game-2`,
  `#game-3`,
  `#stats`
];

const MAIN_NODE = document.querySelector(`#main`);

let templateGameWindowNodes;
let currentGameWindow;

const init = () => {
  readHtmlTemplates();
  showGameWindow(0);
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
  MAIN_NODE.appendChild(fragment);
  currentGameWindow = index;
}

const isInRange = (value, min, max) => {
  return value >= min && value < max;
}

init();
