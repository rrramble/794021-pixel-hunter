// Loader (download and upload data)

import Adapter from './adapter.js';

const APP_ID = `794021`;
const Url = {
  QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
  STATISTICS_TEMPLATE: `https://es.dump.academy/pixel-hunter/stats/${APP_ID}-`,
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.url} : ${response.status} : ${response.statusText}`);
};

const getJsonFromResponse = (response) => response.json();

const makeStatisticsUrl = (template, username) => {
  return `${template}${username}`;
};


export default class Loader {
  static downloadStatistics(username) {
    const url = makeStatisticsUrl(Url.STATISTICS_TEMPLATE, username);
    return window.fetch(url).
      then(checkStatus).
      then(getJsonFromResponse);
  }

  static downloadQuestions() {
    return window.fetch(Url.QUESTIONS).
      then(checkStatus).
      then(getJsonFromResponse).
      then(Adapter.makeDownloadingLevels);
  }

  static uploadStatistic(rawData) {
    const data = Adapter.makeUploadingStatistic(rawData);
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
