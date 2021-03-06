import IntroScreen from './intro/intro-screen.js';
import GreetingScreen from './greeting/greeting-screen.js';
import RulesScreen from './rules/rules-screen.js';
import GameScreen from './game/game-screen.js';
import StatsScreen from './stats/stats-screen.js';

import GameModel from './game/game-model.js';
import Loader from './data/loader.js';
import Adapter from './data/adapter.js';
import GameData from './data/game-data';
import ErrorView from './utils/error-view.js';

import {changeWindow, changeWindowDelayDeletionPrevious} from './utils.js';

const RELOADING_TRY_INTERVAL = 1000;
const DELAY_CLOSING_PREVIOUS_SCREEN = 3000;

const gameData = new GameData();
const errorView = new ErrorView();

export default class Application {
  static showIntro() {
    const screen = new IntroScreen();
    changeWindow([screen.element]);
    Application.loadLevels();
  }

  static loadLevels() {
    Loader.fetchQuestions(errorView.start).
      then((result) => {
        gameData.levels = result;
        Application.loadImages();
      }).
      catch((err) => {
        errorView.start(err.message);
        setTimeout(Application.loadLevels, RELOADING_TRY_INTERVAL);
      });
  }

  static loadImages() {
    Loader.fetchImages(gameData.urls, errorView.start).
      then((result) => {
        gameData.images = result;
        Application.showGreeting();
      }).
      catch((err) => {
        errorView.start(err.message);
        setTimeout(Application.loadImages, RELOADING_TRY_INTERVAL);
      });
  }

  static showGreeting() {
    const screen = new GreetingScreen();
    changeWindowDelayDeletionPrevious([screen.element], DELAY_CLOSING_PREVIOUS_SCREEN);
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
    Loader.fetchStatistics(gameData.model.username).
      then((statistics) => {
        const models = Adapter.getModelsFromStatistics(statistics);
        screen.addEarlierStatistics(models);
        changeWindow([screen.element]);
      }).
      catch(() => errorView.start(`Cannot download statistics for user: ${gameData.model.username}`), 300).
      then(() => Loader.uploadStatistic(model)).
      catch(() => errorView.start(`Error uploading statistics for user: ${gameData.model.username}`, 300));
  }

}
