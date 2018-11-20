import {assert} from 'chai';
import {decreaseLives as testedFunction} from '../game-utils.js';

const set1 = {
  value: {
    answers: [],
    restLives: 0
  },

  expectedResult: {
    answers: [],
    restLives: 0
  }
};

const set2 = {
  value: {
    answers: [
      {isCorrect: true, seconds: 10},
      {isCorrect: true, seconds: 11},
      {isCorrect: true, seconds: 12}
    ],
    restLives: 0
  },

  expectedResult: {
    answers: [
      {isCorrect: true, seconds: 10},
      {isCorrect: true, seconds: 11},
      {isCorrect: true, seconds: 12}
    ],
    restLives: 0
  }
};

const set3 = {
  value: {
    answers: [],
    restLives: 1
  },

  expectedResult: {
    answers: [],
    restLives: 0
  }
};

const set4 = {
  value: {
    answers: [
      {isCorrect: true, seconds: 10},
      {isCorrect: true, seconds: 11},
      {isCorrect: true, seconds: 12}
    ],
    restLives: 1
  },

  expectedResult: {
    answers: [
      {isCorrect: true, seconds: 10},
      {isCorrect: true, seconds: 11},
      {isCorrect: true, seconds: 12}
    ],
    restLives: 0
  }
};

const set5 = {
  value: {
    answers: [],
    restLives: 3
  },

  expectedResult: {
    answers: [],
    restLives: 2
  }
};

const set6 = {
  value: {
    answers: [
      {isCorrect: true, seconds: 10},
      {isCorrect: true, seconds: 11},
      {isCorrect: true, seconds: 12}
    ],
    restLives: 3
  },
  expectedResult: {
    answers: [
      {isCorrect: true, seconds: 10},
      {isCorrect: true, seconds: 11},
      {isCorrect: true, seconds: 12}
    ],
    restLives: 2
  }
};

describe(`Utils`, () => {
  describe(`decreaseLives()`, () => {
    it(`tests set1`, () => {
      assert.deepEqual(testedFunction(set1.value), set1.expectedResult);
    });

    it(`tests set1`, () => {
      assert.deepEqual(testedFunction(set1.value), set1.expectedResult);
    });

    it(`tests set2`, () => {
      assert.deepEqual(testedFunction(set2.value), set2.expectedResult);
    });

    it(`tests set3`, () => {
      assert.deepEqual(testedFunction(set3.value), set3.expectedResult);
    });

    it(`tests set4`, () => {
      assert.deepEqual(testedFunction(set4.value), set4.expectedResult);
    });

    it(`tests set5`, () => {
      assert.deepEqual(testedFunction(set5.value), set5.expectedResult);
    });

    it(`tests set6`, () => {
      assert.deepEqual(testedFunction(set6.value), set6.expectedResult);
    });
  });
});
