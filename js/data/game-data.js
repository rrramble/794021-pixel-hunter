export default class GameData {
  constructor() {
  }

  get levels() {
    return this._levels;
  }

  set levels(data) {
    this._levels = data;
  }

  get urls() {
    if (this._urls) {
      return this._urls;
    }

    this._urls = [];
    this._levels.forEach((level) => {
      level.answers.forEach((answer) => {
        this._urls.push(answer.url);
      });
    });
    return this._urls;
  }

  set images(data) {
    this._images = data;
  }

}
