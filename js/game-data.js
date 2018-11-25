// Game controller window

import game1image from './game-1-window.js';
import game2images from './game-2-window.js';
import game3images from './game-3-window.js';
import {getLevelWithResult} from './game-utils.js';

const MAX_LIVES = 3;
const MAX_ANSWER_TIME = 2; // 30
const SAME_SERIES_SET = true;

const GameType = {
  '1': {
    CB: game1image,
  },
  '2': {
    CB: game2images,
  },
  '3': {
    CB: game3images,
  },
};

class Level {
  constructor(question) {
    this._question = question;
    this._secondsLeft = MAX_ANSWER_TIME;
    this.isAnswered = false;
    this.isAnswerCorrect = undefined;
  }

  get isAnswerQuick() {
    return this.isAnswered ? this.secondsLeft > 20 : false;
  }

  get isAnswerSlow() {
    return this.isAnswered ? this.secondsLeft < 10 : false;
  }

  get secondsLeft() {
    return this._secondsLeft;
  }

  timeTick(delta) {
    this._secondsLeft -= delta;
    return this.secondsLeft;
  }

  get question() {
    return this._question;
  }
};

class GameData {
  constructor() {
  };

  get cb() {
    return GameType[this.currentQuestionImageCount].CB;
  }

  get currentLevel() {
    return this.levels[this.currentLevelNumber];
  };

  get currentLevelNumber() {
    return this.state.currentLevelNumber;
  };

  get currentQuestion() {
    return this.currentLevel.question;
  }

  get currentQuestionImageCount() {
    return this.currentQuestion.length;
  }

  get currentQuestionSecondsLeft() {
    return this.currentLevel.secondsLeft;
  }

  increaseLevel() {
    return ++this._state.currentLevelNumber;
  }

  init(questions, timeElapsedCb) {
    const levels = questions.map((question) => {
      return new Level(question);
    });

    this._state = {
      levels,
      MAX_LIVES,
      restLives: MAX_LIVES,
      currentLevelNumber: 0,
    };

    if (timeElapsedCb) {
      this._timeElapsedCb = timeElapsedCb;
    }
  };

  isGameFinished() {
    return this.currentLevelNumber >= this.levels.length;
  }

  get levels() {
    return this.state.levels;
  }

  get MAX_LIVES() {
    return this.state.MAX_LIVES;
  }

  get restLives() {
    return this.state.restLives;
  }

  setCurrentLevelAnswer(isAnswered, isAnswerCorrect) {
    this.currentLevel.isAnswered = isAnswered;
    this.currentLevel.isAnswerCorrect = isAnswerCorrect;
  }

  get state() {
    return this._state;
  };

  timeTick() {
    const secondsLeft = this.currentLevel.timeTick(1);
    if (secondsLeft <= 0 && this._timeElapsedCb) {
      this._timeElapsedCb();
    };
  }

};

export default new GameData();
