import img from '../img/goblin.png';

export default class Renderer {
  renderField() {
    const container = document.querySelector('#app');
    this.scoreContainer = document.createElement('div');
    this.scoreContainer.classList.add('score-wrapper');
    container.appendChild(this.scoreContainer);
    this.scoreContainer.innerHTML = `<div>
                                        <div>Score: <span id="score">0</span></div>
                                        <div>Miss: <span id="miss">0</span></div>
                                    </div>`;
    this.newGameEl = document.createElement('div');
    this.newGameEl.classList.add('new-game');
    this.newGameEl.classList.add('none');
    this.newGameEl.innerHTML = '<button>New game</button>';
    this.scoreContainer.appendChild(this.newGameEl);

    this.field = document.createElement('div');
    this.field.classList.add('field-container');
    container.appendChild(this.field);

    for (let i = 0; i < 25; i += 1) {
      this.field.appendChild(Renderer.getEmptyItem());
    }
  }

  getNewGameButton() {
    return this.newGameEl.firstChild;
  }

  renderScoreEl(point, type) {
    const selector = `#${type}`;
    const scoreEl = this.scoreContainer.querySelector(selector);
    scoreEl.innerText = point;
  }

  clearImg() {
    const imgItem = this.field.querySelector('img');
    if (imgItem) {
      imgItem.remove();
    }
  }

  setImage(position) {
    this.items = document.querySelectorAll('.item');
    this.items[position].appendChild(Renderer.getImg());
  }

  static getEmptyItem() {
    const emptyItem = document.createElement('div');
    emptyItem.classList.add('item');

    return emptyItem;
  }

  static getImg() {
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', img);
    imgEl.setAttribute('alt', 'goblin');

    return imgEl;
  }

  static isImage(target) {
    if (target.tagName === 'IMG') {
      return true;
    }

    const image = target.querySelector('img');

    return !!image;
  }
}
