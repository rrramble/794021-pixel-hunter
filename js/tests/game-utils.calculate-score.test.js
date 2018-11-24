import {assert} from 'chai';
import {calculateScore as testedFunction} from '../game-utils.js';

const set1 = {
  value: {
    levels: [
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: true,
        secondsLeft: 1
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: true,
        secondsLeft: 10
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: true,
        isAnswerSlow: false,
        secondsLeft: 30
      },
    ],
    restLives: 3
  },
  expectedResult: -1
};

const set2 = {
  value: {
    levels: [
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 11
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 12
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 13
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 14
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 15
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 16
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 17
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 18
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 19
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 19
      },
    ],
    restLives: 3
  },
  expectedResult: 1150
};

const set3 = {
  value: {
    levels: [
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 11
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 12
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 13
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 14
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 15
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 16
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 17
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 18
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 19
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 19
      },
    ],
    restLives: 3
  },
  expectedResult: 0
};

const set4 = {
  value: {
    levels: [
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 1
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 5
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 13
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 14
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 15
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 16
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 25
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 1
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 15
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 25
      },
    ],
    restLives: 3
  },
  expectedResult: 450
};

const set5 = {
  value: {
    levels: [
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 1
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 5
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 13
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 14
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 15
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 16
      },
      {
        isAnswered: true,
        isAnswerCorrect: false,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 25
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 1
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 15
      },
      {
        isAnswered: true,
        isAnswerCorrect: true,
        isAnswerQuick: false,
        isAnswerSlow: false,
        secondsLeft: 25
      },
    ],
    restLives: 0,
  },
  expectedResult: 300
};

describe(`game-utils.js: calculateScore()`, () => {
  describe(`Corner case data`, () => {
    it(`returns -1 when less than 10 gameState`, () => {
      assert.equal(testedFunction(set1.value.levels, set1.value.restLives), set1.expectedResult);
    });
  });

  describe(`Normal data`, () => {
    it(`counts score of set2`, () => {
      assert.equal(testedFunction(set2.value.levels, set2.value.restLives), set2.expectedResult);
    });
    it(`counts score of set3`, () => {
      assert.equal(testedFunction(set3.value.levels, set3.value.restLives), set3.expectedResult);
    });
    it(`counts score of set4`, () => {
      assert.equal(testedFunction(set4.value.levels, set4.value.restLives), set4.expectedResult);
    });
    it(`counts score of set5`, () => {
      assert.equal(testedFunction(set5.value.levels, set5.value.restLives), set5.expectedResult);
    });
  });
});
