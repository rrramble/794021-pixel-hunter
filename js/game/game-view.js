// View class of 'Rules' window

import AbstractView from '../utils/abstract-view.js';
import {makeDomNode} from '../utils.js';

import {getFooterScoreIconClassNames} from './game-utils.js';
import {getFittedSize, makeArray} from '../utils';

const PREVIOUS_BUTTON_SELECTOR = `.back`;

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
    this._settings = PlaygroundType[this._gameData.currentQuestionImageCount];
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

  get _templateHeader() {
    const secondsLeft = this._gameData.currentQuestionSecondsLeft;
    const restLives = this._gameData.restLives;
    const lostLives = this._gameData.MAX_LIVES - restLives;
    return `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
        <div class="game__timer">${secondsLeft}</div>
        <div class="game__lives">
        ${new Array(lostLives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
        ${makeArray(restLives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
        </div>
      </header>
    `;
  }

  get _templatePlayground() {
    switch (this._gameData.currentQuestionImageCount) {
      case 1:
        return this._templatePlayground1;
      case 2:
        return this._templatePlayground2;
      default:
        return this._templatePlayground3;
    }
  }

  get _templatePlayground1() {
    const image = getFittedImages(this._gameData)[0];
    return `
    <section class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${image.url}" alt="Option 1" width="${image.width}" height="${image.height}">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
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
    return `
    <section class="game">
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      <form class="game__content">

        ${images.map((image, index) => `
          <div class="game__option">
            <img src="${image.url}" alt="Option ${index + 1}" width="${image.width}" height="${image.height}">
            <label class="game__answer game__answer--photo">
              <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
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
    return `
    <section class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
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

  get template() {
    return `
      ${this._templateHeader}
      ${this._templatePlayground}
    `;
  }

  render() {
    return makeDomNode(this.template);
  }

  bind(node) {
    const eventNodes = node.querySelectorAll(this._settings.HTML_SELECTOR);
    [...eventNodes].forEach((eventNode) => {
      eventNode.addEventListener(this._settings.EVENT_TYPE, this.onAnswerClick);
    });

    const cancelGameNode = node.querySelector(PREVIOUS_BUTTON_SELECTOR);
    cancelGameNode.addEventListener(`click`, this.onCancelGameClick);

    return node;
  }

  get element() {
    if (!this._element) {
      this._element = this.bind(this.render());
    }
    return this._element;
  }

  onAnswerClick() {
    return new Error(`Should be redefined 'onAnswerClick()'`);
  }

  onCancelGameClick() {
    return new Error(`Should be redefined 'onCancelGameClick()'`);
  }

}

const getFittedImages = (gameData) => {
  const borderSize = {
    width: PlaygroundType[gameData.currentQuestionImageCount].ImageSize.WIDTH,
    height: PlaygroundType[gameData.currentQuestionImageCount].ImageSize.HEIGHT
  };
  const images = gameData.currentQuestion.map((image) => {
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
