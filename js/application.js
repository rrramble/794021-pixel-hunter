import IntroScreen from './intro/intro-screen.js';
import GreetingScreen from './greeting/greeting-screen.js';
import RulesScreen from './rules/rules-screen.js';
import GameScreen from './game/game-screen.js';
import StatsScreen from './stats/stats-screen.js';

import GameModel from './game/game-model.js';
import Loader from './data/loader.js';

import {changeWindow} from './utils.js';

const QUESTIONS_SHOULD_BE_MOCK = false;
let questions;

export default class Application {
  static showIntro() {
    const screen = new IntroScreen();
    changeWindow(screen.element);
    questions = Loader.downloadQuestions(QUESTIONS_SHOULD_BE_MOCK);
    questions.
      then((responseQuestions) => {
        questions = responseQuestions;
        this.showGreeting();
      });
  }

  static showGreeting() {
    const screen = new GreetingScreen();
    changeWindow(screen.element);
  }

  static showRules() {
    const screen = new RulesScreen();
    changeWindow(screen.element);
  }

  static showGame(userName) {
    const model = new GameModel(userName, questions);
    const gameScreen = new GameScreen(model);
    changeWindow(gameScreen.element);
    gameScreen.start();
  }

  static showStats(model) {
    const screen = new StatsScreen(model);
    changeWindow(screen.element);
  }

}
