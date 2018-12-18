// Adapter

import {AnswerState} from '../game/game-utils.js';
import GameModel from '../game/game-model.js';

const adaptDownloadingAnswers = (answers) => {
  return answers.map((answer) => {
    return {
      height: answer.image.height,
      width: answer.image.width,
      url: answer.image.url,
      type: answer.type,
    };
  });
};

const adaptDownloadingLevel = (level) => {
  return {
    questionText: level.question,
    answers: adaptDownloadingAnswers(level.answers),
  };
};

const adaptDownloadingLevelStatistic = (level) => {
  switch (level) {
    case `correct`:
      return {
        isUnanswered: false,
        answerState: AnswerState.NORMAL,
      };
    case `slow`:
      return {
        isUnanswered: false,
        answerState: AnswerState.SLOW,
      };
    case `fast`:
      return {
        isUnanswered: false,
        answerState: AnswerState.QUICK,
      };
    case `wrong`:
      return {
        isUnanswered: false,
        answerState: AnswerState.INCORRECT,
      };
    default:
      return {
        isUnanswered: true,
        answerState: AnswerState.UNANSWERED,
      };
  }
};

const adaptUploadingGameStatistic = (level) => {
  switch (level.answerState) {
    case AnswerState.INCORRECT:
      return `wrong`;
    case AnswerState.NORMAL:
      return `correct`;
    case AnswerState.QUICK:
      return `fast`;
    case AnswerState.SLOW:
      return `slow`;
    default:
      return `unanswered`;
  }
};

export default class Adapter {

  static _getModelFromStatistic(oneGame) {
    const model = new GameModel(``);
    oneGame.stats.forEach((levelResult) => {
      const adaptedLevelResult = adaptDownloadingLevelStatistic(levelResult);
      model.addAnswerState(adaptedLevelResult);
    });
    model.restLives = Math.max(oneGame.lives, 0);
    return model;
  }

  static getModelsFromStatistics(statistics) {
    return statistics.map((oneGame) => {
      return this._getModelFromStatistic(oneGame);
    });
  }

  static makeDownloadingLevels(levels) {
    return levels.map((level) => {
      return adaptDownloadingLevel(level);
    });
  }

  static makeUploadingStatistic(data) {
    const stats = data.levels.map((level) => {
      return adaptUploadingGameStatistic(level);
    });
    return {
      stats,
      lives: data.restLives >= 0 ? data.restLives : 0,
    };
  }

}
