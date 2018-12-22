// View of the 'Statistics' window

import AbstractView from '../utils/abstract-view.js';
import {getFooterScoreIconClassNames} from '../game/game-utils.js';

const PREVIOUS_BUTTON_SELECTOR = `.back`;

const getPresentationScoreFromScore = (score) => {
  return score > 0 ? score : `fail`;
};


export default class GameView extends AbstractView {
  constructor(gameData) {
    super(gameData);
    this._gameData = gameData;
  }

  addEarlierStatistics(statistics) {
    this._earlierStatistics = statistics;
    this._element = undefined;
  }

  bind(node) {
    const cancelGameNode = node.querySelector(PREVIOUS_BUTTON_SELECTOR);
    cancelGameNode.addEventListener(`click`, this.onCancelGameClick);
    return node;
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
    return `
      ${this._templateBodyThisGame}
      ${this._earlierStatistics ? this._templateBodyEarlierStatistics : ``}
    `;
  }

  get _templateBodyThisGame() {
    const gameState = this._gameData;
    return `
      <section class="result">
        <h2 class="result__title">${gameState.score >= 0 ? `Победа!` : `Поражение.`}</h2>
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
            <td class="result__total">${gameState.correctAnswersScore}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${gameState.quickAnswersCount} <span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">${gameState.quickAnswersAdditionalScore}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${Math.max(gameState.restLives, 0)} <span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">${gameState.restLivesScore}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">${gameState.slowAnswersCount} <span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">× -50</td>
            <td class="result__total">${gameState.slowAnswersAdditionalScore}</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">${getPresentationScoreFromScore(gameState.score)}</td>
          </tr>
        </table>
    `;
  }

  _templateBodyEarlierStatistic(gameState, index) {
    return `
        <table class="result__table">
          <tr>
            <td class="result__number">${index}.</td>
            <td>
              <ul class="stats">
                ${getFooterScoreIconClassNames(gameState).map((className) => `
                  <li class="stats__result ${className}"></li>
                `).join(``)}
              </ul>
            </td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">${getPresentationScoreFromScore(gameState.score)}</td>
          </tr>
        </table>
    `;
  }

  get _templateBodyEarlierStatistics() {
    return this._earlierStatistics.reduce((accu, oneGameLevels, index) => {
      return `${accu}${this._templateBodyEarlierStatistic(oneGameLevels, index + 1)}`;
    }, ``);
  }

}
