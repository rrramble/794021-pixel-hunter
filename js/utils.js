const MAIN_NODE_SELECTOR = `#main`;
let mainNode;

const getMainNode = () => {
  if (!mainNode) {
    mainNode = document.querySelector(MAIN_NODE_SELECTOR);
  }
  return mainNode;
};

const makeDomNodeFromText = (text) => {
  const node = document.createElement(`div`);
  node.innerHTML = text;
  return node;
};

const deleteCurrentWindow = () => {
  for (let i = getMainNode().children.length; i--;) {
    getMainNode().children[i].remove();
  }
};

const showWindow = (node) => {
  getMainNode().append(node);
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

export const getFittedSize = (borderSize, imageSize) => {
  const coefficientWidth = borderSize.width < imageSize.width ? imageSize.width / borderSize.width : 1;
  const coefficientHeight = borderSize.height < imageSize.height ? imageSize.height / borderSize.height : 1;
  const coefficient = Math.max(coefficientWidth, coefficientHeight);
  return {
    width: imageSize.width / coefficient,
    height: imageSize.height / coefficient
  };
};
