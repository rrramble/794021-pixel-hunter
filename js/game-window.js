// Универсальный экран для Игры

import AbstractWindow from './abstract-window.js';

const LIVES_TIME_TEMPLATE = `
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
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  </header>
`;

export default class GameWindow extends AbstractWindow {
  constructor(templates) {
    super([LIVES_TIME_TEMPLATE, ...templates]);
    this._hasBeenRun = false;
  }

  setQuestions(questions) {
    this._saveQuestions(questions);
  }

  _saveQuestions(questions) {
    [...this._questions] = questions;
  }

  setData(levelData) {
    return levelData;
  }

  run() {
    super.run();
    this._hasBeenRun = true;
  }
}
