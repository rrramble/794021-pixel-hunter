import {deleteCurrentWindow, showWindow} from './utils.js';

const QUESTONS_COUNT = 10;

const PointsForAnswer = {
  CORRECT: 100,
  QUICK: 50,
  SLOW: -50,
  REST_LIVE: 50
};

export const calculateScore = (answers, restLivesCount) => {
  const isAnswerQuick = (answer) => answer.seconds < 10;
  const isAnswerSlow = (answer) => answer.seconds > 20;
  const isAnswerCountLessThanQuestionCount = () => answers.length < QUESTONS_COUNT;

  if (isAnswerCountLessThanQuestionCount()) {
    return -1;
  }

  const answersScore = answers.reduce((accu, answer) => {
    if (!answer.isCorrect) {
      return accu;
    }
    accu += PointsForAnswer.CORRECT;
    if (isAnswerQuick(answer)) {
      accu += PointsForAnswer.QUICK;
    } else if (isAnswerSlow(answer)) {
      accu += PointsForAnswer.SLOW;
    }
    return accu;
  }, 0);

  const pointForLives = answersScore > 0 ?
    restLivesCount * PointsForAnswer.REST_LIVE :
    0;
  return answersScore + pointForLives;
};

export const decreaseLives = (game) => {
  const newGame = Object.assign({}, game);

  if (newGame.restLives > 0) {
    newGame.restLives--;
  }
  return newGame;
};

export const getTimeLeft = (timeLimit, timeElapsed) => {
  return timeLimit > timeElapsed ? timeLimit - timeElapsed : 0;
};

export const renderNode = (node, shouldPreviousWindowBeSaved) => {
  if (!shouldPreviousWindowBeSaved) {
    deleteCurrentWindow();
  }
  showWindow(node);
};

export const getFooterScoreIconClassNames = (gameState) => {
  return gameState.levels.map(() => `stats__result--unknown`);
  /*
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--unknown"></li>
  */
};
