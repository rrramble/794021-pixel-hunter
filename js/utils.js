const MAIN_NODE = document.querySelector(`#main`);

const makeDomNodeFromText = (text) => {
  const node = document.createElement(`div`);
  node.innerHTML = text;
  return node;
};

const deleteCurrentWindow = () => {
  for (let i = MAIN_NODE.children.length; i--;) {
    MAIN_NODE.children[i].remove();
  }
};

const showWindow = (node) => {
  MAIN_NODE.append(node);
};

export const changeWindow = (innerHtml) => {
  deleteCurrentWindow();
  const node = makeDomNodeFromText(innerHtml);
  showWindow(node);
};

export const enableFormInput = (domNode, shouldBeEnabled) => {
  domNode.disabled = !shouldBeEnabled;
};

export const getCountInputsChecked = (inputNodes) => {
  return inputNodes.reduce((accu, inputNode) => {
    return inputNode.checked ? ++accu : accu;
  }, 0);
};

export const hasEventTargetClassName = (evt, className) => {
  const hasNodeClassName = (node) => {
    if (node.classList.contains(className)) {
      return true;
    }

    return !node.parentElement ?
      false :
      hasNodeClassName(node.parentElement);
  };

  return hasNodeClassName(evt.target);
};

export const isInRange = (value, min, max) => {
  return value >= min && value < max;
};
