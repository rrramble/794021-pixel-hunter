// Game controller window

const MAX_LIVES = 3;
const MAX_ANSWER_TIME = 3;

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

  tickSecond() {
    return --this._secondsLeft;
  }

  get question() {
    return this._question;
  }
}

class GameData {
  constructor() {
  }

  get currentLevel() {
    return this.levels[this.currentLevelNumber];
  }

  get currentLevelNumber() {
    return this.state.currentLevelNumber;
  }

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
  }

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
  }

  tickSecond() {
    const secondsLeft = this.currentLevel.tickSecond();
    if (secondsLeft <= 0 && this._timeElapsedCb) {
      this._timeElapsedCb();
    }
  }

}

export default new GameData();
