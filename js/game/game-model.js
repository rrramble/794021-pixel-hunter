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
  constructor(level) {
    if (level) {
      this.questionText = level.questionText;
      this.answers = level.answers;
    }
    this.secondsLeft = MAX_ANSWER_TIME;
    this.answerState = AnswerState.UNANSWERED;
  }

  setAnswerState(levelState) {
    this.answerState = levelState.answerState;
  }

  _isAnswerCorrect(choices) {
    if (!choices) {
      return false;
    }
    switch (this.answers.length) {
      case 1:
        return choices[0] === this.answers[0].type;
      case 2:
        return choices[0] === this.answers[0].type &&
          choices[1] === this.answers[1].type;
      case 3:
        let types = this.answers.map((answer) => answer.type);
        types.splice(choices[0], 1);
        return types[0] === types[1];
      default:
        return false;
    }
  }

  get isUnanswered() {
    return this.answerState === AnswerState.UNANSWERED;
  }

  pushChoices(choices) {
    const isAnswerCorrect = this._isAnswerCorrect(choices);
    this._setAnswerCorrectness(isAnswerCorrect);
    return isAnswerCorrect;
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

  _setAnswerCorrectness(isCorrect) {
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
    return this.secondsLeft >= 0 ? --this.secondsLeft : 0;
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
    return this.isThereUnansweredQuestion() ?
      0 :
      this.correctAnswersCount * Points.FOR_CORRECT_ANSWER;
  }

  get currentLevel() {
    return this.levels[this.currentLevelNumber];
  }

  get currentAnswers() {
    return this.currentLevel.answers;
  }

  get currentAnswersImageCount() {
    return this.currentAnswers.length;
  }

  get currentLevelSecondsLeft() {
    return this.currentLevel.secondsLeft;
  }

  decreaseLive() {
    return this.restLives >= 0 ? --this.restLives : this.restLives;
  }

  increaseLevel() {
    return ++this.currentLevelNumber;
  }

  reinit() {
    this.restLives = MAX_LIVES;
    this.currentLevelNumber = 0;
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

  pushCurrentLevelAnswer(choices) {
    const isCorrect = this.currentLevel.pushChoices(choices);
    if (!isCorrect) {
      this.decreaseLive();
    }
  }

  get quickAnswersCount() {
    if (this.isThereUnansweredQuestion()) {
      return 0;
    }
    return this.levels.reduce((accu, level) => {
      return level.answerState === AnswerState.QUICK ? ++accu : accu;
    }, 0);
  }

  get quickAnswersAdditionalScore() {
    return this.isThereUnansweredQuestion() ?
      0 :
      this.quickAnswersCount * Points.ADDITIONAL_FOR_QUICK_ANSWER;
  }

  get restLivesScore() {
    return this.restLives <= 0 ?
      0 :
      this.restLives * Points.REST_LIVE_SCORE;
  }

  get score() {
    return this.isThereUnansweredQuestion() ?
      UNANSWERED_QUESTIONS_SCORE :
      this.correctAnswersScore +
        this.quickAnswersAdditionalScore +
        this.slowAnswersAdditionalScore +
        this.restLivesScore;
  }

  setLevels(levels) {
    this.levels = levels.map((level) => {
      return new Level(level);
    });
  }

  get slowAnswersCount() {
    if (this.isThereUnansweredQuestion()) {
      return 0;
    }
    return this.levels.reduce((accu, level) => {
      return level.answerState === AnswerState.SLOW ? ++accu : accu;
    }, 0);
  }

  get slowAnswersAdditionalScore() {
    return this.isThereUnansweredQuestion() ?
      0 :
      this.slowAnswersCount * Points.ADDITIONAL_FOR_SLOW_ANSWER;
  }

  tickSecond() {
    const secondsLeft = this.currentLevel.tickSecond();
    this.onTickSecond();
    if (secondsLeft <= 0) {
      this.onTimeElapsed();
    }
  }

}
