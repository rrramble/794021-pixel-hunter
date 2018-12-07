// View class of 'Result Statistics' window

import AbstractView from '../utils/abstract-view.js';
import {getFooterScoreIconClassNames} from '../game/game-utils.js';
import {makeDomNode} from '../utils.js';

const PREVIOUS_BUTTON_SELECTOR = `.back`;

export default class GameView extends AbstractView {
  constructor(gameData) {
    super(gameData);
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

  onAnswerClick() {
    return new Error(`Should be redefined 'onAnswerClick()'`);
  }

  onCancelGameClick() {
    return new Error(`Should be redefined 'onCancelGameClick()'`);
  }

  get template() {
    return `
      ${this._templateHeader}
      ${this._templateBody}
    `;
  }

  get _templateHeader() {
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
      </header>
    `;
  }

  get _templateBody() {
    const gameState = this._gameData;
    return `
      <section class="result">
        <h2 class="result__title">Победа!</h2>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              <ul class="stats">
                ${getFooterScoreIconClassNames(gameState).map((className) => `
                  <li class="stats__result ${className}"></li>
                `).join(``)}
              </ul>
            </td>
            <td class="result__points">× 100</td>
            <td class="result__total">${gameState.answersScore}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${gameState.quickAnswersCount} <span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">${gameState.quickAnswersScore}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${gameState.restLives} <span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">${gameState.restLivesScore}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">${gameState.slowAnswersCount} <span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">${gameState.slowAnswersScore}</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">${gameState.score}</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">2.</td>
            <td>
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--wrong"></li>
              </ul>
            </td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">3.</td>
            <td colspan="2">
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--unknown"></li>
              </ul>
            </td>
            <td class="result__points">× 100</td>
            <td class="result__total">900</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">100</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">950</td>
          </tr>
        </table>
      </section>
    `;
  }

  render() {
    return makeDomNode(this.template);
  }

}
