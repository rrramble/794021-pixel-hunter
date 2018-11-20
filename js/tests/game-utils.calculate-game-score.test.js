import {assert} from 'chai';
import {calculateScore as testedFunction} from '../game-utils.js';

const set1 = {
  answers: [
    {isCorrect: true, seconds: 1},
    {isCorrect: false, seconds: 10},
    {isCorrect: true, seconds: 30}
  ],
  restLives: 3,
  expectedResult: -1
};

const set2 = {
  answers: [
    {isCorrect: true, seconds: 10},
    {isCorrect: true, seconds: 11},
    {isCorrect: true, seconds: 12},
    {isCorrect: true, seconds: 12},
    {isCorrect: true, seconds: 13},
    {isCorrect: true, seconds: 13},
    {isCorrect: true, seconds: 14},
    {isCorrect: true, seconds: 14},
    {isCorrect: true, seconds: 15},
    {isCorrect: true, seconds: 20}
  ],
  restLives: 3,
  expectedResult: 1150
};

const set3 = {
  answers: [
    {isCorrect: false, seconds: 5},
    {isCorrect: false, seconds: 5},
    {isCorrect: false, seconds: 9},
    {isCorrect: false, seconds: 10},
    {isCorrect: false, seconds: 10},
    {isCorrect: false, seconds: 11},
    {isCorrect: false, seconds: 19},
    {isCorrect: false, seconds: 19},
    {isCorrect: false, seconds: 20},
    {isCorrect: false, seconds: 22}
  ],
  restLives: 3,
  expectedResult: 0
};

const set4 = {
  answers: [
    {isCorrect: false, seconds: 9},
    {isCorrect: false, seconds: 9},
    {isCorrect: false, seconds: 10},
    {isCorrect: false, seconds: 10},
    {isCorrect: false, seconds: 19},
    {isCorrect: false, seconds: 20},
    {isCorrect: false, seconds: 21},
    {isCorrect: true, seconds: 1},
    {isCorrect: true, seconds: 15},
    {isCorrect: true, seconds: 21}
  ],
  restLives: 3,
  expectedResult: 450
};

const set5 = {
  answers: [
    {isCorrect: false, seconds: 9},
    {isCorrect: false, seconds: 9},
    {isCorrect: false, seconds: 10},
    {isCorrect: false, seconds: 10},
    {isCorrect: false, seconds: 19},
    {isCorrect: false, seconds: 20},
    {isCorrect: false, seconds: 21},
    {isCorrect: true, seconds: 1},
    {isCorrect: true, seconds: 15},
    {isCorrect: true, seconds: 21}
  ],
  restLives: 0,
  expectedResult: 300
};

describe(`Utils`, () => {
  describe(`calculateGameScore()`, () => {
    it(`returns -1 when less than 10 answers`, () => {
      assert.equal(testedFunction(set1.answers, set1.restLives), set1.expectedResult);
    });

    it(`counts score of set2`, () => {
      assert.equal(testedFunction(set2.answers, set2.restLives), set2.expectedResult);
    });
    it(`counts score of set3`, () => {
      assert.equal(testedFunction(set3.answers, set3.restLives), set3.expectedResult);
    });
    it(`counts score of set4`, () => {
      assert.equal(testedFunction(set4.answers, set4.restLives), set4.expectedResult);
    });
    it(`counts score of set5`, () => {
      assert.equal(testedFunction(set5.answers, set5.restLives), set5.expectedResult);
    });
  });
});
