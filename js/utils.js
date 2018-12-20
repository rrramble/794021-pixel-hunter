const MAIN_NODE_SELECTOR = `#main`;

let mainNode;

export const changeWindow = (nodes, shouldPreviousWindowBeSaved) => {
  if (!shouldPreviousWindowBeSaved) {
    getMainNode().innerHTML = ``;
  }
  nodes.forEach((node) => {
    getMainNode().append(node);
  });
};

export const enableFormInput = (domNode, shouldBeEnabled) => {
  domNode.disabled = !shouldBeEnabled;
};

export const getCountInputsChecked = (inputNodes) => {
  return inputNodes.reduce((accu, inputNode) => {
    return inputNode.checked ? ++accu : accu;
  }, 0);
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

const getMainNode = () => {
  if (!mainNode) {
    mainNode = document.querySelector(MAIN_NODE_SELECTOR);
  }
  return mainNode;
};

export const hasEventTargetClassName = (evt, className) => {
  const hasNodeClassName = (node) => {
    if (typeof node.classList.contains !== `function`) {
      return false;
    }
    return node.classList.contains(className) ||
      hasNodeClassName(node.parentElement);
  };

  return hasNodeClassName(evt.target);
};

export const isAnsweredYes = (text) => {
  return !!text;
};

export const isInRange = (value, min, max) => {
  return value >= min && value < max;
};

export const makeArray = (count) => {
  return count > 0 ? new Array(count) : [];
};

export const makeDomNode = (innerHtml, eventListeners) => {
  const node = document.createElement(`div`);
  node.innerHTML = innerHtml;
  if (!eventListeners) {
    return node;
  }
  eventListeners.forEach((el) => {
    const subNode = node.querySelector(el.selector);
    subNode.addEventListener(el.type, el.cb);
  });
  return node;
};

export const replaceChildNode = (node, index = 0) => {
  getMainNode().children[index].replaceWith(node);
};
