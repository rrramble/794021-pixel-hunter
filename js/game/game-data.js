// Game controller window

const MAX_LIVES = 3;
const UNANSWERED_QUESTIONS_SCORE = -1;
const MAX_ANSWER_TIME = 30;
const SECONDS_LEFT_OF_QUICK_ANSWER = 20;
const SECONDS_LEFT_OF_SLOW_ANSWER = 10;

const Points = {
  ADDITIONAL_FOR_QUICK_ANSWER: 50,
  ADDITIONAL_FOR_SLOW_ANSWER: -50,
  ADDITIONAL_FOR_NORMAL_SPEED_ANSWER: 0,
  FOR_CORRECT_ANSWER: 100,
  REST_LIVE_SCORE: 50,
};

class Level {
  constructor(question) {
    this._question = question;
    this._secondsLeft = MAX_ANSWER_TIME;
    this.isAnswered = false;
    this.isAnswerCorrect = undefined;
  }

  isAnswerNormalSpeed() {
    return this.isAnswerCorrect && !this.isAnswerQuick() && !this.isAnswerSlow();
  }

  isAnswerQuick() {
    return this.isAnswerCorrect && this.secondsLeft > SECONDS_LEFT_OF_QUICK_ANSWER;
  }

  isAnswerSlow() {
    return this.isAnswerCorrect && this.secondsLeft < SECONDS_LEFT_OF_SLOW_ANSWER;
  }

  get score() {
    if (!this.isAnswered) {
      return 0;
    }
    let addendum;
    if (this.isAnswerQuick()) {
      addendum = Points.ADDITIONAL_FOR_QUICK_ANSWER;
    } else if (this.isAnswerSlow()) {
      addendum = Points.ADDITIONAL_FOR_SLOW_ANSWER;
    }
    return Points.FOR_CORRECT_ANSWER + addendum;
  }

  get secondsLeft() {
    return this._secondsLeft;
  }

  tickSecond() {
    if (this._secondsLeft >= 0) {
      return --this._secondsLeft;
    }
    return 0;
  }

  get question() {
    return this._question;
  }
}

class GameData {
  constructor() {
  }

  get answersCount() {
    return this.levels.reduce((accu, level) => {
      return level.isAnswerCorrect ? ++accu : accu;
    }, 0);
  }

  get answersScore() {
    if (this.isThereUnansweredQuestion()) {
      return 0;
    }
    return this.answersCount * Points.FOR_CORRECT_ANSWER;
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

  decreaseLive() {
    if (this._state.restLives > 0) {
      --this._state.restLives;
    }
    return this._state.restLives;
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
    return this.currentLevelNumber >= this.levels.length ||
      this.restLives <= 0;
  }

  get levels() {
    return this.state.levels;
  }

  get normalSpeedAnswersCount() {
    return this.levels.reduce((accu, level) => {
      return level.isAnswerNormalSpeed() ? ++accu : accu;
    }, 0);
  }

  get normalSpeedAnswersScore() {
    if (this.isThereUnansweredQuestion()) {
      return 0;
    }
    return this.normalSpeedAnswersCount * Points.ADDITIONAL_FOR_NORMAL_SPEED_ANSWER;
  }

  get MAX_LIVES() {
    return this.state.MAX_LIVES;
  }

  isThereUnansweredQuestion() {
    return this.levels.some((level) => !level.isAnswered);
  }

  get quickAnswersCount() {
    return this.levels.reduce((accu, level) => {
      return level.isAnswerQuick() ? ++accu : accu;
    }, 0);
  }

  get quickAnswersScore() {
    if (this.isThereUnansweredQuestion()) {
      return 0;
    }
    return this.quickAnswersCount * Points.ADDITIONAL_FOR_QUICK_ANSWER;
  }

  get restLives() {
    return this.state.restLives;
  }

  get restLivesScore() {
    return this.restLives * Points.REST_LIVE_SCORE;
  }

  get score() {
    if (this.isThereUnansweredQuestion()) {
      return UNANSWERED_QUESTIONS_SCORE;
    }
    return this.answersScore +
      this.quickAnswersScore +
      this.slowAnswersScore +
      this.normalSpeedAnswersScore +
      this.restLivesScore;
  }

  setCurrentLevelAnswer(isAnswerCorrect) {
    this.currentLevel.isAnswered = true;
    this.currentLevel.isAnswerCorrect = isAnswerCorrect;
    if (!isAnswerCorrect) {
      this.decreaseLive();
    }
  }

  get slowAnswersCount() {
    return this.levels.reduce((accu, level) => {
      return level.isAnswerSlow() ? ++accu : accu;
    }, 0);
  }

  get slowAnswersScore() {
    if (this.isThereUnansweredQuestion()) {
      return 0;
    }
    return this.slowAnswersCount * Points.ADDITIONAL_FOR_SLOW_ANSWER;
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
