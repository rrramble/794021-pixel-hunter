import IntroScreen from './intro/intro-screen.js';
import GreetingScreen from './greeting/greeting-screen.js';
import RulesScreen from './rules/rules-screen.js';
import GameScreen from './game/game-screen.js';
import StatsScreen from './stats/stats-screen.js';

import GameModel from './game/game-model.js';
import Loader from './data/loader.js';
import Adapter from './data/adapter.js';

import {changeWindow} from './utils.js';

const QUESTIONS_SHOULD_BE_MOCK = false;
let questions;
let currentAppIsShowIntro;

export default class Application {
  static showIntro() {
    currentAppIsShowIntro = true;
    const screen = new IntroScreen();
    changeWindow(screen.element);
    Loader.downloadQuestions(QUESTIONS_SHOULD_BE_MOCK).
      then((responseQuestions) => {
        questions = responseQuestions;
        if (currentAppIsShowIntro) {
          this.showGreeting();
        }
      });
  }

  static showGreeting() {
    currentAppIsShowIntro = false;
    const screen = new GreetingScreen();
    changeWindow(screen.element);
  }

  static showRules() {
    currentAppIsShowIntro = false;
    const screen = new RulesScreen();
    changeWindow(screen.element);
  }

  static showGame(userName) {
    currentAppIsShowIntro = false;
    const model = new GameModel(userName);
    model.questions = questions;
    const gameScreen = new GameScreen(model);
    changeWindow(gameScreen.element);
    gameScreen.start();
  }

  static showStats(model) {
    currentAppIsShowIntro = false;
    const screen = new StatsScreen(model);
    changeWindow(screen.element);
    Loader.downloadStatistics(model.username).
      then((statistics) => {
        const models = Adapter.getModelsFromStatistics(statistics);
        screen.addEarlierStatistics(models);
        changeWindow(screen.element);
      }).
      catch((err) => console.error(err)).
      then(() => Loader.uploadStatistic(model));
  }

}
