import {getFittedSize} from './utils';
import {getFooterScoreIconClassNames} from './game-utils.js';

const ImageSize = {
  '1': {
    WIDTH: 705,
    HEIGHT: 455,
  },
  '2': {
    WIDTH: 468,
    HEIGHT: 458,
  },
  '3': {
    WIDTH: 304,
    HEIGHT: 455,
  }
};

export const getGameHeader = (gameState) => {
  const seconds = gameState.levels[gameState.currentLevel].secondsLeft;
  const restLives = gameState.restLives;
  return `
    <header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      <div class="game__timer">${seconds}</div>
      <div class="game__lives">
      ${new Array(gameState.MAX_LIVES - restLives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
      ${new Array(restLives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
      </div>
    </header>
  `;
};

const getGameFooterGameScore = (gameState) => {
  return `
    <ul class="stats">
      ${getFooterScoreIconClassNames(gameState).map((className) => `
        <li class="stats__result ${className}"></li>
      `).join(``)}
    </ul>
  `;
};

export const getGameField1 = (gameState) => {
  const image = getFittedImages(gameState)[0];
  return `
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${image.url}" alt="Option 1" width="${image.width}" height="${image.height}">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${getGameFooterGameScore(gameState)}
  </section>
`;
};

export const getGameField2 = (gameState) => {
  const images = getFittedImages(gameState);
  return `
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">

      ${images.map((image, index) => `
        <div class="game__option">
          <img src="${image.url}" alt="Option ${index + 1}" width="${image.width}" height="${image.height}">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      `).join(``)}
    </form>
    ${getGameFooterGameScore(gameState)}
  </section>
`;
};

export const getGameField3 = (gameState) => {
  const images = getFittedImages(gameState);
  return `
  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${images.map((image, index) => `
        <div class="game__option">
          <img src="${image.url}" alt="Option ${index + 1}" width="${image.width}" height="${image.height}">
        </div>
      `).join(``)}
    </form>
    ${getGameFooterGameScore(gameState)}
  </section>
`;
};

export const getGameField = (gameState, questionCount) => {
  switch (questionCount) {
    case 1:
      return getGameField1(gameState);
    case 2:
      return getGameField2(gameState);
    case 3:
      return getGameField3(gameState);
  }
  return new Error(`No such question count in this game.`);
};

const getFittedImages = (gameState) => {
  const question = gameState.levels[gameState.currentLevel].question;
  const borderSize = {
    width: ImageSize[question.length].WIDTH,
    height: ImageSize[question.length].HEIGHT
  };
  const images = question.map((image) => {
    const fittedSize = getFittedSize(
        borderSize,
        {width: image.width, height: image.height}
    );
    return {
      url: image.url,
      width: fittedSize.width,
      height: fittedSize.height,
    };
  });
  return images;
};
