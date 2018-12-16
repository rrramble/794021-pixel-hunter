// Loader (download and upload data)

import Adapter from './adapter.js';
import mockQuestions from './mock-questions.js';

const Url = {
  QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const getJsonFromResponse = (response) => response.json();

const getMockQuestions = () => {
  return mockQuestions;
};

export default class Loader {
  static downloadQuestions(shouldBeMock) {
    if (shouldBeMock) {
      return new Promise((resolve) => {
        resolve(getMockQuestions());
      });
    };
    return window.fetch(Url.QUESTIONS).
      then(checkStatus).
      then(getJsonFromResponse).
      then(Adapter.questions);
  }

}
