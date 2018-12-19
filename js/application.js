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
let currentAppIsShowIntro;

export default class Application {
  static showIntro() {
    currentAppIsShowIntro = true;
    const screen = new IntroScreen();
    changeWindow([screen.element]);
    Loader.downloadQuestions().
      then((loadedLevels) => {
        levels = loadedLevels;
        if (currentAppIsShowIntro) {
          this.showGreeting();
        }
      });
  }

  static showGreeting() {
    currentAppIsShowIntro = false;
    const screen = new GreetingScreen();
    changeWindow([screen.element]);
  }

  static showRules() {
    currentAppIsShowIntro = false;
    const screen = new RulesScreen();
    changeWindow([screen.element]);
  }

  static showGame(userName) {
    currentAppIsShowIntro = false;
    const model = new GameModel(userName);
    model.setLevels(levels);
    const gameScreen = new GameScreen(model);
    gameScreen.start();
  }

  static showStats(model) {
    currentAppIsShowIntro = false;
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
