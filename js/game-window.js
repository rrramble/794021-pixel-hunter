// Универсальный экран для Игры

import AbstractWindow from './abstract-window.js';

export default class GameWindow extends AbstractWindow {
  constructor(templates) {
    super([...templates]);
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
