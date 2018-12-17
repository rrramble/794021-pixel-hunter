// Loader (download and upload data)

import Adapter from './adapter.js';
import mockQuestions from './mock-questions.js';

const APP_ID = `794021-0`;
const Url = {
  QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
  STATISTICS_TEMPLATE: `https://es.dump.academy/pixel-hunter/stats/:${APP_ID}:`,
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const getJsonFromResponse = (response) => response.json();

const makeStatisticsUrl = (template, username) => {
  return `${template}${username}`;
};

export default class Loader {
  static downloadQuestions(shouldBeMock) {
    if (shouldBeMock) {
      return new Promise((resolve) => {
        resolve(mockQuestions);
      });
    }
    return window.fetch(Url.QUESTIONS).
      then(checkStatus).
      then(getJsonFromResponse).
      then(Adapter.questions);
  }

  static downloadStatistics(username) {
    const url = makeStatisticsUrl(Url.STATISTICS_TEMPLATE, username);
    return window.fetch(url).
      then(checkStatus).
      then(getJsonFromResponse);
  }

  static uploadStatistic(rawData) {
    const data = Adapter.uploadingStatistic(rawData);
    const url = makeStatisticsUrl(Url.STATISTICS_TEMPLATE, rawData.username);
    const settings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`,
    };
    return window.fetch(url, settings);
  }
}
