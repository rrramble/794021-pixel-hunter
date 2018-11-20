import {assert} from 'chai';
import {getTimeLeft as testedFunction} from '../game-utils.js';

const set1 = {
  value: {
    timeLimit: 1000,
    timeElapsed: 700
  },
  expectedResult: 300
};

const set2 = {
  value: {
    timeLimit: 1000,
    timeElapsed: 1000
  },
  expectedResult: 0
};

const set3 = {
  value: {
    timeLimit: 1000,
    timeElapsed: 1001
  },
  expectedResult: 0
};

describe(`getTimeLeft()`, () => {
  describe(`Normal calculations`, () => {
    it(`tests set1`, () => {
      assert.strictEqual(testedFunction(set1.value.timeLimit, set1.value.timeElapsed), set1.expectedResult);
    });
  });

  describe(`Corner cases`, () => {
    it(`tests set2`, () => {
      assert.strictEqual(testedFunction(set2.value.timeLimit, set2.value.timeElapsed), set2.expectedResult);
    });
    it(`tests set3`, () => {
      assert.strictEqual(testedFunction(set3.value.timeLimit, set3.value.timeElapsed), set3.expectedResult);
    });
  });
});
