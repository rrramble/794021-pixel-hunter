// Game model

import {AnswerState} from './game-utils.js';

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
    this.question = question;
    this.secondsLeft = MAX_ANSWER_TIME;
    this.answerState = AnswerState.UNANSWERED;
  }

  setAnswerState(levelState) {
    this.answerState = levelState.answerState;
    this.restLives = levelState.restLives;
  }

  get isUnanswered() {
    return this.answerState === AnswerState.UNANSWERED;
  }

  get score() {
    switch (this.answerState) {
      case AnswerState.UNANSWERED:
        return UNANSWERED_QUESTIONS_SCORE;
      case AnswerState.INCORRECT:
        return 0;
      case AnswerState.SLOW:
        return Points.NORMAL + Points.ADDITIONAL_FOR_SLOW_ANSWER;
      case AnswerState.QUICK:
        return Points.NORMAL + Points.ADDITIONAL_FOR_NORMAL_SPEED_ANSWER;
      default:
        return Points.NORMAL;
    }
  }

  setAnswer(isCorrect) {
    if (!isCorrect) {
      this.answerState = AnswerState.INCORRECT;
      return;
    }
    switch (true) {
      case this.secondsLeft >= SECONDS_LEFT_OF_QUICK_ANSWER:
        this.answerState = AnswerState.QUICK;
        break;
      case this.secondsLeft <= SECONDS_LEFT_OF_SLOW_ANSWER:
        this.answerState = AnswerState.SLOW;
        break;
      default:
        this.answerState = AnswerState.NORMAL;
    }
  }

  tickSecond() {
    if (this.secondsLeft >= 0) {
      return --this.secondsLeft;
    }
    return 0;
  }

} // Level


export default class GameModel {
  constructor(username) {
    this.username = username;
    this.MAX_LIVES = MAX_LIVES;
    this.restLives = MAX_LIVES;
    this.currentLevelNumber = 0;
  }

  addAnswerState(answerState) {
    if (!this.levels) {
      this.levels = [];
    }
    const level = new Level();
    level.setAnswerState(answerState);
    this.levels.push(level);
  }

  get correctAnswersCount() {
    return this.levels.reduce((accu, level) => {
      const isCorrect =
        level.answerState === AnswerState.QUICK ||
        level.answerState === AnswerState.NORMAL ||
        level.answerState === AnswerState.SLOW;
      return isCorrect ? ++accu : accu;
    }, 0);
  }

  get correctAnswersScore() {
    if (this.isThereUnansweredQuestion()) {
      return 0;
    }
    return this.correctAnswersCount * Points.FOR_CORRECT_ANSWER;
  }

  get currentLevel() {
    return this.levels[this.currentLevelNumber];
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
    if (this.restLives >= 0) {
      --this.restLives;
    }
    return this.restLives;
  }

  increaseLevel() {
    return ++this.currentLevelNumber;
  }

  reinit() {
    this.restLives = MAX_LIVES;
    this.currentLevelNumber = 0;
  }

  _isPhotoAnswerCorrect(photoAnswers) {
    if (!photoAnswers) {
      return false;
    }
    return photoAnswers.every((photoAnswer, index) => {
      const isPhoto = this.currentQuestion[index].isPhoto;
      return photoAnswer === isPhoto;
    });
  }

  isGameFinished() {
    return this.restLives < 0 ||
      this.currentLevelNumber >= this.levels.length;
  }

  isThereUnansweredQuestion() {
    return this.levels.some((level) => level.answerState === AnswerState.UNANSWERED);
  }

  get normalSpeedAnswersCount() {
    return this.levels.reduce((accu, level) => {
      return level.answerState === AnswerState.NORMAL ? ++accu : accu;
    }, 0);
  }

  onTickSecond() {
  }

  onTimeElapsed() {
  }

  set questions(questions) {
    this.levels = questions.map((question) => {
      return new Level(question);
    });
  }

  get quickAnswersCount() {
    return this.levels.reduce((accu, level) => {
      return level.answerState === AnswerState.QUICK ? ++accu : accu;
    }, 0);
  }

  get quickAnswersAdditionalScore() {
    if (this.isThereUnansweredQuestion()) {
      return 0;
    }
    return this.quickAnswersCount * Points.ADDITIONAL_FOR_QUICK_ANSWER;
  }

  get restLivesScore() {
    return this.restLives >= 0 ?
      this.restLives * Points.REST_LIVE_SCORE :
      0;
  }

  get score() {
    if (this.isThereUnansweredQuestion()) {
      return UNANSWERED_QUESTIONS_SCORE;
    }
    return this.correctAnswersScore +
      this.quickAnswersAdditionalScore +
      this.slowAnswersAdditionalScore +
      this.restLivesScore;
  }

  setCurrentLevelAnswer(answers) {
    const isCorrect = this._isPhotoAnswerCorrect(answers);
    this.currentLevel.setAnswer(isCorrect);
    if (!isCorrect) {
      this.decreaseLive();
    }
  }

  get slowAnswersCount() {
    return this.levels.reduce((accu, level) => {
      return level.answerState === AnswerState.SLOW ? ++accu : accu;
    }, 0);
  }

  get slowAnswersAdditionalScore() {
    if (this.isThereUnansweredQuestion()) {
      return 0;
    }
    return this.slowAnswersCount * Points.ADDITIONAL_FOR_SLOW_ANSWER;
  }

  tickSecond() {
    const secondsLeft = this.currentLevel.tickSecond();
    this.onTickSecond();
    if (secondsLeft <= 0) {
      this.onTimeElapsed();
    }
  }

}

