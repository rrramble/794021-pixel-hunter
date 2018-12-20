// View class of 'Rules' window

import AbstractView from '../utils/abstract-view.js';
import {makeDomNode} from '../utils.js';

import {getFooterScoreIconClassNames} from './game-utils.js';
import {getFittedSize} from '../utils.js';

const PlaygroundType = {
  '1': {
    HTML_SELECTOR: `.game__option input`,
    EVENT_TYPE: `click`,
    ImageSize: {
      WIDTH: 705,
      HEIGHT: 455,
    },
  },
  '2': {
    HTML_SELECTOR: `.game__option input`,
    EVENT_TYPE: `click`,
    ImageSize: {
      WIDTH: 468,
      HEIGHT: 458,
    },
  },
  '3': {
    HTML_SELECTOR: `.game__content--triple img`,
    EVENT_TYPE: `click`,
    ImageSize: {
      WIDTH: 304,
      HEIGHT: 455,
    },
  },
};

export default class GameView extends AbstractView {
  constructor(gameData) {
    super();
    this._gameData = gameData;
    this._settings = PlaygroundType[this._gameData.currentAnswersImageCount];
  }

  get template() {
    switch (this._gameData.currentAnswersImageCount) {
      case 1:
        return `${this._templatePlayground1}`;
      case 2:
        return `${this._templatePlayground2}`;
      default:
        return `${this._templatePlayground3}`;
    }
  }

  get _templateFooter() {
    const levelsClassNames = getFooterScoreIconClassNames(this._gameData);
    return `
      <ul class="stats">
        ${levelsClassNames.map((className) => `
          <li class="stats__result ${className}"></li>
        `).join(``)}
      </ul>
    `;
  }

  get _templatePlayground1() {
    const image = getFittedImages(this._gameData)[0];
    const questionText = this._gameData.currentLevel.questionText;
    return `
    <section class="game">
      <p class="game__task">${questionText}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${image.url}" alt="Option 1" width="${image.width}" height="${image.height}">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      ${this._templateFooter}
    </section>
  `;
  }

  get _templatePlayground2() {
    const images = getFittedImages(this._gameData);
    const questionText = this._gameData.currentLevel.questionText;
    return `
    <section class="game">
      <p class="game__task">${questionText}</p>
      <form class="game__content">

        ${images.map((image, index) => `
          <div class="game__option">
            <img src="${image.url}" alt="Option ${index + 1}" width="${image.width}" height="${image.height}">
            <label class="game__answer game__answer--photo">
              <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input class="visually-hidden" name="question${index + 1}" type="radio" value="painting">
              <span>Рисунок</span>
            </label>
          </div>
        `).join(``)}
      </form>
      ${this._templateFooter}
    </section>
  `;
  }

  get _templatePlayground3() {
    const images = getFittedImages(this._gameData);
    const questionText = this._gameData.currentLevel.questionText;
    return `
    <section class="game">
      <p class="game__task">${questionText}</p>
      <form class="game__content  game__content--triple">
        ${images.map((image, index) => `
          <div class="game__option">
            <img id="${index}" src="${image.url}" alt="Option ${index + 1}" width="${image.width}" height="${image.height}">
          </div>
        `).join(``)}
      </form>
      ${this._templateFooter}
    </section>
  `;
  }

  bind(node) {
    const eventNodes = node.querySelectorAll(this._settings.HTML_SELECTOR);
    [...eventNodes].forEach((eventNode) => {
      eventNode.addEventListener(this._settings.EVENT_TYPE, this.onAnswerClick);
    });
    return node;
  }

  onAnswerClick() {
    return new Error(`Should be redefined 'onAnswerClick()'`);
  }

} // GameFieldView


const getFittedImages = (gameData) => {
  const borderSize = {
    width: PlaygroundType[gameData.currentAnswersImageCount].ImageSize.WIDTH,
    height: PlaygroundType[gameData.currentAnswersImageCount].ImageSize.HEIGHT
  };
  const images = gameData.currentAnswers.map((image) => {
    const fittedSize = getFittedSize(
        borderSize,
        {width: image.width, height: image.height}
    );
    return {
      url: image.url,
      width: fittedSize.width,
      height: fittedSize.height,
    };
  });
  return images;
};
