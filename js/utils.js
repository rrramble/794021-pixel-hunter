const MAIN_NODE = document.querySelector(`#main`);

export const makeDomNodeFromText = (text) => {
  const node = document.createElement(`div`);
  node.innerHTML = text;
  return node;
};

export const deleteCurrentWindow = () => {
  for (let i = MAIN_NODE.children.length; i--;) {
    MAIN_NODE.children[i].remove();
  }
};

export const showWindow = (node) => {
  MAIN_NODE.append(node);
};

export const isInRange = (value, min, max) => {
  return value >= min && value < max;
};
