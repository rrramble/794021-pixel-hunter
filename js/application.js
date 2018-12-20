import IntroScreen from './intro/intro-screen.js';
import GreetingScreen from './greeting/greeting-screen.js';
import RulesScreen from './rules/rules-screen.js';
import GameScreen from './game/game-screen.js';
import StatsScreen from './stats/stats-screen.js';

import GameModel from './game/game-model.js';
import Loader from './data/loader.js';
import Adapter from './data/adapter.js';
import GameData from './data/game-data';
import {changeWindow} from './utils.js';

const RELOADING_TRY_INTERVAL = 10000;

const gameData = new GameData();

export default class Application {
  static showIntro() {
    const screen = new IntroScreen();
    changeWindow([screen.element]);
    Application.loadLevels();
  }

  static loadLevels() {
    try {
      Loader.downloadQuestions().
        then((result) => {
          gameData.levels = result;
          Application.loadImages();
        }).
        catch(() => {
          return new Promise(() => setTimeout(Application.loadLevels, RELOADING_TRY_INTERVAL));
        });
    } catch (err) {
      setTimeout(Application.loadLevels, RELOADING_TRY_INTERVAL);
    }
  }

  static loadImages() {
    try {
      Loader.downloadImages(gameData.urls).
        then((result) => {
          gameData.images = result;
          Application.showGreeting();
        }).
        catch(() => {
          return new Promise(() => setTimeout(Application.loadImages, RELOADING_TRY_INTERVAL));
        });
    } catch (err) {
      setTimeout(Application.loadImages, RELOADING_TRY_INTERVAL);
    }
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
    gameData.model = new GameModel(userName);
    gameData.model.setLevels(gameData.levels);
    gameData.model.setImages(gameData.images);
    const gameScreen = new GameScreen(gameData.model);
    gameScreen.start();
  }

  static showStats(model) {
    const screen = new StatsScreen(gameData.model);
    changeWindow([screen.element]);
    Loader.downloadStatistics(gameData.model.username).
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
