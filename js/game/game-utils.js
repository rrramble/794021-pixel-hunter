const QUESTONS_COUNT = 10;
const ANSWER_INPUT_SELECTOR = `.game__answer input`;

const PointsForAnswer = {
  CORRECT: 100,
  QUICK: 50,
  SLOW: -50,
  REST_LIVE: 50
};

const IconClassName = {
  NOT_ANSWERED: `stats__result--unknown`,
  NOT_CORRECT: `stats__result--wrong`,
  CORRECT_SLOW: `stats__result--slow`,
  CORRECT_QUICK: `stats__result--fast`,
  CORRECT: `stats__result--correct`,
};

const isAnswerQuick = (level) => level.secondsLeft > 20;
const isAnswerSlow = (level) => level.secondsLeft < 10;

const calculateLevelScore = (level) => {
  if (!level.isAnswerCorrect) {
    return 0;
  }
  let accu = PointsForAnswer.CORRECT;
  if (isAnswerQuick(level)) {
    accu += PointsForAnswer.QUICK;
  } else if (isAnswerSlow(level)) {
    accu += PointsForAnswer.SLOW;
  }
  return accu;
};

export const calculateScore = (answers, restLivesCount) => {
  const isAnswerCountLessThanQuestionCount = () => answers.length < QUESTONS_COUNT;
  if (isAnswerCountLessThanQuestionCount()) {
    return -1;
  }
  const answersScore = answers.reduce((accu, answer) => {
    accu += calculateLevelScore(answer);
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

export const getFooterScoreIconClassNames = (gameData) => {
  return gameData.levels.map((level, index) => {
    switch (true) {
      case (index >= gameData.currentLevelNumber || !level.isAnswered):
        return IconClassName.NOT_ANSWERED;
      case (!level.isAnswerCorrect):
        return IconClassName.NOT_CORRECT;
      case (level.isAnswerSlow()):
        return IconClassName.CORRECT_SLOW;
      case (level.isAnswerQuick()):
        return IconClassName.CORRECT_QUICK;
      default:
        return IconClassName.CORRECT;
    }
  });
};

export const isAnsweredFully = (gameData) => {
  if (gameData.currentQuestionImageCount === 3) {
    return true;
  }
  if (gameData.currentQuestionImageCount === getCheckedInputsCount()) {
    return true;
  }
  return false;
};

export const isAnswerCorrect = () => {
  return Math.random() < 0.7; // !!! Mock answer result
};

const getCheckedInputsCount = () => {
  const nodes = document.querySelectorAll(ANSWER_INPUT_SELECTOR);
  return [...nodes].reduce((accu, node) => {
    return node.checked ? ++accu : accu;
  }, 0);
};
