// Шаблон для экрана 'Приветствие' (Greeting window)

import {makeDomNode} from '../utils.js';

const NEXT_BUTTON_SELECTOR = `.greeting__continue`;

const getTemplate = () => {
  return `
    <section class="greeting central--blur">
      <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
      <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
      <div class="greeting__challenge">
        <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
        <p class="greeting__challenge-text">Правила игры просты:</p>
        <ul class="greeting__challenge-list">
          <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
          <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
          <li>Фотореализм обманчив и коварен.</li>
          <li>Помни, главное — смотреть очень внимательно.</li>
        </ul>
      </div>
      <button class="greeting__continue" type="button">
        <span class="visually-hidden">Продолжить</span>
        <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-right"></use>
        </svg>
      </button>
    </section>
  `;
};

const getTemplateNode = (nextWindowCb) => {
  const eventListeners = [{
    selector: NEXT_BUTTON_SELECTOR,
    type: `click`,
    cb: nextWindowCb,
  }];

  return makeDomNode(getTemplate(), eventListeners);
};

export default getTemplateNode;