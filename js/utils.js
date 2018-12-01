const MAIN_NODE_SELECTOR = `#main`;

let mainNode;

const getMainNode = () => {
  if (!mainNode) {
    mainNode = document.querySelector(MAIN_NODE_SELECTOR);
  }
  return mainNode;
};

export const makeDomNode = (innerHtml, eventListeners) => {
  const node = document.createElement(`div`);
  node.innerHTML = innerHtml;
  eventListeners.forEach((el) => {
    const subNode = node.querySelector(el.selector);
    subNode.addEventListener(el.type, el.cb);
  });
  return node;
};

export const changeWindow = (node, shouldPreviousWindowBeSaved) => {
  if (!shouldPreviousWindowBeSaved) {
    for (let i = getMainNode().children.length; i--;) {
      getMainNode().children[i].remove();
    }
  }
  getMainNode().append(node);
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
    if (typeof node.classList.contains !== `function`) {
      return false;
    }
    return node.classList.contains(className) ||
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

export const makeArray = (count) => {
  if (count <= 0) {
    return [];
  }
  return new Array(count);
}

export const isAnsweredYes = (text) => {
  /*
    const KEY_ESC = 27;

    const closeHandler = (evt) => {
      if (evt.keycode) === KEY_ESC {
        document.removeEventListener(`keydown`, cancelHandler);
        domNode.remove();
      }
    };

    const node = getConfirmationNode();
    const closeButtonNode = node.querySelector(`.modal .modal__close`);
    const cancelButtonNode = node.querySelector(`.modal .modal__btn.modal__btn--cancel`);
    const okButtonNode = node.querySelector(`.modal .modal__btn.modal__btn--ok`);

    okButtonNode.addEventListener(`click`, () => {
      return ;
    });

    const domNode = document.querySelector(`body`).insertBefor(modalNode);
    document.addEventListener(`keydown`, closeHandler);
  };
  */

  /*
  const getConfirmationNode = (text) => {
    return makeDomNodeFromText(`
      <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">${text}</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn modal__btn--ok">Ок</button>
            <button class="modal__btn modal__btn--cancel">Отмена</button>
          </div>
        </form>
      </section>
    `);
  };

  */
  return !!text;
};
