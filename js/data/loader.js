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
  return encodeURI(`${template}${username}`);
};

const fetchImage = (url, onError) => {
  try {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Error loading "${img.src}"`));
      img.src = url;
    }).
      then((img) => img).
      catch((err) => {
        onError(err.message);
        return fetchImage(url, onError);
      });
  } catch (err) {
    return Promise.reject(new Error(`Error fetching image ${url}`));
  }
};

export default class Loader {
  static fetchImages(urls, onError) {
    const resultPromise = Promise.all(urls.map((url) => {
      return fetchImage(url, onError);
    }));

    try {
      return resultPromise.
        then((result) => result);
    } catch (err) {
      return Promise.reject(new Error(`Error fetching images`));
    }
  }

  static fetchStatistics(username) {
    const url = makeStatisticsUrl(Url.STATISTICS_TEMPLATE, username);
    return window.fetch(url).
      then(checkStatus).
      then(getJsonFromResponse);
  }

  static fetchQuestions() {
    try {
      return window.fetch(Url.QUESTIONS).
        then(checkStatus).
        then(getJsonFromResponse).
        then((json) => Adapter.makeDownloadingLevels(json)).
        catch(() => {
          throw new Error(`Failed to fetch questions from "${Url.QUESTIONS}"`);
        });
    } catch (err) {
      return Promise.reject(() => new Error(`Failed to fetch questions from "${Url.QUESTIONS}"`));
    }
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
