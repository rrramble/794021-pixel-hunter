// View class of 'Rules' window

import AbstractView from '../utils/abstract-view.js';
import {makeDomNode, makeArray} from '../utils.js';

const PREVIOUS_BUTTON_SELECTOR = `.back`;
const Blink = {
  SECONDS: 5,
  CLASS: `game__timer--blink`,
};

export default class GameHeaderView extends AbstractView {
  constructor(gameData) {
    super();
    this._gameData = gameData;
  }

  bind(node) {
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

  onCancelGameClick() {
    return new Error(`Should be redefined 'onCancelGameClick()'`);
  }

  render() {
    return makeDomNode(this.template);
  }

  get template() {
    const secondsLeft = this._gameData.currentLevelSecondsLeft;
    const restLives = this._gameData.restLives;
    const lostLives = this._gameData.MAX_LIVES - restLives;
    const blinkClass = secondsLeft <= Blink.SECONDS ? Blink.CLASS : ``;
    return `
      <style>
        .${blinkClass} {
        animation: timer__blink 0.5s infinite;
        animation-timing-function: steps(1, end);
      }
      @keyframes timer__blink {
        from {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        from {
          opacity: 1;
        }
      }
      </style>
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
        <div class="game__timer ${blinkClass}">${secondsLeft}</div>
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

  updateTime() {
    this._element = undefined;
  }

} // GameHeaderView
