// Универсальный экран

export default class AbstractWindow {
  constructor(renderCb, finishCbs) {
    this._renderCb = renderCb;
    if (finishCbs) {
      this._finishCbs = [...finishCbs];
    }
  }

  _render() {
    this._nodes.forEach((node, index) => {
      const clearAll = index > 0;
      this._renderCb(node, clearAll);
    });
  }

  _callFinishCbs() {
    if (!this._finishCbs) {
      return;
    }
    this._finishCbs.forEach((cb) => {
      cb();
    });
  }

  renderNodes(nodes) {
    this._nodes = [...nodes];
    this._render();
    this._callFinishCbs();
  }

} // AbstractWindow
