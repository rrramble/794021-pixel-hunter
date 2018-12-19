import IntroScreen from './intro/intro-screen.js';
import GreetingScreen from './greeting/greeting-screen.js';
import RulesScreen from './rules/rules-screen.js';
import GameScreen from './game/game-screen.js';
import StatsScreen from './stats/stats-screen.js';

import GameModel from './game/game-model.js';
import Loader from './data/loader.js';
import Adapter from './data/adapter.js';

import {changeWindow} from './utils.js';

let levels;
let images;

const getUrlsFromLevels = (levels) => {
  let accu = [];
  levels.forEach((level) => {
    level.answers.forEach((answer) => {
      accu.push(answer.url);
    });
  });
  return accu;
};

export default class Application {
  static showIntro() {
    const screen = new IntroScreen();
    changeWindow([screen.element]);
    Application.loadLevels();
  }

  static loadLevels() {
    Loader.downloadQuestions().
      then((result) => {
        levels = result;
        Application.loadImages(getUrlsFromLevels(levels));
      });
  }

  static loadImages(urls) {
    Loader.downloadQuestions(urls).
      then((result) => {
        images = result;
        Application.showGreeting();
      });
  }

  static showGreeting() {
    const screen = new GreetingScreen();
    changeWindow([screen.element]);
  }

  static showRules() {
    const screen = new RulesScreen();
    changeWindow([screen.element]);
  }

  static showGame(userName) {
    const model = new GameModel(userName);
    model.setLevels(levels);
    const gameScreen = new GameScreen(model);
    gameScreen.start();
  }

  static showStats(model) {
    const screen = new StatsScreen(model);
    changeWindow([screen.element]);
    Loader.downloadStatistics(model.username).
      then((statistics) => {
        const models = Adapter.getModelsFromStatistics(statistics);
        screen.addEarlierStatistics(models);
        changeWindow([screen.element]);
      }).
      catch(() => {}).
      then(() => Loader.uploadStatistic(model)).
      catch(() => {});
  }

}
