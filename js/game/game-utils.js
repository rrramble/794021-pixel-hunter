const QUESTONS_COUNT = 10;
const CHECKED_ANSWERS_INPUT_SELECTOR = `.game__answer input:checked`;

export const AnswerState = {
  UNANSWERED: 1,
  INCORRECT: 2,
  QUICK: 3,
  NORMAL: 4,
  SPEED: 5,
};

const PointsForAnswer = {
  CORRECT: 100,
  QUICK: 50,
  SLOW: -50,
  REST_LIVE: 50
};

const IMAGE_TYPE_IS_PHOTO = {
  'photo': true,
  'paint': false,
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
  return gameData.levels.map((level) => {
    if (level.isUnanswered) {
      return IconClassName.NOT_ANSWERED;
    }
    switch (level.answerState) {
      case AnswerState.INCORRECT:
        return IconClassName.NOT_CORRECT;
      case AnswerState.SLOW:
        return IconClassName.CORRECT_SLOW;
      case AnswerState.QUICK:
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
  return gameData.currentQuestionImageCount === getCheckedInputsCount();
};

const getAnswerOf3Image = (evt) => {
  if (!evt) {
    return false;
  }
  let images = [true, true, true];
  const index = parseInt(evt.srcElement.id, 10);
  images[index] = false;
  return images;
};

export const getAnswers = (evt, imagesCount) => {
  if (imagesCount === 3) {
    return getAnswerOf3Image(evt);
  }

  const checkedNodes = document.querySelectorAll(CHECKED_ANSWERS_INPUT_SELECTOR);
  if (checkedNodes.length <= 0) {
    return undefined;
  }
  return [...checkedNodes].map((checkedNode) => {
    return isImageTypePhoto(checkedNode.value);
  });
};

const isImageTypePhoto = (imageTypeString) => {
  return IMAGE_TYPE_IS_PHOTO[imageTypeString];
};

const getCheckedInputsCount = () => {
  const checkedNodes = document.querySelectorAll(CHECKED_ANSWERS_INPUT_SELECTOR);
  return checkedNodes.length;
};

export const isUserNameValid = (name) => {
  return !!name;
};
