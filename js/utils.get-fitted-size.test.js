import {assert} from 'chai';
import {getFittedSize as testedFunction} from './utils.js';

const createTestForFrame = (frame) => {
  const assertRatio = (given, expected) => {
    const actual = testedFunction(frame, given);
    assert.deepEqual(actual, expected);
  };

  const createTest = (expected, multiplier) => {
    const given = {
      width: Math.floor(expected.width * multiplier),
      height: Math.floor(expected.height * multiplier)
    };
    it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
      assertRatio(given, expected);
    });
  };

  const sequence = (expected) => {
    createTest(expected, 8);
    createTest(expected, 7);
    createTest(expected, 5);
    createTest(expected, 4);
    createTest(expected, 3);
    createTest(expected, 2);
    createTest(expected, 1);
  };

  describe(`Resize into frame: ${frame.width}x${frame.height}`, () => {

    describe(`when "width === height"`, () => {
      sequence({width: frame.width, height: frame.height});
    });

    describe(`when "width > height"`, () => {
      sequence({width: frame.width, height: Math.floor(frame.height / 2)});
    });

    describe(`when "width < height"`, () => {
      sequence({width: Math.floor(frame.width / 2), height: frame.height});
    });

  });
};

createTestForFrame({width: 256, height: 256});
createTestForFrame({width: 256, height: 128});

createTestForFrame({width: 468, height: 458});
createTestForFrame({width: 705, height: 455});
createTestForFrame({width: 304, height: 455});


/*
const set1 = {
  value: {
    timeLimit: 1000,
    timeElapsed: 700
  },
  expectedResult: 300
};

describe(`game-utils.js: getTimeLeft()`, () => {
  describe(`Normal case data`, () => {
    it(`tests set1`, () => {
      assert.strictEqual(testedFunction(set1.value.timeLimit, set1.value.timeElapsed), set1.expectedResult);
    });
  });

  describe(`Corner case data`, () => {
    it(`tests set2`, () => {
      assert.strictEqual(testedFunction(set2.value.timeLimit, set2.value.timeElapsed), set2.expectedResult);
    });
    it(`tests set3`, () => {
      assert.strictEqual(testedFunction(set3.value.timeLimit, set3.value.timeElapsed), set3.expectedResult);
    });
  });
});
*/
